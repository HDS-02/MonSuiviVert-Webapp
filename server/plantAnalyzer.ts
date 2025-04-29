import { PlantAnalysisResponse } from "@shared/schema";
import fs from "fs";
import path from "path";

/**
 * Analyse des plantes basée sur une approche de règles prédéfinies
 * Cette version n'utilise pas d'API externe et fonctionne de manière autonome
 */
export class PlantAnalyzer {
  private plantDatabase: PlantData[] = [
    {
      id: "rosier",
      name: "Rosier",
      commonTypes: ["Rosa", "Rosier buisson", "Rosier grimpant", "Rosier tige"],
      keywords: ["rose", "rosier", "fleur", "épines", "parfumée", "floraison"],
      careInstructions: {
        watering: "Arrosage régulier au pied, éviter de mouiller le feuillage.",
        light: "Plein soleil, minimum 6 heures par jour.",
        temperature: "-15°C à 35°C selon les variétés. Généralement rustique.",
        additional: ["Taille annuelle en fin d'hiver", "Protection hivernale dans les régions très froides", "Traitement préventif contre les maladies"]
      },
      commonIssues: [
        { symptom: "taches noires sur les feuilles", cause: "maladie cryptogamique", severity: "warning" },
        { symptom: "pucerons sur les boutons", cause: "infestation d'insectes", severity: "warning" },
        { symptom: "oïdium (poudre blanche)", cause: "champignon", severity: "warning" },
        { symptom: "jaunissement et chute des feuilles", cause: "stress hydrique ou maladie", severity: "danger" }
      ]
    },
    {
      id: "basilic",
      name: "Basilic",
      commonTypes: ["Ocimum basilicum", "Basilic grand vert", "Basilic pourpre", "Basilic citron"],
      keywords: ["basilic", "herbe aromatique", "cuisine", "méditerranéen", "annuelle"],
      careInstructions: {
        watering: "Arrosage régulier sans excès, sol légèrement humide.",
        light: "Soleil non brûlant ou mi-ombre légère.",
        temperature: "15-30°C. Craint le froid.",
        additional: ["Pincer régulièrement les sommités", "Protéger du vent", "Replanter chaque année"]
      },
      commonIssues: [
        { symptom: "feuilles jaunissantes", cause: "excès d'eau", severity: "warning" },
        { symptom: "taches brunes", cause: "brûlure solaire ou champignon", severity: "warning" },
        { symptom: "floraison précoce", cause: "stress ou chaleur excessive", severity: "warning" },
        { symptom: "feuilles percées", cause: "limaces ou escargots", severity: "warning" }
      ]
    },
    {
      id: "salade",
      name: "Salade",
      commonTypes: ["Lactuca sativa", "Laitue", "Batavia", "Feuille de chêne"],
      keywords: ["salade", "laitue", "batavia", "potager", "légume feuille"],
      careInstructions: {
        watering: "Arrosage régulier pour maintenir le sol frais sans détremper.",
        light: "Mi-ombre à soleil selon la saison et région.",
        temperature: "10-25°C. Peut monter en graine en forte chaleur.",
        additional: ["Protection contre les limaces", "Récolte avant maturité complète", "Semis échelonnés pour récolte continue"]
      },
      commonIssues: [
        { symptom: "feuilles rongées", cause: "limaces ou escargots", severity: "warning" },
        { symptom: "jaunissement des feuilles basses", cause: "vieillissement normal", severity: "healthy" },
        { symptom: "montée en graine", cause: "chaleur excessive ou âge", severity: "warning" },
        { symptom: "taches brunes molles", cause: "pourriture", severity: "danger" }
      ]
    },
    {
      id: "ficus",
      name: "Ficus",
      commonTypes: ["Ficus lyrata", "Ficus elastica", "Ficus benjamina"],
      keywords: ["ficus", "caoutchouc", "plante d'intérieur", "grandes feuilles", "brillantes"],
      careInstructions: {
        watering: "Arrosez quand les 2-3 premiers centimètres du sol sont secs. Environ une fois par semaine.",
        light: "Lumière vive indirecte. Évitez l'exposition directe au soleil qui peut brûler les feuilles.",
        temperature: "18-24°C. Ne supporte pas les courants d'air froids.",
        additional: ["Vaporisez régulièrement pour maintenir l'humidité", "Nettoyez les feuilles pour favoriser la photosynthèse"]
      },
      commonIssues: [
        { symptom: "feuilles jaunissantes", cause: "arrosage excessif", severity: "warning" },
        { symptom: "feuilles qui tombent", cause: "changement d'environnement ou courants d'air", severity: "warning" },
        { symptom: "taches brunes", cause: "eau trop froide ou chlorée", severity: "warning" },
        { symptom: "croissance lente", cause: "manque de lumière", severity: "warning" }
      ]
    },
    {
      id: "monstera",
      name: "Monstera",
      commonTypes: ["Monstera deliciosa", "Monstera adansonii"],
      keywords: ["monstera", "fenêtré", "philodendron", "grandes feuilles", "tropical"],
      careInstructions: {
        watering: "Laissez sécher entre les arrosages. Environ tous les 7-10 jours.",
        light: "Lumière vive indirecte à mi-ombre.",
        temperature: "18-27°C. Craint le froid en dessous de 12°C.",
        additional: ["Apprécie une humidité élevée", "Support nécessaire pour les grandes plantes"]
      },
      commonIssues: [
        { symptom: "feuilles jaunissantes", cause: "arrosage excessif", severity: "warning" },
        { symptom: "bords bruns", cause: "air trop sec ou eau chlorée", severity: "warning" },
        { symptom: "manque de fenestrations", cause: "manque de lumière", severity: "warning" }
      ]
    },
    {
      id: "succulent",
      name: "Plante succulente",
      commonTypes: ["Cactus", "Aloe vera", "Echeveria", "Haworthia"],
      keywords: ["succulente", "cactus", "charnu", "épines", "désertique", "aloe"],
      careInstructions: {
        watering: "Laissez complètement sécher entre les arrosages. En hiver, espacez davantage.",
        light: "Plein soleil ou lumière vive pour la plupart des variétés.",
        temperature: "18-32°C en été, évitez moins de 10°C en hiver.",
        additional: ["Sol bien drainé indispensable", "Pot avec trou de drainage"]
      },
      commonIssues: [
        { symptom: "pourriture de la base", cause: "arrosage excessif", severity: "danger" },
        { symptom: "étiolement", cause: "manque de lumière", severity: "warning" },
        { symptom: "racines visibles en surface", cause: "pot trop petit", severity: "warning" }
      ]
    },
    {
      id: "orchid",
      name: "Orchidée",
      commonTypes: ["Phalaenopsis", "Dendrobium", "Cymbidium"],
      keywords: ["orchidée", "phalaenopsis", "fleur exotique", "aérien", "racines apparentes"],
      careInstructions: {
        watering: "Trempez les racines dans l'eau une fois par semaine pendant 15 minutes.",
        light: "Lumière vive indirecte, pas de soleil direct.",
        temperature: "18-25°C, évitez les courants d'air froid.",
        additional: ["Humidité ambiante importante", "Substrat spécial orchidées requis"]
      },
      commonIssues: [
        { symptom: "racines grises/vertes", cause: "arrosage excessif", severity: "danger" },
        { symptom: "feuilles jaunissantes", cause: "trop de soleil direct", severity: "warning" },
        { symptom: "bourgeons tombants", cause: "changement brutal de température", severity: "warning" },
        { symptom: "absence de floraison", cause: "manque de lumière ou de repos hivernal", severity: "warning" }
      ]
    },
    {
      id: "palm",
      name: "Palmier d'intérieur",
      commonTypes: ["Areca", "Kentia", "Chamaedorea"],
      keywords: ["palmier", "tropical", "areca", "kentia", "palme", "feuilles divisées"],
      careInstructions: {
        watering: "Gardez le sol légèrement humide. Arrosez quand la surface est sèche.",
        light: "Lumière vive indirecte à mi-ombre.",
        temperature: "18-24°C. Évitez les courants d'air froid.",
        additional: ["Vaporisez régulièrement le feuillage", "Fertilisant léger au printemps et en été"]
      },
      commonIssues: [
        { symptom: "pointes brunes", cause: "air trop sec ou eau chlorée", severity: "warning" },
        { symptom: "taches noires", cause: "sur-arrosage", severity: "warning" },
        { symptom: "feuilles jaunissantes", cause: "sur ou sous-arrosage", severity: "warning" },
        { symptom: "feuilles pâles", cause: "trop de lumière directe", severity: "warning" }
      ]
    },
    {
      id: "fern",
      name: "Fougère",
      commonTypes: ["Boston", "Nid d'oiseau", "Maidenhair"],
      keywords: ["fougère", "dentelée", "boston", "délicate", "verte", "sans fleur"],
      careInstructions: {
        watering: "Gardez le sol constamment humide mais non détrempé.",
        light: "Ombre ou lumière indirecte.",
        temperature: "18-24°C. Évitez la chaleur sèche.",
        additional: ["Humidité élevée essentielle", "Vaporisez fréquemment"]
      },
      commonIssues: [
        { symptom: "feuilles brunes et sèches", cause: "air trop sec", severity: "warning" },
        { symptom: "feuilles jaunissantes", cause: "trop de lumière directe", severity: "warning" },
        { symptom: "feuilles noircissantes", cause: "pourriture due à l'excès d'eau", severity: "danger" }
      ]
    },
    {
      id: "pothos",
      name: "Pothos",
      commonTypes: ["Epipremnum aureum", "Scindapsus"],
      keywords: ["pothos", "lierre du diable", "plante grimpante", "facile", "panachée"],
      careInstructions: {
        watering: "Laissez sécher entre les arrosages. Tolère les oublis.",
        light: "De l'ombre à la lumière vive indirecte.",
        temperature: "15-24°C. Très adaptable.",
        additional: ["Facile d'entretien", "Idéal pour débutants"]
      },
      commonIssues: [
        { symptom: "feuilles molles", cause: "manque d'eau", severity: "warning" },
        { symptom: "taches jaunes", cause: "trop d'eau ou de soleil", severity: "warning" },
        { symptom: "perte de panachure", cause: "manque de lumière", severity: "warning" }
      ]
    },
    {
      id: "rose",
      name: "Rosier",
      commonTypes: ["Rosa", "Rose de jardin", "Rosier buisson"],
      keywords: ["rose", "rosier", "fleur", "épines", "buisson", "parfumée"],
      careInstructions: {
        watering: "Arrosez régulièrement à la base, en évitant de mouiller les feuilles. Plus fréquemment en été.",
        light: "Plein soleil, minimum 6 heures par jour.",
        temperature: "10-25°C. Certaines variétés supportent le gel.",
        additional: ["Taille annuelle recommandée", "Protection hivernale pour les climats froids"]
      },
      commonIssues: [
        { symptom: "taches noires sur les feuilles", cause: "maladie fongique", severity: "warning" },
        { symptom: "pucerons sur les boutons", cause: "infestation d'insectes", severity: "warning" },
        { symptom: "jaunissement des feuilles", cause: "carence en nutriments", severity: "warning" },
        { symptom: "non-floraison", cause: "manque de soleil ou taille incorrecte", severity: "warning" }
      ]
    },
    {
      id: "basil",
      name: "Basilic",
      commonTypes: ["Ocimum basilicum", "Basilic grand vert", "Basilic pourpre"],
      keywords: ["basilic", "herbe aromatique", "cuisine", "méditerranéen", "aromate"],
      careInstructions: {
        watering: "Arrosez quand le sol commence à sécher, sans détremper.",
        light: "Plein soleil ou lumière vive indirecte.",
        temperature: "18-30°C. Sensible au froid et au gel.",
        additional: ["Pincez régulièrement l'extrémité pour favoriser la ramification", "Récoltez les feuilles jeunes pour un meilleur goût"]
      },
      commonIssues: [
        { symptom: "feuilles noircissantes", cause: "pourriture due à l'excès d'eau", severity: "danger" },
        { symptom: "taches brunes", cause: "maladie fongique", severity: "warning" },
        { symptom: "feuilles pâles", cause: "manque de soleil", severity: "warning" },
        { symptom: "croissance ralentie", cause: "pot trop petit ou manque de nutriments", severity: "warning" }
      ]
    },
    {
      id: "yucca",
      name: "Yucca",
      commonTypes: ["Yucca elephantipes", "Yucca filamentosa", "Yucca aloifolia"],
      keywords: ["yucca", "canne", "plante d'intérieur robuste", "semi-désertique", "feuilles pointues"],
      careInstructions: {
        watering: "Arrosez modérément, laissez sécher entre les arrosages. Réduire en hiver.",
        light: "Pleine lumière à semi-ombre. Supporte le soleil direct.",
        temperature: "15-30°C. Tolère les fluctuations.",
        additional: ["Sol bien drainé essentiel", "Peu de rempotages nécessaires"]
      },
      commonIssues: [
        { symptom: "feuilles brunes et sèches à la base", cause: "vieillissement normal", severity: "healthy" },
        { symptom: "pourriture du tronc", cause: "excès d'eau", severity: "danger" },
        { symptom: "pointes des feuilles jaunissantes", cause: "air trop sec", severity: "warning" },
        { symptom: "cochenilles", cause: "infestation d'insectes", severity: "warning" }
      ]
    },
    {
      id: "snake_plant",
      name: "Langue de belle-mère",
      commonTypes: ["Sansevieria trifasciata", "Dracaena trifasciata"],
      keywords: ["sansevieria", "langue de belle-mère", "serpent", "robuste", "feuilles dressées", "succulente"],
      careInstructions: {
        watering: "Très peu d'arrosage, laissez sécher complètement entre deux arrosages.",
        light: "Adaptable, de la mi-ombre à la lumière vive.",
        temperature: "15-30°C. Très tolérant.",
        additional: ["Excellente plante pour purifier l'air", "Idéale pour débutants"]
      },
      commonIssues: [
        { symptom: "feuilles molles et décolorées", cause: "arrosage excessif", severity: "danger" },
        { symptom: "pointes brunes", cause: "air trop sec", severity: "warning" },
        { symptom: "taches marron", cause: "maladie fongique due à l'excès d'humidité", severity: "warning" }
      ]
    },
    {
      id: "peace_lily",
      name: "Spathiphyllum",
      commonTypes: ["Spathiphyllum wallisii", "Fleur de lune", "Lys de paix"],
      keywords: ["spathiphyllum", "lys de paix", "fleur blanche", "spadice", "plante d'intérieur", "purifiante"],
      careInstructions: {
        watering: "Maintenez le sol légèrement humide, mais jamais détrempé.",
        light: "Ombre ou lumière indirecte. Évitez le soleil direct.",
        temperature: "18-25°C. Évitez les courants d'air froid.",
        additional: ["Réagit au manque d'eau en s'affaissant avant de récupérer rapidement", "Excellent purificateur d'air"]
      },
      commonIssues: [
        { symptom: "feuilles affaissées", cause: "manque d'eau", severity: "warning" },
        { symptom: "taches brunes", cause: "soleil direct", severity: "warning" },
        { symptom: "absences de fleurs", cause: "manque de lumière", severity: "warning" },
        { symptom: "feuilles jaunissantes", cause: "arrosage excessif", severity: "warning" }
      ]
    },
    {
      id: "lavender",
      name: "Lavande",
      commonTypes: ["Lavandula angustifolia", "Lavandula stoechas", "Lavande vraie"],
      keywords: ["lavande", "aromatique", "méditerranéen", "fleurs violettes", "parfumée", "mellifère"],
      careInstructions: {
        watering: "Arrosez modérément, laissez sécher entre les arrosages. Résistante à la sécheresse.",
        light: "Plein soleil, minimum 6 heures par jour.",
        temperature: "5-30°C. Résistante au froid selon les variétés.",
        additional: ["Sol calcaire et bien drainé", "Taille après floraison recommandée"]
      },
      commonIssues: [
        { symptom: "tiges ligneuses et peu feuillues", cause: "manque de taille", severity: "warning" },
        { symptom: "jaunissement", cause: "excès d'eau", severity: "warning" },
        { symptom: "feuillage clairsemé", cause: "manque de soleil", severity: "warning" },
        { symptom: "pourriture du pied", cause: "mauvais drainage", severity: "danger" }
      ]
    },
    {
      id: "rosier",
      name: "Rosier",
      commonTypes: ["Rosa", "Rosa gallica", "Rosa chinensis", "Rose de jardin"],
      keywords: ["rose", "rosier", "roses", "épines", "fleurs roses", "boutons", "roseraie"],
      careInstructions: {
        watering: "Arrosez régulièrement mais sans excès, au pied de la plante et non sur le feuillage. 2-3 fois par semaine en été.",
        light: "Plein soleil, minimum 6 heures par jour pour une floraison optimale.",
        temperature: "10-30°C. Protection hivernale recommandée pour les variétés sensibles.",
        additional: ["Taille annuelle en fin d'hiver", "Fertilisation régulière pendant la saison de croissance", "Paillis recommandé au pied"]
      },
      commonIssues: [
        { symptom: "taches noires sur les feuilles", cause: "maladie fongique", severity: "warning" },
        { symptom: "feuilles jaunissantes", cause: "chlorose ferrique ou excès d'eau", severity: "warning" },
        { symptom: "pucerons", cause: "infestation d'insectes", severity: "warning" },
        { symptom: "oïdium (poudre blanche)", cause: "maladie fongique", severity: "danger" }
      ]
    },
    {
      id: "basilic",
      name: "Basilic",
      commonTypes: ["Ocimum basilicum", "Basilic grand vert", "Basilic pourpre"],
      keywords: ["basilic", "herbe aromatique", "cuisine", "méditerranéen", "feuilles vertes", "plante condimentaire"],
      careInstructions: {
        watering: "Arrosez régulièrement pour maintenir le sol légèrement humide. Évitez de mouiller les feuilles.",
        light: "Soleil à mi-ombre. Évitez l'exposition directe aux rayons brûlants en été.",
        temperature: "15-30°C. Craint le froid en dessous de 10°C.",
        additional: ["Pincez régulièrement les sommités pour favoriser la ramification", "Récoltez les feuilles du haut pour stimuler la croissance"]
      },
      commonIssues: [
        { symptom: "jaunissement des feuilles", cause: "arrosage excessif", severity: "warning" },
        { symptom: "feuilles qui noircissent", cause: "températures trop basses", severity: "warning" },
        { symptom: "tiges allongées", cause: "manque de luminosité", severity: "warning" },
        { symptom: "taches brunes", cause: "maladie fongique due à l'excès d'humidité", severity: "danger" }
      ]
    },
    {
      id: "bonsai",
      name: "Bonsaï",
      commonTypes: ["Ficus bonsaï", "Carmona", "Pinus", "Juniperus"],
      keywords: ["bonsaï", "miniature", "japonais", "zen", "taillé", "art", "nain"],
      careInstructions: {
        watering: "Arrosez quand la surface du substrat commence à sécher. Fréquence variable selon l'espèce.",
        light: "Lumière vive indirecte, certaines espèces supportent le plein soleil.",
        temperature: "15-25°C. Protection contre les variations extrêmes.",
        additional: ["Taille régulière pour maintenir la forme", "Rempotage tous les 2-3 ans", "Fertilisation spécifique en période de croissance"]
      },
      commonIssues: [
        { symptom: "feuilles jaunissantes", cause: "arrosage inadapté", severity: "warning" },
        { symptom: "perte de feuilles", cause: "stress ou changement d'environnement", severity: "warning" },
        { symptom: "signes de dessèchement", cause: "manque d'humidité ambiante", severity: "warning" },
        { symptom: "branches mourantes", cause: "taille excessive ou maladie", severity: "danger" }
      ]
    },
    {
      id: "tomate",
      name: "Tomate",
      commonTypes: ["Solanum lycopersicum", "Tomate cerise", "Tomate cœur de bœuf", "Tomate ancienne"],
      keywords: ["tomate", "légume", "potager", "fruit rouge", "grimpante", "estival"],
      careInstructions: {
        watering: "Arrosage régulier en évitant de mouiller le feuillage. Plus abondant en période de production.",
        light: "Plein soleil, minimum 6-8 heures par jour.",
        temperature: "18-30°C. Craint le gel.",
        additional: ["Tuteurage nécessaire", "Taille des gourmands recommandée", "Fertilisation régulière"]
      },
      commonIssues: [
        { symptom: "feuilles jaunissantes", cause: "carence en nutriments", severity: "warning" },
        { symptom: "taches noires", cause: "mildiou", severity: "danger" },
        { symptom: "pourriture apicale", cause: "carence en calcium", severity: "warning" },
        { symptom: "fruits fendus", cause: "arrosage irrégulier", severity: "warning" }
      ]
    },
    {
      id: "pommier",
      name: "Pommier",
      commonTypes: ["Malus domestica", "Golden", "Gala", "Reinette"],
      keywords: ["pommier", "arbre fruitier", "pomme", "verger", "fruitier"],
      careInstructions: {
        watering: "Arrosage régulier les premières années, puis principalement en période de sécheresse.",
        light: "Plein soleil ou mi-ombre légère.",
        temperature: "-15°C à 35°C selon les variétés. Nécessite généralement une période de froid hivernal.",
        additional: ["Taille de formation puis d'entretien annuelle", "Protection contre les ravageurs"]
      },
      commonIssues: [
        { symptom: "taches brunes sur les feuilles", cause: "tavelure", severity: "warning" },
        { symptom: "fruits véreux", cause: "carpocapse", severity: "warning" },
        { symptom: "feuilles enroulées", cause: "pucerons", severity: "warning" },
        { symptom: "branches sèches", cause: "chancre", severity: "danger" }
      ]
    },
    {
      id: "fraisier",
      name: "Fraisier",
      commonTypes: ["Fragaria", "Fraise des bois", "Fraise remontante", "Fraise Gariguette"],
      keywords: ["fraisier", "fraise", "fruit rouge", "fruit de jardin", "petits fruits"],
      careInstructions: {
        watering: "Arrosage régulier mais modéré, en évitant de mouiller les fruits et le feuillage.",
        light: "Soleil à mi-ombre.",
        temperature: "10-25°C. Peut résister à des températures plus basses selon les variétés.",
        additional: ["Paillage recommandé", "Renouvellement tous les 3-4 ans", "Protection des fruits contre l'humidité du sol"]
      },
      commonIssues: [
        { symptom: "fruits petits", cause: "manque d'eau ou de nutriments", severity: "warning" },
        { symptom: "pourriture grise", cause: "humidité excessive", severity: "danger" },
        { symptom: "feuilles tachetées", cause: "maladies fongiques", severity: "warning" },
        { symptom: "fruits mangés", cause: "limaces ou oiseaux", severity: "warning" }
      ]
    },
    {
      id: "tulipe",
      name: "Tulipe",
      commonTypes: ["Tulipa", "Tulipe Darwin", "Tulipe perroquet", "Tulipe précoce"],
      keywords: ["tulipe", "bulbe", "fleur printanière", "fleur coupée", "floraison précoce"],
      careInstructions: {
        watering: "Arrosage modéré après la plantation et pendant la croissance, puis réduction après la floraison.",
        light: "Plein soleil à mi-ombre.",
        temperature: "Supporte le froid hivernal, préfère la fraîcheur au printemps.",
        additional: ["Plantation en automne", "Déterrage possible en été", "Ne pas couper le feuillage avant son jaunissement"]
      },
      commonIssues: [
        { symptom: "fleurs déformées", cause: "virus", severity: "warning" },
        { symptom: "bulbes pourris", cause: "excès d'humidité", severity: "danger" },
        { symptom: "feuilles tachetées", cause: "champignons", severity: "warning" },
        { symptom: "non-floraison", cause: "manque de froid ou bulbes épuisés", severity: "warning" }
      ]
    },
    {
      id: "geranium",
      name: "Géranium",
      commonTypes: ["Pelargonium", "Géranium lierre", "Géranium zonale", "Géranium odorant"],
      keywords: ["géranium", "pélargonium", "fleur de balcon", "fleur estivale", "plante fleurie"],
      careInstructions: {
        watering: "Arrosage régulier, laissez sécher entre deux arrosages. Plus fréquent en été.",
        light: "Plein soleil à mi-ombre.",
        temperature: "10-25°C. À protéger du gel.",
        additional: ["Fertilisation régulière en période de floraison", "Taille pour favoriser la ramification", "Hivernage possible"]
      },
      commonIssues: [
        { symptom: "feuilles jaunissantes", cause: "arrosage excessif", severity: "warning" },
        { symptom: "taches brunes", cause: "champignons", severity: "warning" },
        { symptom: "plante dégarnie", cause: "manque de lumière", severity: "warning" },
        { symptom: "feuilles déformées", cause: "attaque d'insectes", severity: "warning" }
      ]
    },
    {
      id: "carotte",
      name: "Carotte",
      commonTypes: ["Daucus carota", "Carotte Nantaise", "Carotte de Colmar", "Carotte Touchon"],
      keywords: ["carotte", "légume racine", "potager", "légume", "racine comestible"],
      careInstructions: {
        watering: "Arrosage régulier, surtout lors de la germination et croissance de la racine.",
        light: "Plein soleil à mi-ombre légère.",
        temperature: "15-25°C pour la croissance optimale.",
        additional: ["Sol léger et profond", "Éclaircissage nécessaire", "Éviter les sols caillouteux ou compactés"]
      },
      commonIssues: [
        { symptom: "racines fourchues", cause: "sol caillouteux ou obstacle", severity: "warning" },
        { symptom: "feuillage jaune", cause: "mouche de la carotte", severity: "warning" },
        { symptom: "racines craquelées", cause: "arrosage irrégulier", severity: "warning" },
        { symptom: "racines vertes au collet", cause: "exposition à la lumière", severity: "warning" }
      ]
    },
    {
      id: "olivier",
      name: "Olivier",
      commonTypes: ["Olea europaea", "Olivier d'Europe", "Olivier de Provence"],
      keywords: ["olivier", "arbre méditerranéen", "olive", "arbre fruitier", "feuillage persistant"],
      careInstructions: {
        watering: "Arrosage modéré, tolère la sécheresse une fois établi.",
        light: "Plein soleil.",
        temperature: "Supporte bien la chaleur, sensible au gel prolongé en dessous de -5°C.",
        additional: ["Taille d'entretien en fin d'hiver", "Protection hivernale dans les régions froides", "Sol bien drainé indispensable"]
      },
      commonIssues: [
        { symptom: "feuilles tachetées", cause: "œil de paon (champignon)", severity: "warning" },
        { symptom: "branches sèches", cause: "gel ou verticilliose", severity: "danger" },
        { symptom: "feuilles collantes", cause: "cochenille", severity: "warning" },
        { symptom: "chute des olives", cause: "mouche de l'olive", severity: "warning" }
      ]
    },
    {
      id: "citronnier",
      name: "Citronnier",
      commonTypes: ["Citrus limon", "Citronnier 4 saisons", "Citronnier Meyer"],
      keywords: ["citronnier", "agrume", "citron", "arbre fruitier", "méditerranéen"],
      careInstructions: {
        watering: "Arrosage régulier, laissez sécher légèrement entre deux arrosages.",
        light: "Plein soleil, idéalement exposition sud ou ouest.",
        temperature: "8-30°C. À protéger du gel, idéalement en intérieur en hiver dans les régions froides.",
        additional: ["Humidité ambiante appréciée", "Fertilisation régulière", "Taille légère au printemps"]
      },
      commonIssues: [
        { symptom: "feuilles jaunissantes", cause: "carence en fer (chlorose)", severity: "warning" },
        { symptom: "feuilles collantes", cause: "cochenilles ou pucerons", severity: "warning" },
        { symptom: "chute des feuilles", cause: "stress hydrique ou thermique", severity: "warning" },
        { symptom: "fruits qui tombent", cause: "arrosage irrégulier", severity: "warning" }
      ]
    },
    {
      id: "lavande",
      name: "Lavande",
      commonTypes: ["Lavandula angustifolia", "Lavande fine", "Lavandin", "Lavande papillon"],
      keywords: ["lavande", "aromatique", "méditerranéen", "fleurs bleues", "mellifère", "parfumée"],
      careInstructions: {
        watering: "Arrosage modéré à l'installation puis très limité. Résistante à la sécheresse.",
        light: "Plein soleil.",
        temperature: "-15°C à 35°C selon les variétés. Résistante au froid et à la chaleur.",
        additional: ["Taille annuelle après floraison", "Sol drainant indispensable", "Peu de fertilisation nécessaire"]
      },
      commonIssues: [
        { symptom: "pourriture au centre", cause: "excès d'humidité", severity: "danger" },
        { symptom: "plante ligneuse peu fleurie", cause: "manque de taille", severity: "warning" },
        { symptom: "jaunissement", cause: "sol trop riche ou humide", severity: "warning" },
        { symptom: "peu de floraison", cause: "manque de soleil", severity: "warning" }
      ]
    },
    {
      id: "menthe",
      name: "Menthe",
      commonTypes: ["Mentha", "Menthe poivrée", "Menthe verte", "Menthe marocaine"],
      keywords: ["menthe", "aromatique", "herbe", "plante envahissante", "infusion"],
      careInstructions: {
        watering: "Arrosage régulier, n'aime pas le sol sec.",
        light: "Mi-ombre à soleil, éviter le plein soleil brûlant.",
        temperature: "10-25°C. Résistante au froid.",
        additional: ["Culture en pot conseillée car très envahissante", "Taille régulière pour éviter la lignification", "Renouvellement tous les 2-3 ans"]
      },
      commonIssues: [
        { symptom: "feuilles tachetées", cause: "rouille (champignon)", severity: "warning" },
        { symptom: "feuilles rongées", cause: "altises", severity: "warning" },
        { symptom: "croissance faible", cause: "manque d'eau ou de nutriments", severity: "warning" },
        { symptom: "tiges couchées", cause: "environnement trop chaud et sec", severity: "warning" }
      ]
    },
    {
      id: "poivron",
      name: "Poivron",
      commonTypes: ["Capsicum annuum", "Poivron rouge", "Poivron jaune", "Poivron vert"],
      keywords: ["poivron", "piment doux", "légume", "potager", "solanacée"],
      careInstructions: {
        watering: "Arrosage régulier et constant. Éviter les à-coups d'arrosage.",
        light: "Plein soleil, 6-8 heures par jour minimum.",
        temperature: "20-30°C. Ne supporte pas le gel.",
        additional: ["Tuteurage recommandé", "Sol riche en matière organique", "Fertilisation régulière"]
      },
      commonIssues: [
        { symptom: "fruits déformés", cause: "pollinisation insuffisante", severity: "warning" },
        { symptom: "chute des fleurs", cause: "chaleur excessive ou stress hydrique", severity: "warning" },
        { symptom: "feuilles jaunes", cause: "carence en nutriments", severity: "warning" },
        { symptom: "taches noires", cause: "maladie fongique", severity: "danger" }
      ]
    },
    {
      id: "romarin",
      name: "Romarin",
      commonTypes: ["Rosmarinus officinalis", "Romarin rampant", "Romarin bleu"],
      keywords: ["romarin", "herbe aromatique", "méditerranéen", "condiment", "persistant"],
      careInstructions: {
        watering: "Arrosage modéré, laissez sécher entre les arrosages. Tolère la sécheresse.",
        light: "Plein soleil.",
        temperature: "-10°C à 35°C. Résistant au froid mais préfère la chaleur.",
        additional: ["Sol bien drainé indispensable", "Taille annuelle recommandée", "Peu d'exigences en fertilisation"]
      },
      commonIssues: [
        { symptom: "feuilles desséchées", cause: "air trop sec", severity: "warning" },
        { symptom: "jaunissement du feuillage", cause: "excès d'eau", severity: "warning" },
        { symptom: "tiges ligneuses peu feuillues", cause: "manque de taille", severity: "warning" },
        { symptom: "tiges noircies", cause: "gel", severity: "danger" }
      ]
    },
    {
      id: "aubergine",
      name: "Aubergine",
      commonTypes: ["Solanum melongena", "Aubergine violette", "Aubergine blanche", "Aubergine striée"],
      keywords: ["aubergine", "légume", "potager", "solanacée", "méditerranéen"],
      careInstructions: {
        watering: "Arrosage régulier, éviter de mouiller le feuillage. Plus important en période chaude.",
        light: "Plein soleil.",
        temperature: "20-30°C. Sensible au froid et au gel.",
        additional: ["Tuteurage nécessaire", "Sol riche", "Fertilisation régulière", "Taille des fleurs en excès"]
      },
      commonIssues: [
        { symptom: "petits fruits", cause: "pollinisation insuffisante", severity: "warning" },
        { symptom: "taches sur les feuilles", cause: "mildiou", severity: "danger" },
        { symptom: "feuilles jaunissantes", cause: "carence en nutriments", severity: "warning" },
        { symptom: "insectes sur les feuilles", cause: "pucerons ou doryphores", severity: "warning" }
      ]
    },
    {
      id: "dahlia",
      name: "Dahlia",
      commonTypes: ["Dahlia pinnata", "Dahlia cactus", "Dahlia pompon", "Dahlia décoratif"],
      keywords: ["dahlia", "fleur", "bulbe", "tubercule", "fleur d'été", "fleur coupée"],
      careInstructions: {
        watering: "Arrosage régulier, éviter de mouiller les fleurs. Plus important en période chaude.",
        light: "Plein soleil à mi-ombre légère.",
        temperature: "15-30°C. Ne supporte pas le gel.",
        additional: ["Tuteurage nécessaire pour les grandes variétés", "Fertilisation périodique", "Déterrage des tubercules en hiver dans les régions froides"]
      },
      commonIssues: [
        { symptom: "feuilles tachées", cause: "oïdium", severity: "warning" },
        { symptom: "floraison médiocre", cause: "manque de nutriments", severity: "warning" },
        { symptom: "tiges cassées", cause: "vent ou pluie violente", severity: "warning" },
        { symptom: "tubercules pourris", cause: "stockage hivernal inadapté", severity: "danger" }
      ]
    },
    {
      id: "bougainvillier",
      name: "Bougainvillier",
      commonTypes: ["Bougainvillea glabra", "Bougainvillea spectabilis"],
      keywords: ["bougainvillier", "grimpante", "fleur", "méditerranéen", "tropical", "bractées colorées"],
      careInstructions: {
        watering: "Arrosage modéré, laisser sécher entre les arrosages. Tolérant à la sécheresse une fois établi.",
        light: "Plein soleil.",
        temperature: "5-35°C. Sensible au gel.",
        additional: ["Taille régulière pour contrôler la croissance", "Protection hivernale dans les régions froides", "Support solide nécessaire pour les plantes grimpantes"]
      },
      commonIssues: [
        { symptom: "chute des bractées", cause: "changement d'environnement ou stress", severity: "warning" },
        { symptom: "peu de floraison", cause: "manque de lumière ou taille excessive", severity: "warning" },
        { symptom: "feuilles jaunissantes", cause: "arrosage excessif ou carence", severity: "warning" },
        { symptom: "tiges gelées", cause: "exposition au froid", severity: "danger" }
      ]
    },
    {
      id: "concombre",
      name: "Concombre",
      commonTypes: ["Cucumis sativus", "Concombre noa", "Concombre libanais", "Cornichon"],
      keywords: ["concombre", "légume", "potager", "cucurbitacée", "grimpante"],
      careInstructions: {
        watering: "Arrosage régulier et abondant, surtout en période de fructification.",
        light: "Plein soleil à mi-ombre légère.",
        temperature: "20-30°C. Sensible au froid et au gel.",
        additional: ["Tuteurage ou treillis recommandé", "Sol riche en matière organique", "Pincement des tiges latérales selon la variété"]
      },
      commonIssues: [
        { symptom: "fruits amers", cause: "stress hydrique ou températures fluctuantes", severity: "warning" },
        { symptom: "feuilles jaunissantes", cause: "oïdium", severity: "warning" },
        { symptom: "feuilles rongées", cause: "insectes", severity: "warning" },
        { symptom: "pourriture des fruits", cause: "contact avec le sol humide", severity: "danger" }
      ]
    },
    {
      id: "figuier",
      name: "Figuier",
      commonTypes: ["Ficus carica", "Figuier commun", "Figuier bifère"],
      keywords: ["figuier", "arbre fruitier", "figue", "méditerranéen", "rustique"],
      careInstructions: {
        watering: "Arrosage modéré, augmenter en période de fructification. Supporte bien la sécheresse une fois établi.",
        light: "Plein soleil.",
        temperature: "-10°C à 35°C selon les variétés. Certaines variétés sont plus rustiques que d'autres.",
        additional: ["Taille légère en fin d'hiver", "Protection hivernale pour les jeunes arbres", "Sol bien drainé indispensable"]
      },
      commonIssues: [
        { symptom: "feuilles jaunissantes", cause: "stress hydrique", severity: "warning" },
        { symptom: "figues qui tombent avant maturité", cause: "manque d'eau ou stress", severity: "warning" },
        { symptom: "taches sur les feuilles", cause: "maladie fongique", severity: "warning" },
        { symptom: "branches gelées", cause: "hiver rigoureux", severity: "danger" }
      ]
    },
    {
      id: "jasmin",
      name: "Jasmin",
      commonTypes: ["Jasminum officinale", "Jasmin d'hiver", "Jasmin étoilé"],
      keywords: ["jasmin", "grimpante", "fleur parfumée", "blanc", "arbuste", "méditerranéen"],
      careInstructions: {
        watering: "Arrosage régulier, plus abondant en période de croissance et de floraison.",
        light: "Plein soleil à mi-ombre. Le jasmin d'hiver tolère plus d'ombre.",
        temperature: "-5°C à 30°C selon les variétés. Le jasmin d'hiver est plus rustique.",
        additional: ["Taille après la floraison", "Support ou treillis pour les variétés grimpantes", "Sol bien drainé"]
      },
      commonIssues: [
        { symptom: "peu de fleurs", cause: "manque de lumière ou taille inadaptée", severity: "warning" },
        { symptom: "feuilles jaunissantes", cause: "carence ou arrosage excessif", severity: "warning" },
        { symptom: "feuilles collantes", cause: "cochenilles", severity: "warning" },
        { symptom: "tiges desséchées", cause: "gel", severity: "danger" }
      ]
    },
    {
      id: "courgette",
      name: "Courgette",
      commonTypes: ["Cucurbita pepo", "Courgette verte", "Courgette jaune", "Courgette ronde"],
      keywords: ["courgette", "légume", "potager", "cucurbitacée", "zucchini"],
      careInstructions: {
        watering: "Arrosage régulier et généreux, éviter de mouiller les feuilles.",
        light: "Plein soleil.",
        temperature: "18-30°C. Sensible au gel.",
        additional: ["Espace important nécessaire", "Sol riche en matière organique", "Paillage recommandé"]
      },
      commonIssues: [
        { symptom: "fleurs qui tombent sans former de fruits", cause: "pollinisation insuffisante", severity: "warning" },
        { symptom: "feuilles poudreuses blanches", cause: "oïdium", severity: "warning" },
        { symptom: "fruits pourris à l'extrémité", cause: "pourriture apicale, carence en calcium", severity: "danger" },
        { symptom: "croissance ralentie", cause: "températures trop basses", severity: "warning" }
      ]
    }
  ];

