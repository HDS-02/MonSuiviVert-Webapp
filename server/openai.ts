import { PlantAnalyzer } from "./plantAnalyzer";
import { PlantAnalysisResponse } from "@shared/schema";

// Nouvel analyseur de plantes basé sur des règles (ne nécessite pas d'API)
const plantAnalyzer = new PlantAnalyzer();

/**
 * Fonction d'analyse de plante basée uniquement sur des connaissances locales
 * @param plantName Nom de la plante
 * @returns Informations détaillées sur la plante
 */
export async function getPlantInfoByName(plantName: string): Promise<PlantAnalysisResponse> {
  console.log(`Analyse locale de la plante "${plantName}"...`);
  
  // Utiliser notre analyseur local basé sur des règles
  return plantAnalyzer.analyzeByDescription(plantName);
}

/**
 * Fonction d'analyse d'image de plante basée uniquement sur des règles locales
 * @param base64Image Image encodée en base64
 * @param fileName Nom du fichier (optionnel)
 * @param description Description textuelle (optionnel)
 * @returns Résultat de l'analyse
 */
export async function analyzePlantImage(base64Image: string, fileName?: string, description?: string): Promise<any> {
  console.log("Démarrage de l'analyse d'image locale...");
  
  // Si un nom de fichier est fourni, l'utiliser pour l'analyse
  if (fileName) {
    return plantAnalyzer.analyzeImage(fileName, description);
  }
  
  // Sinon, utiliser la description si disponible
  if (description && description.trim().length > 0) {
    return plantAnalyzer.analyzeByDescription(description);
  }
  
  // Si aucune information disponible, retourner une analyse générique
  return plantAnalyzer.getGenericAnalysis();
}
