import { PlantAnalyzer } from "./plantAnalyzer";

interface DiagnosticInput {
  plantId: number;
  plantName: string;
  plantSpecies?: string;
  lastWatering: string; // today, yesterday, few_days, week, more_than_week, dont_remember
  environment: {
    directSunlight: boolean;
    brightIndirect: boolean;
    lowLight: boolean;
  };
  temperature: string; // very_cold, cold, cool, normal, warm, hot, fluctuating
  symptoms: {
    yellowLeaves: boolean;
    brownSpots: boolean;
    droppingLeaves: boolean;
    dryLeaves: boolean;
    moldOrFungus: boolean;
    insects: boolean;
    slowGrowth: boolean;
    rootIssues: boolean;
  };
  additionalNotes?: string;
}

interface DiagnosticResult {
  diagnosis: string;
  status: "healthy" | "warning" | "danger";
  actionRequired: boolean;
}

/**
 * Service de diagnostic pour les plantes en difficulté
 */
export class PlantDiagnosticService {
  private plantAnalyzer: PlantAnalyzer;

  constructor() {
    this.plantAnalyzer = new PlantAnalyzer();
  }

  /**
   * Génère un diagnostic basé sur les symptômes observés
   */
  public generateDiagnosis(input: DiagnosticInput): DiagnosticResult {
    console.log("Génération d'un diagnostic pour la plante:", input.plantName);
    
    // Évaluer la sévérité des symptômes
    const symptomCount = Object.values(input.symptoms).filter(Boolean).length;
    
    // Déterminer le statut général de la plante
    let status: "healthy" | "warning" | "danger" = "healthy";
    
    if (symptomCount > 4) {
      status = "danger";
    } else if (symptomCount > 1) {
      status = "warning";
    }
    
    // Construire le diagnostic basé sur les informations fournies
    const diagnosis = this.buildDiagnosisText(input, status);
    
    // Déterminer si une action urgente est nécessaire
    const actionRequired = status === "danger" || 
      input.symptoms.moldOrFungus || 
      input.symptoms.insects || 
      (input.symptoms.yellowLeaves && input.symptoms.droppingLeaves);
    
    return {
      diagnosis,
      status,
      actionRequired
    };
  }

  /**
   * Construit le texte de diagnostic
   */
  private buildDiagnosisText(input: DiagnosticInput, status: "healthy" | "warning" | "danger"): string {
    let diagnosis = `**État général de votre ${input.plantName}**: `;
    
    // Description de l'état général
    if (status === "healthy") {
      diagnosis += "Globalement en bonne santé, mais quelques ajustements sont possibles.\n\n";
    } else if (status === "warning") {
      diagnosis += "Quelques signes de stress sont présents et nécessitent votre attention.\n\n";
    } else {
      diagnosis += "Votre plante montre des signes de détresse importants qui nécessitent une intervention rapide.\n\n";
    }
    
    // Analyse des problèmes d'arrosage
    diagnosis += this.analyzeWateringIssues(input);
    
    // Analyse des problèmes d'environnement
    diagnosis += this.analyzeEnvironmentIssues(input);
    
    // Analyse des signes de parasites ou maladies
    if (input.symptoms.insects || input.symptoms.moldOrFungus) {
      diagnosis += this.analyzePestAndDiseaseIssues(input);
    }
    
    // Recommandations générales
    diagnosis += "\n**Plan d'action recommandé** :\n";
    diagnosis += this.generateActionPlan(input, status);
    
    return diagnosis;
  }