  /**
   * Analyse une plante à partir d'un nom ou d'une description
   * @param description Description textuelle de la plante
   * @returns Analyse de la plante
   */
  public analyzeByDescription(description: string): PlantAnalysisResponse {
    if (!description || description.trim().length === 0) {
      return this.getGenericAnalysis();
    }
    
    // Convertir en minuscules pour faciliter la comparaison
    const lowerDesc = description.toLowerCase().trim();
    
    // Vérifier d'abord les correspondances exactes pour un traitement prioritaire
    for (const plant of this.plantDatabase) {
      // Correspondance exacte avec le nom de la plante
      if (lowerDesc === plant.name.toLowerCase()) {
        console.log(`Correspondance exacte trouvée pour: ${plant.name}`);
        return this.generateAnalysisFromPlantData(plant);
      }
      
      // Correspondance exacte avec l'un des types communs
      for (const type of plant.commonTypes) {
        if (lowerDesc === type.toLowerCase()) {
          console.log(`Correspondance exacte trouvée pour le type: ${type}`);
          return this.generateAnalysisFromPlantData(plant);
        }
      }
    }
    
    // Si aucune correspondance exacte, rechercher des correspondances partielles
    let bestMatch: PlantData | null = null;
    let highestScore = 0;
    
    for (const plant of this.plantDatabase) {
      let score = 0;
      
      // Vérifier si le nom est contenu dans la description (ou vice versa)
      if (lowerDesc.includes(plant.name.toLowerCase()) || plant.name.toLowerCase().includes(lowerDesc)) {
        score += 8;
      }
      
      // Vérifier si un des types est contenu dans la description (ou vice versa)
      for (const type of plant.commonTypes) {
        const lowerType = type.toLowerCase();
        if (lowerDesc.includes(lowerType) || lowerType.includes(lowerDesc)) {
          score += 6;
          break;
        }
      }
      
      // Vérifier les mots-clés
      let keywordMatches = 0;
      for (const keyword of plant.keywords) {
        if (lowerDesc.includes(keyword.toLowerCase())) {
          keywordMatches++;
          score += 1;
        }
        
        // Si la recherche est exactement un des mots-clés
        if (lowerDesc === keyword.toLowerCase()) {
          score += 5;
        }
      }
      
      // Bonus pour les correspondances multiples de mots-clés
      if (keywordMatches >= 2) {
        score += 3;
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = plant;
      }
    }
    
    // Debug info
    console.log(`Meilleur score pour "${description}": ${highestScore}${bestMatch ? ' - ' + bestMatch.name : ''}`);
    
    // Si aucune correspondance convaincante n'est trouvée, utiliser une analyse générique
    if (!bestMatch || highestScore < 2) {
      console.log(`Aucune correspondance trouvée pour "${description}". Utilisation de l'analyse générique.`);
      return this.getGenericAnalysis();
    }
    
    return this.generateAnalysisFromPlantData(bestMatch);
  }

