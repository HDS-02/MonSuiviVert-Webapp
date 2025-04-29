import express, { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertPlantSchema, 
  insertTaskSchema, 
  insertPlantAnalysisSchema, 
  insertUserSchema, 
  insertGrowthJournalSchema,
  insertCommunityTipSchema,
  insertCommunityCommentSchema
} from "../shared/schema";
import { analyzePlantImage, getPlantInfoByName } from "./openai";
import multer from "multer";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { setupAuth } from "./auth";
import { badgeService } from "./badgeService";
import { plantDatabase, searchPlants, getPlantByName, getPlantsByCategory, plantCategories } from "./plantDatabase";
import { plantDiagnosticService } from "./plantDiagnosticService";
import { qrCodeService } from "./qrCodeService";
import { sendEmail, sendTaskReminder, sendWelcomeEmail, sendPlantAddedEmail, sendPlantRemovedEmail, sendWateringReminderEmail, sendScheduledWateringNotification, sendTodayWateringReminderEmail, sendAutoWateringStatusEmail } from "./email";
import { pdfService } from "./pdfService";

// Fonction de validation sécurisée pour éviter les erreurs de runtime
const safeValidate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    console.error("Erreur de validation:", error);
    if (error instanceof z.ZodError) {
      throw new Error(`Données invalides: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw new Error("Erreur de validation des données");
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for in-memory file storage
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
  });

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Setup authentication routes
  setupAuth(app);
  
  // Route pour l'analyse d'image de plante et upload
  app.post("/api/analyze", upload.single("image"), async (req: Request, res: Response) => {
    try {
      console.log("Requête d'analyse d'image reçue");
      
      if (!req.file) {
        return res.status(400).json({ message: "Aucune image n'a été fournie" });
      }
      
      // Générer un nom de fichier unique
      const fileExt = path.extname(req.file.originalname);
      const fileName = `${nanoid()}${fileExt}`;
      const filePath = path.join(uploadsDir, fileName);
      
      // Enregistrer le fichier
      fs.writeFileSync(filePath, req.file.buffer);
      
      // Chemin relatif pour l'accès via URL
      const relativePath = path.join('/uploads', fileName);
      
      // Description fournie par l'utilisateur (optionnelle)
      const description = req.body.description || '';
      
      // Analyser l'image (version simplifiée sans API externe)
      const analysisResult = {
        name: description || "Plante",
        species: "",
        healthStatus: "healthy",
        recommendations: [
          "Assurez-vous d'arroser régulièrement votre plante",
          "Placez votre plante dans un endroit avec la luminosité appropriée",
          "Vérifiez régulièrement l'absence de parasites sur les feuilles"
        ],
        imagePath: relativePath
      };
      
      console.log(`Image enregistrée: ${relativePath}`);
      res.status(200).json({
        message: "Image analysée avec succès",
        imagePath: relativePath,
        analysis: analysisResult
      });
      
    } catch (error: any) {
      console.error("Erreur lors de l'analyse de l'image:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadsDir));
  
  // USER ROUTES
  // Middleware pour vérifier si l'utilisateur est authentifié
  const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Non authentifié" });
  };

  // Route pour mettre à jour un utilisateur
  app.patch("/api/users/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      // Vérifier que l'utilisateur ne modifie que son propre compte
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "ID d'utilisateur invalide" });
      }

      if (req.user?.id !== userId) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce compte" });
      }

      // Validation des données d'entrée - on accepte seulement username, firstName, email et reminderTime
      const userUpdateSchema = z.object({
        username: z.string().min(3).optional(),
        firstName: z.string().min(2).optional(),
        email: z.string().email().optional().or(z.literal("")),
        reminderTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
      });

      const validatedData = safeValidate(userUpdateSchema, req.body);
      
      // Mise à jour de l'utilisateur en base de données
      const updatedUser = await storage.updateUser(userId, validatedData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Retourne l'utilisateur mis à jour
      res.json(updatedUser);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Données invalides", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // PLANTS ROUTES
  // Route pour récupérer les catégories de plantes
  app.get("/api/plant-categories", async (_req: Request, res: Response) => {
    try {
      // Importer les catégories depuis le module de base de données
      const { plantCategories } = await import('./plantDatabase');
      console.log("Envoi des catégories de plantes:", plantCategories.length);
      res.json(plantCategories);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des catégories de plantes:", error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route pour récupérer les plantes par catégorie
  app.get("/api/plant-database/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      // Valider que la catégorie est bien une catégorie valide
      if (!['interieur', 'exterieur', 'fruitier', 'fleurs', 'legumes'].includes(category)) {
        return res.status(400).json({ message: "Catégorie invalide" });
      }
      
      // Importer la fonction depuis le module de base de données
      const { getPlantsByCategory } = await import('./plantDatabase');
      
      // Récupérer les plantes de la catégorie
      const plants = getPlantsByCategory(category as any);
      console.log(`Envoi de ${plants.length} plantes de la catégorie ${category}`);
      
      res.json(plants);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des plantes par catégorie:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/plants", async (_req: Request, res: Response) => {
    try {
      const plants = await storage.getPlants();
      res.json(plants);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/plants/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID invalide" });
      }

      const plant = await storage.getPlant(id);
      if (!plant) {
        return res.status(404).json({ message: "Plante non trouvée" });
      }

      res.json(plant);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/plants", async (req: Request, res: Response) => {
    try {
      console.log("Requête d'ajout de plante reçue:", JSON.stringify(req.body));
      
      // Initialiser les valeurs par défaut pour les champs essentiels
      const plantData = {
        ...req.body,
        autoWatering: req.body.autoWatering !== undefined ? req.body.autoWatering : false,
        reminderTime: req.body.reminderTime || "08:00"
      };
      
      console.log("Données normalisées pour l'ajout:", JSON.stringify(plantData));
      
      let validatedData = safeValidate(insertPlantSchema, plantData);
      
      // Ajouter des informations par défaut pour les maladies fréquentes et la taille de pot
      // si elles ne sont pas déjà définies
      if (!validatedData.commonDiseases || 
          (Array.isArray(validatedData.commonDiseases) && validatedData.commonDiseases.length === 0)) {
        // Maladies communes génériques basées sur le type de plante
        let commonDiseases;
        
        // Vérifier si c'est une plante d'intérieur ou d'extérieur basé sur les termes dans le nom ou l'espèce
        const isIndoorPlant = validatedData.name.toLowerCase().includes("monstera") ||
                             validatedData.name.toLowerCase().includes("ficus") ||
                             validatedData.name.toLowerCase().includes("sansevieria") ||
                             validatedData.name.toLowerCase().includes("aglaonema") ||
                             validatedData.name.toLowerCase().includes("yucca") ||
                             validatedData.name.toLowerCase().includes("palmier") ||
                             validatedData.light?.toLowerCase().includes("indirecte");
        
        const isVegetable = validatedData.name.toLowerCase().includes("tomate") ||
                           validatedData.name.toLowerCase().includes("carotte") ||
                           validatedData.name.toLowerCase().includes("chou") ||
                           validatedData.name.toLowerCase().includes("poivron") ||
                           validatedData.name.toLowerCase().includes("haricot") ||
                           validatedData.name.toLowerCase().includes("laitue") ||
                           validatedData.name.toLowerCase().includes("salade");
        
        if (isVegetable) {
          commonDiseases = [
            {name: "Mildiou", description: "Maladie fongique qui apparaît par temps humide, formant des taches jaunes à brunes sur les feuilles", treatment: "Favoriser la circulation d'air, éviter d'arroser le feuillage et utiliser un fongicide bio si nécessaire"},
            {name: "Pucerons", description: "Petits insectes qui se nourrissent de la sève et peuvent transmettre des virus", treatment: "Pulvériser de l'eau savonneuse ou introduire des prédateurs naturels comme les coccinelles"},
            {name: "Oïdium", description: "Champignon qui forme un duvet blanc sur les feuilles", treatment: "Appliquer une solution de bicarbonate de soude ou un fongicide adapté"}
          ];
        } else if (isIndoorPlant) {
          commonDiseases = [
            {name: "Cochenilles", description: "Insectes qui forment des amas blancs cotonneux sur les feuilles", treatment: "Nettoyer avec un chiffon imbibé d'alcool à 70° ou utiliser une huile horticole"},
            {name: "Araignées rouges", description: "Minuscules acariens qui apparaissent en conditions sèches, causant des taches claires sur les feuilles", treatment: "Augmenter l'humidité ambiante et vaporiser régulièrement le feuillage"},
            {name: "Pourriture des racines", description: "Causée par un arrosage excessif, se manifeste par un jaunissement des feuilles et un pourrissement à la base", treatment: "Réduire l'arrosage et rempoter dans un substrat frais avec un bon drainage"}
          ];
        } else {
          commonDiseases = [
            {name: "Taches foliaires", description: "Diverses maladies fongiques qui causent des taches sur les feuilles", treatment: "Éliminer les feuilles affectées et éviter de mouiller le feuillage lors de l'arrosage"},
            {name: "Rouille", description: "Maladie fongique qui forme des pustules orangées sur les feuilles", treatment: "Utiliser un fongicide à base de cuivre et améliorer la circulation d'air"},
            {name: "Ravageurs divers", description: "Insectes et acariens qui peuvent endommager le feuillage", treatment: "Identifier le ravageur spécifique et traiter avec des méthodes appropriées, de préférence biologiques"}
          ];
        }
        
        validatedData.commonDiseases = commonDiseases;
      }
      
      // Ajouter une taille de pot recommandée si non définie
      if (!validatedData.potSize) {
        // Taille de pot générique basée sur le type de plante
        if (validatedData.name.toLowerCase().includes("cactus") || 
            validatedData.name.toLowerCase().includes("succulente")) {
          validatedData.potSize = "Pot de 10-15 cm de diamètre avec très bon drainage";
        } else if (validatedData.name.toLowerCase().includes("monstera") ||
                  validatedData.name.toLowerCase().includes("ficus") ||
                  validatedData.name.toLowerCase().includes("palmier")) {
          validatedData.potSize = "Pot de 25-30 cm de diamètre avec bon drainage";
        } else if (validatedData.wateringFrequency && validatedData.wateringFrequency >= 7) {
          validatedData.potSize = "Pot de 15-20 cm de diamètre avec drainage adapté";
        } else {
          validatedData.potSize = "Pot de 20-25 cm de diamètre avec bon drainage";
        }
      }
      
      const plant = await storage.createPlant(validatedData);
      
      // Envoyer un email de notification si l'utilisateur est authentifié et a configuré son email
      if (req.isAuthenticated() && req.user?.email) {
        try {
          // Envoi asynchrone pour ne pas bloquer la réponse
          sendPlantAddedEmail(req.user.email, plant)
            .then(success => {
              if (success) {
                console.log(`Email de notification d'ajout de plante envoyé avec succès à ${req.user?.email}`);
              }
            })
            .catch(emailError => {
              console.error(`Erreur lors de l'envoi de l'email de notification d'ajout de plante:`, emailError);
            });
        } catch (emailError) {
          // Ne pas bloquer l'ajout de plante si l'envoi d'email échoue
          console.error('Erreur lors de l\'envoi de l\'email de notification d\'ajout de plante:', emailError);
        }
      }
      
      res.status(201).json(plant);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Données invalides", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Route pour mettre à jour l'heure de rappel d'arrosage d'une plante
  app.patch("/api/plants/:id/reminder-time", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const plantId = parseInt(req.params.id);
      if (isNaN(plantId)) {
        return res.status(400).json({ message: "ID de plante invalide" });
      }
      
      // Récupérer la plante existante
      const plant = await storage.getPlant(plantId);
      if (!plant) {
        return res.status(404).json({ message: "Plante non trouvée" });
      }
      
      // Vérifier que l'utilisateur est bien le propriétaire de la plante
      if (req.user?.id !== plant.userId) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cette plante" });
      }
      
      const { reminderTime } = req.body;
      
      // Validation simple du format heure (HH:MM)
      if (!reminderTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(reminderTime)) {
        return res.status(400).json({ message: "Format d'heure invalide. Utilisez HH:MM" });
      }
      
      // Mettre à jour l'heure de rappel
      const updatedPlant = await storage.updatePlant(plantId, { 
        reminderTime 
      });
      
      if (!updatedPlant) {
        return res.status(404).json({ message: "Échec de la mise à jour" });
      }
      
      console.log(`Heure de rappel mise à jour pour la plante ${plantId} (${plant.name}): ${reminderTime}`);
      
      res.json({ 
        message: "Heure de rappel mise à jour avec succès",
        reminderTime: updatedPlant.reminderTime
      });
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour de l\'heure de rappel:', error);
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