  /**
   * Analyse les problèmes liés à l'arrosage
   */
  private analyzeWateringIssues(input: DiagnosticInput): string {
    let analysis = "**Arrosage** : ";
    
    const hasWaterIssues = 
      input.symptoms.yellowLeaves || 
      input.symptoms.droppingLeaves || 
      input.symptoms.dryLeaves;
    
    if (!hasWaterIssues) {
      return analysis + "Le régime d'arrosage semble convenable.\n\n";
    }
    
    // Surrosage potentiel
    if (input.lastWatering === "today" || input.lastWatering === "yesterday") {
      if (input.symptoms.yellowLeaves && input.symptoms.droppingLeaves) {
        return analysis + "Signes possibles de surrosage. Les feuilles jaunissantes et tombantes peuvent indiquer un excès d'eau qui empêche les racines de respirer. Laissez le sol sécher entre les arrosages.\n\n";
      }
    }
    
    // Sous-arrosage potentiel
    if (input.lastWatering === "week" || input.lastWatering === "more_than_week") {
      if (input.symptoms.dryLeaves || input.symptoms.droppingLeaves) {
        return analysis + "Signes possibles de sous-arrosage. Les feuilles sèches ou tombantes peuvent indiquer un manque d'eau. Un arrosage plus régulier est recommandé pour votre " + input.plantName + ".\n\n";
      }
    }
    
    // Analyse générique si les cas spécifiques ne correspondent pas
    if (input.symptoms.yellowLeaves) {
      analysis += "Les feuilles jaunes peuvent indiquer un problème d'arrosage (trop ou pas assez). ";
    }
    
    if (input.symptoms.droppingLeaves) {
      analysis += "Les feuilles tombantes suggèrent souvent un stress hydrique. ";
    }
    
    if (input.symptoms.dryLeaves) {
      analysis += "Les feuilles sèches indiquent généralement un manque d'humidité. ";
    }
    
    return analysis + "\n\n";
  }

  /**
   * Analyse les problèmes liés à l'environnement
   */
  private analyzeEnvironmentIssues(input: DiagnosticInput): string {
    let analysis = "**Environnement** : ";
    
    // Problèmes de lumière
    if (input.symptoms.yellowLeaves || input.symptoms.brownSpots || input.symptoms.slowGrowth) {
      if (input.environment.directSunlight && (input.symptoms.brownSpots || input.symptoms.yellowLeaves)) {
        analysis += "La lumière directe du soleil peut être trop intense pour votre plante, causant des brûlures (taches brunes) ou du stress (jaunissement). ";
      } else if (input.environment.lowLight && input.symptoms.slowGrowth) {
        analysis += "La faible luminosité peut expliquer la croissance lente de votre plante. ";
      }
    }
    
    // Problèmes de température
    if (input.temperature === "very_cold" || input.temperature === "cold") {
      analysis += "Les températures fraîches peuvent ralentir la croissance et stresser votre plante. ";
      
      if (input.symptoms.droppingLeaves || input.symptoms.yellowLeaves) {
        analysis += "Le froid est souvent responsable de feuilles qui jaunissent ou tombent. ";
      }
    } else if (input.temperature === "hot" || input.temperature === "warm") {
      analysis += "Les températures élevées augmentent les besoins en eau et peuvent stresser certaines plantes. ";
      
      if (input.symptoms.dryLeaves) {
        analysis += "La chaleur combinée à un arrosage insuffisant peut causer des feuilles sèches. ";
      }
    } else if (input.temperature === "fluctuating") {
      analysis += "Les variations importantes de température peuvent stresser votre plante et affecter sa santé générale. ";
    }
    
    return analysis + "\n\n";
  }

  /**
   * Analyse les problèmes liés aux parasites et maladies
   */
  private analyzePestAndDiseaseIssues(input: DiagnosticInput): string {
    let analysis = "**Parasites et maladies** : ";
    
    if (input.symptoms.insects) {
      analysis += "La présence d'insectes est préoccupante et nécessite une intervention. ";
      
      if (input.symptoms.yellowLeaves || input.symptoms.brownSpots) {
        analysis += "Les insectes peuvent causer des dommages visibles comme des taches ou du jaunissement. ";
      }
      
      analysis += "Examinez attentivement les tiges et le dessous des feuilles pour identifier le type d'insecte. ";
    }
    
    if (input.symptoms.moldOrFungus) {
      analysis += "La présence de moisissure ou de champignons indique généralement un excès d'humidité et une ventilation insuffisante. ";
      
      if (input.lastWatering === "today" || input.lastWatering === "yesterday") {
        analysis += "Un arrosage trop fréquent peut favoriser le développement de moisissures. ";
      }
    }
    
    return analysis + "\n\n";
  }