  /**
   * Analyse intelligente d'une image de plante
   * Cette fonction simule une analyse d'IA avancée sans dépendre d'OpenAI
   * @param imageFile Fichier image (path)
   * @param imageDescription Description optionnelle fournie par l'utilisateur
   */
  public analyzeImage(imageFile: string, imageDescription?: string): PlantAnalysisResponse {
    try {
      console.log("Analyseur de plantes local amélioré:", imageFile);
      
      // Extraire le nom du fichier sans l'extension
      const filename = path.basename(imageFile).toLowerCase();
      console.log("Nom de fichier extrait:", filename);
      
      // Créer un score pour chaque plante dans la base de données
      const plantScores: {plant: PlantData, score: number}[] = [];
      
      for (const plant of this.plantDatabase) {
        let score = 0;
        
        // 1. Analyse du nom de fichier
        if (filename.includes(plant.name.toLowerCase())) {
          score += 10; // Forte correspondance si le nom est dans le fichier
        }
        
        // 2. Vérifier les types communs
        for (const type of plant.commonTypes) {
          if (filename.includes(type.toLowerCase())) {
            score += 8;
            break;
          }
        }
        
        // 3. Vérifier les mots-clés dans le nom de fichier
        let keywordMatches = 0;
        for (const keyword of plant.keywords) {
          if (filename.includes(keyword.toLowerCase())) {
            keywordMatches++;
            score += 2;
          }
        }
        
        // Bonus pour les correspondances multiples de mots-clés
        if (keywordMatches >= 2) {
          score += 5;
        }
        
        // 4. Si une description est fournie par l'utilisateur, l'analyser aussi
        if (imageDescription) {
          const description = imageDescription.toLowerCase();
          
          if (description.includes(plant.name.toLowerCase())) {
            score += 15; // Très forte correspondance
          }
          
          for (const type of plant.commonTypes) {
            if (description.includes(type.toLowerCase())) {
              score += 12;
              break;
            }
          }
          
          for (const keyword of plant.keywords) {
            if (description.includes(keyword.toLowerCase())) {
              score += 3;
            }
          }
        }
        
        // Ajouter au tableau de scores
        plantScores.push({ plant, score });
      }
      
      // Trier par score décroissant
      plantScores.sort((a, b) => b.score - a.score);
      
      // Sélectionner la plante avec le meilleur score
      let selectedPlant: PlantData;
      
      // Si le meilleur score est suffisamment élevé, l'utiliser
      if (plantScores[0].score >= 5) {
        selectedPlant = plantScores[0].plant;
        console.log(`Plante identifiée avec un score de ${plantScores[0].score}: ${selectedPlant.name}`);
      } else {
        // Sinon, utiliser les 3 meilleures plantes et choisir aléatoirement parmi elles
        const topPlants = plantScores.slice(0, 3);
        const randomIndex = Math.floor(Math.random() * Math.min(3, topPlants.length));
        selectedPlant = topPlants[randomIndex].plant;
        console.log(`Aucune correspondance forte trouvée. Utilisation de ${selectedPlant.name}`);
      }
      
      // Générer une analyse à partir de la plante sélectionnée
      const analysis = this.generateAnalysisFromPlantData(selectedPlant);
      console.log("Analyse locale réussie !");
      return analysis;
    } catch (error) {
      console.error("Erreur d'analyse d'image:", error);
      return this.getGenericAnalysis();
    }
  }

  /**
   * Génère une analyse complète à partir des données de la plante
   */
  private generateAnalysisFromPlantData(plant: PlantData): PlantAnalysisResponse {
    // Déterminer le statut de santé (par défaut = healthy)
    let status: "healthy" | "warning" | "danger" = "healthy";
    const healthIssues: string[] = [];
    const recommendations: string[] = [];
    
    // Ajouter quelques conseils spécifiques à la plante
    recommendations.push(`Arrosez votre ${plant.name} ${plant.careInstructions.watering}`);
    recommendations.push(`Placez votre plante dans un endroit avec ${plant.careInstructions.light}`);
    
    if (plant.careInstructions.additional && plant.careInstructions.additional.length > 0) {
      plant.careInstructions.additional.forEach(tip => {
        recommendations.push(tip);
      });
    }
    
    // Sélectionnez aléatoirement une ou deux problèmes potentiels pour rendre l'analyse plus réaliste
    if (plant.commonIssues && plant.commonIssues.length > 0) {
      const randomIssue = plant.commonIssues[Math.floor(Math.random() * plant.commonIssues.length)];
      healthIssues.push(`Possible ${randomIssue.symptom} (${randomIssue.cause})`);
      
      // Si un problème grave est détecté, mettez à jour le statut
      if (randomIssue.severity === "danger") {
        status = "danger";
      } else if (randomIssue.severity === "warning" && status === "healthy") {
        status = "warning";
      }
      
      // Ajoutez une recommandation pour résoudre le problème
      if (randomIssue.symptom.includes("jaunissantes") || randomIssue.symptom.includes("jaunes")) {
        recommendations.push("Vérifiez votre fréquence d'arrosage et ajustez-la si nécessaire");
      } else if (randomIssue.symptom.includes("brunes") || randomIssue.symptom.includes("sèches")) {
        recommendations.push("Augmentez l'humidité ambiante autour de votre plante");
      } else if (randomIssue.symptom.includes("pourriture")) {
        recommendations.push("Réduisez immédiatement la fréquence d'arrosage et vérifiez le drainage");
      }
    }
    
    return {
      plantName: plant.name,
      species: plant.commonTypes[0],
      status,
      healthIssues,
      recommendations,
      careInstructions: {
        watering: plant.careInstructions.watering,
        light: plant.careInstructions.light,
        temperature: plant.careInstructions.temperature,
        additional: plant.careInstructions.additional
      }
    };
  }

  /**
   * Génère une analyse générique pour les plantes non identifiées
   */
  public getGenericAnalysis(): PlantAnalysisResponse {
    return {
      plantName: "Plante d'intérieur",
      species: "Espèce non identifiée",
      status: "healthy",
      healthIssues: [],
      recommendations: [
        "Arrosez modérément, quand le sol est sec sur 2-3 cm",
        "Placez dans un endroit lumineux mais sans soleil direct",
        "Observez régulièrement votre plante pour détecter tout changement"
      ],
      careInstructions: {
        watering: "Arrosez quand le sol est sec sur 2-3 cm de profondeur",
        light: "Lumière indirecte à modérée",
        temperature: "18-24°C, évitez les courants d'air froid",
        additional: [
          "Vérifiez l'humidité du sol avant d'arroser",
          "Adaptez l'arrosage selon la saison"
        ]
      }
    };
  }
}

interface PlantData {
  id: string;
  name: string;
  commonTypes: string[];
  keywords: string[];
  careInstructions: {
    watering: string;
    light: string;
    temperature: string;
    additional?: string[];
  };
  commonIssues: Array<{
    symptom: string;
    cause: string;
    severity: "healthy" | "warning" | "danger";
  }>;
}