  /**
   * Génère un plan d'action
   */
  private generateActionPlan(input: DiagnosticInput, status: "healthy" | "warning" | "danger"): string {
    let plan = "";
    let stepCount = 1;
    
    // Actions liées à l'arrosage
    if (input.symptoms.yellowLeaves && input.symptoms.droppingLeaves && 
        (input.lastWatering === "today" || input.lastWatering === "yesterday")) {
      plan += `${stepCount}. Réduisez la fréquence d'arrosage. Laissez sécher les premiers centimètres du terreau avant d'arroser à nouveau.\n`;
      stepCount++;
      plan += `${stepCount}. Vérifiez que le pot a un bon drainage. L'eau ne doit pas stagner dans la soucoupe.\n`;
      stepCount++;
    } else if ((input.symptoms.dryLeaves || input.symptoms.droppingLeaves) && 
               (input.lastWatering === "week" || input.lastWatering === "more_than_week")) {
      plan += `${stepCount}. Augmentez la fréquence d'arrosage. Votre ${input.plantName} semble avoir soif.\n`;
      stepCount++;
      if (input.environment.directSunlight || input.temperature === "hot") {
        plan += `${stepCount}. Dans ces conditions chaudes ou ensoleillées, prévoyez des arrosages plus fréquents.\n`;
        stepCount++;
      }
    }
    
    // Actions liées à l'environnement
    if (input.environment.directSunlight && (input.symptoms.brownSpots || input.symptoms.yellowLeaves)) {
      plan += `${stepCount}. Déplacez votre plante dans un endroit avec une lumière indirecte pour éviter les brûlures du soleil.\n`;
      stepCount++;
    } else if (input.environment.lowLight && input.symptoms.slowGrowth) {
      plan += `${stepCount}. Trouvez un emplacement plus lumineux pour votre plante, sans l'exposer directement aux rayons du soleil.\n`;
      stepCount++;
    }
    
    // Actions contre les parasites et maladies
    if (input.symptoms.insects) {
      plan += `${stepCount}. Traitez votre plante avec un savon insecticide doux ou de l'huile de neem. Nettoyez régulièrement les feuilles.\n`;
      stepCount++;
      plan += `${stepCount}. Isolez cette plante des autres pour éviter la propagation des insectes.\n`;
      stepCount++;
    }
    
    if (input.symptoms.moldOrFungus) {
      plan += `${stepCount}. Améliorez la circulation d'air autour de votre plante. Retirez les parties affectées par la moisissure.\n`;
      stepCount++;
      plan += `${stepCount}. Réduisez l'arrosage et évitez de mouiller les feuilles lorsque vous arrosez.\n`;
      stepCount++;
    }
    
    // Si aucune action spécifique n'a été ajoutée
    if (!plan) {
      if (status === "healthy") {
        plan += "1. Continuez avec vos soins actuels qui semblent bien fonctionner.\n";
        plan += "2. Surveillez votre plante pour détecter tout changement dans son apparence.\n";
      } else {
        plan += "1. Établissez un calendrier d'arrosage plus régulier pour votre " + input.plantName + ".\n";
        plan += "2. Assurez-vous que votre plante reçoit la quantité appropriée de lumière, sans être exposée au soleil direct brûlant.\n";
      }
    }
    
    // Recommandations générales
    if (status === "danger") {
      plan += "\n**Attention**: Votre plante nécessite une intervention rapide. Appliquez ces recommandations dès que possible pour la sauver.\n";
    }
    
    return plan;
  }
}

export const plantDiagnosticService = new PlantDiagnosticService();
