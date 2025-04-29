/**
 * Base de données d'arbres fruitiers
 */

import { PlantEntry } from './plantDatabase';

export const fruitTrees: Omit<PlantEntry, 'category'>[] = [
  {
    name: "Avocatier",
    species: "Persea americana",
    wateringFrequency: 3,
    light: "Directe à mi-ombragée",
    temperature: "20-30°C",
    careNotes: "Nécessite un sol drainant et riche en matière organique. Sensible au gel, à protéger en hiver dans les régions froides. Peut mettre 5 à 13 ans avant de produire des fruits.",
    potSize: "Grand pot de 40-50 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Pourriture des racines", description: "Causée par un excès d'humidité et des champignons du sol, provoque un jaunissement des feuilles et dépérissement", treatment: "Réduire l'arrosage, assurer un bon drainage et traiter avec un fongicide adapté"},
      {name: "Anthracnose", description: "Maladie fongique qui cause des taches noires sur les feuilles et les fruits", treatment: "Éliminer les parties infectées et traiter avec un fongicide à base de cuivre"},
      {name: "Cochenilles", description: "Insectes qui se nourrissent de la sève et sécrètent du miellat", treatment: "Appliquer de l'huile horticole ou un insecticide systémique"}
    ]
  },
  {
    name: "Abricotier",
    species: "Prunus armeniaca",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Préfère les climats ensoleillés et secs. Sensible aux gelées tardives qui peuvent détruire les fleurs. Nécessite une taille régulière pour maintenir sa forme et sa productivité.",
    potSize: "Grand pot de 50-60 cm de diamètre pour les versions naines avec excellent drainage",
    commonDiseases: [
      {name: "Moniliose", description: "Champignon qui affecte les fleurs et les fruits, causant leur pourriture", treatment: "Éliminer tous les fruits momifiés et parties infectées, traiter préventivement avec un fongicide"},
      {name: "Rouille", description: "Champignon qui forme des pustules orangées sur les feuilles", treatment: "Pulvériser un fongicide à base de cuivre dès l'apparition des premiers symptômes"},
      {name: "Pucerons", description: "Insectes qui attaquent les jeunes pousses et feuilles", treatment: "Utiliser un insecticide naturel ou favoriser les prédateurs naturels comme les coccinelles"}
    ]
  },
  {
    name: "Amandier",
    species: "Prunus dulcis",
    wateringFrequency: 7,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Arbre adapté aux climats méditerranéens, résistant à la sécheresse une fois établi. Préfère les sols calcaires bien drainés. Floraison précoce sensible aux gelées tardives.",
    potSize: "Non adapté à la culture en pot (système racinaire profond)",
    commonDiseases: [
      {name: "Cloque du pêcher", description: "Affecte également l'amandier, déformant et colorant les feuilles", treatment: "Traitement préventif à la bouillie bordelaise à la chute des feuilles et avant le débourrement"},
      {name: "Moniliose", description: "Pourriture brune des fleurs et rameaux", treatment: "Éliminer les parties atteintes et traiter avec un fongicide homologué"},
      {name: "Eurytoma amygdali", description: "Insecte qui pond dans les jeunes fruits, causant leur chute", treatment: "Traitements insecticides spécifiques après la floraison"}
    ]
  },
  {
    name: "Asiminier - Pawpaw",
    species: "Asimina triloba",
    wateringFrequency: 4,
    light: "Mi-ombragée à directe",
    temperature: "15-25°C",
    careNotes: "Arbre nord-américain qui préfère un sol acide, riche et humide. Les jeunes plants bénéficient d'une ombre partielle. Nécessite généralement deux arbres pour une bonne pollinisation.",
    potSize: "Pot de 40-50 cm de diamètre, profond pour le système racinaire pivot",
    commonDiseases: [
      {name: "Phyllosticta", description: "Taches foliaires noires qui peuvent causer une défoliation", treatment: "Ramasser et détruire les feuilles infectées, appliquer un fongicide si nécessaire"},
      {name: "Nécrose des branches", description: "Dépérissement progressif des branches", treatment: "Tailler les parties atteintes avec des outils désinfectés"},
      {name: "Phytophthora", description: "Pourriture des racines dans les sols mal drainés", treatment: "Améliorer le drainage et traiter avec un fongicide spécifique"}
    ]
  },
  {
    name: "Bananier comestible",
    species: "Musa sp.",
    wateringFrequency: 2,
    light: "Directe à mi-ombragée",
    temperature: "20-30°C",
    careNotes: "Plante tropicale qui nécessite beaucoup d'eau et un sol riche en matière organique. Sensible au gel, à protéger ou rentrer en hiver. Multiplication par division des rejets.",
    potSize: "Grand pot de 40-60 cm de diamètre, profond de 50 cm minimum",
    commonDiseases: [
      {name: "Cercosporiose", description: "Taches brunes sur les feuilles qui finissent par sécher", treatment: "Éliminer les feuilles atteintes et traiter avec un fongicide"},
      {name: "Charançon du bananier", description: "Insecte dont les larves creusent des galeries dans le pseudotronc", treatment: "Pièges à phéromones et insecticides systémiques"},
      {name: "Fusariose", description: "Maladie vasculaire qui cause un jaunissement des feuilles et un flétrissement", treatment: "Pas de traitement efficace, utiliser des variétés résistantes et des sols sains"}
    ]
  },
  {
    name: "Brugnonier",
    species: "Prunus persica var. nucipersica",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Variété de pêcher produisant des fruits à peau lisse. Mêmes exigences que le pêcher : sol bien drainé, exposition ensoleillée, taille régulière pour maintenir la forme et favoriser la fructification.",
    potSize: "Pot de 40-50 cm de diamètre pour les variétés naines",
    commonDiseases: [
      {name: "Cloque du pêcher", description: "Déformation et coloration rougeâtre des feuilles au printemps", treatment: "Traitement préventif à la bouillie bordelaise à la chute des feuilles et avant le débourrement"},
      {name: "Oïdium", description: "Champignon qui forme un feutrage blanc sur les feuilles et fruits", treatment: "Pulvériser du soufre ou un fongicide spécifique dès l'apparition des symptômes"},
      {name: "Pucerons verts", description: "Insectes qui causent l'enroulement des feuilles", treatment: "Savon noir ou insecticide naturel en début d'infestation"}
    ]
  },
  {
    name: "Cédratier",
    species: "Citrus medica",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Agrume sensible au froid qui nécessite une protection hivernale dans les régions tempérées. Sol bien drainé et acide. Produit de gros fruits parfumés utilisés principalement pour leur écorce confite.",
    potSize: "Pot de 40-50 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Cochenilles", description: "Insectes qui forment des boucliers sur les branches et feuilles", treatment: "Nettoyage à l'alcool ou application d'huile blanche"},
      {name: "Fumagine", description: "Champignon noir qui se développe sur le miellat des insectes", treatment: "Éliminer les insectes producteurs de miellat et laver les feuilles"},
      {name: "Gommose", description: "Écoulement de gomme sur le tronc et les branches", treatment: "Éviter les blessures, améliorer le drainage et appliquer une pâte fongicide sur les lésions"}
    ]
  },
  {
    name: "Cerisier",
    species: "Prunus cerasus",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Arbre fruitier qui s'adapte à divers climats. Nécessite généralement une autre variété compatible pour la pollinisation. Sensible aux excès d'eau qui favorisent les maladies racinaires.",
    potSize: "Pot de 50-60 cm de diamètre pour les variétés naines",
    commonDiseases: [
      {name: "Moniliose", description: "Pourriture brune des fruits et dessèchement des rameaux", treatment: "Éliminer les fruits momifiés et tailler les parties infectées, traiter avec un fongicide"},
      {name: "Cylindrosporiose", description: "Taches rougeâtres sur les feuilles qui finissent par se percer", treatment: "Ramasser et détruire les feuilles tombées, pulvériser un fongicide cuivré"},
      {name: "Mouche de la cerise", description: "Insecte dont les larves se développent dans les fruits", treatment: "Pièges collants jaunes et traitements insecticides au moment approprié"}
    ]
  },
  {
    name: "Châtaignier",
    species: "Castanea sativa",
    wateringFrequency: 6,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Grand arbre qui préfère les sols acides et bien drainés. Éviter les sols calcaires. Plusieurs variétés sont nécessaires pour une bonne pollinisation. Production de fruits après 7-10 ans.",
    potSize: "Non adapté à la culture en pot (trop grand)",
    commonDiseases: [
      {name: "Chancre de l'écorce", description: "Maladie fongique qui provoque des lésions sur l'écorce", treatment: "Tailler et brûler les parties atteintes, appliquer un mastic cicatrisant"},
      {name: "Cynips du châtaignier", description: "Petit insecte qui forme des galles sur les feuilles", treatment: "Introduction de Torymus sinensis, parasitoïde naturel du cynips"},
      {name: "Encre du châtaignier", description: "Maladie racinaire qui provoque un noircissement et pourrissement des racines", treatment: "Pas de traitement curatif efficace, mesures préventives et variétés résistantes"}
    ]
  },
  {
    name: "Citronnier",
    species: "Citrus limon",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "15-28°C",
    careNotes: "Agrume qui nécessite un sol acide et bien drainé. Sensible au froid (à protéger en-dessous de 5°C). Arrosages réguliers mais sans excès. Taille légère pour maintenir une forme compacte.",
    potSize: "Pot de 40-50 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Cochenilles", description: "Insectes qui se fixent sur les feuilles et tiges, produisant du miellat", treatment: "Nettoyage avec un chiffon imbibé d'alcool ou application d'huile de neem"},
      {name: "Fumagine", description: "Champignon noir se développant sur le miellat des cochenilles", treatment: "Éliminer les insectes responsables puis nettoyer les feuilles avec de l'eau savonneuse"},
      {name: "Chlorose ferrique", description: "Jaunissement des feuilles dû à un manque de fer, fréquent en sol calcaire", treatment: "Apport de chélate de fer et acidification du sol"}
    ]
  },
  {
    name: "Citron caviar - Lime d'Australie",
    species: "Microcitrus australasica",
    wateringFrequency: 4,
    light: "Directe à mi-ombragée",
    temperature: "15-30°C",
    careNotes: "Agrume original produisant des fruits contenant de petites vésicules qui éclatent en bouche. Préfère les situations protégées du vent. Arrosage modéré et sol légèrement acide.",
    potSize: "Pot de 30-40 cm de diamètre avec drainage parfait",
    commonDiseases: [
      {name: "Cochenilles", description: "Insectes parasites qui affaiblissent la plante", treatment: "Nettoyage à l'alcool ou application d'huile horticole"},
      {name: "Acariens", description: "Minuscules araignées qui causent un bronzage des feuilles", treatment: "Augmenter l'humidité ambiante et pulvériser régulièrement le feuillage"},
      {name: "Chlorose", description: "Jaunissement des feuilles dû à un manque d'éléments nutritifs", treatment: "Application d'engrais acidifiant pour agrumes"}
    ]
  },
  {
    name: "Citron vert - Lime - Limettier",
    species: "Citrus aurantiifolia",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "18-30°C",
    careNotes: "Plus sensible au froid que le citronnier. Préfère les climats chauds et humides. Sol bien drainé et acide. Fructification abondante si les conditions sont optimales.",
    potSize: "Pot de 30-40 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Acariens", description: "Minuscules parasites qui causent un aspect bronzé des feuilles", treatment: "Douches foliaires régulières et acaricides si nécessaire"},
      {name: "Cochenilles", description: "Insectes immobiles qui colonisent les feuilles et branches", treatment: "Nettoyage manuel avec un coton imbibé d'alcool ou huile horticole"},
      {name: "Carences nutritives", description: "Décoloration des feuilles selon l'élément manquant", treatment: "Application d'engrais complet pour agrumes"}
    ]
  },
  {
    name: "Citrus divers",
    species: "Citrus sp.",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Regroupe diverses espèces d'agrumes comme les kumquats, les calamondin, etc. Généralement sensibles au gel. Nécessitent un sol acide, bien drainé et des arrosages réguliers sans excès.",
    potSize: "Pot de 30-50 cm selon l'espèce, avec excellent drainage",
    commonDiseases: [
      {name: "Cochenilles", description: "Parasites qui se fixent sur les tiges et feuilles", treatment: "Nettoyage mécanique et traitement à l'huile blanche"},
      {name: "Mineuse des agrumes", description: "Petit papillon dont les larves creusent des galeries dans les feuilles", treatment: "Insecticides spécifiques ou pièges à phéromones"},
      {name: "Botrytis", description: "Moisissure grise qui se développe sur les fleurs et jeunes fruits", treatment: "Aérer la plante et traiter avec un fongicide adapté"}
    ]
  },
  {
    name: "Clémentinier - Mandarinier - Satsuma",
    species: "Citrus reticulata et hybrides",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Agrumes produisant des fruits faciles à peler. Le mandarinier est plus rustique que le clémentinier. Tous apprécient un sol acide et des arrosages réguliers. Protection hivernale nécessaire en régions froides.",
    potSize: "Pot de 40-50 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Cochenilles farineuses", description: "Insectes couverts d'une substance cireuse blanche", treatment: "Nettoyage à l'alcool et traitement insecticide si infestation importante"},
      {name: "Fumagine", description: "Champignon noir se développant sur le miellat", treatment: "Éliminer les insectes producteurs de miellat et laver les feuilles"},
      {name: "Tarsonème", description: "Acarien microscopique qui déforme les jeunes pousses", treatment: "Acaricides spécifiques et augmentation de l'humidité ambiante"}
    ]
  },
  {
    name: "Cognassier",
    species: "Cydonia oblonga",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Arbre fruitier rustique qui supporte bien le froid. Préfère les sols frais et profonds. Auto-fertile, il n'a pas besoin d'autres variétés pour fructifier. Peu exigeant en entretien.",
    potSize: "Pot de 50 cm de diamètre pour les formes naines",
    commonDiseases: [
      {name: "Moniliose", description: "Pourriture brune des fruits qui restent momifiés sur l'arbre", treatment: "Enlever tous les fruits atteints et tailler les parties malades, traiter avec un fongicide"},
      {name: "Entomosporiose", description: "Taches brunes sur les feuilles qui jaunissent et tombent", treatment: "Ramasser les feuilles tombées et traiter avec un fongicide à base de cuivre"},
      {name: "Feu bactérien", description: "Maladie bactérienne grave qui fait brunir et sécher les rameaux", treatment: "Tailler largement en dessous des parties atteintes et désinfecter les outils"}
    ]
  },
  {
    name: "Figuier",
    species: "Ficus carica",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Arbre méditerranéen assez rustique une fois établi. Préfère les sols calcaires bien drainés. La plupart des variétés produisent des fruits sans pollinisation. Taille légère en fin d'hiver.",
    potSize: "Pot de 40-50 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Rouille", description: "Pustules orangées sur les feuilles", treatment: "Ramasser les feuilles atteintes et pulvériser un fongicide à base de cuivre"},
      {name: "Cochenilles", description: "Insectes qui colonisent les branches et le dessous des feuilles", treatment: "Nettoyage à l'alcool ou traitement à l'huile blanche"},
      {name: "Pourriture des fruits", description: "Moisissure sur les fruits par temps humide", treatment: "Éviter l'excès d'humidité et récolter les fruits dès maturité"}
    ]
  },
  {
    name: "Goyavier - Feijoa",
    species: "Acca sellowiana",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Arbuste originaire d'Amérique du Sud produisant des fruits parfumés. Assez rustique (résiste à -10°C). Préfère les sols légèrement acides. Auto-fertile mais la production est améliorée avec plusieurs plants.",
    potSize: "Pot de 40-50 cm de diamètre avec drainage efficace",
    commonDiseases: [
      {name: "Anthracnose", description: "Taches noires sur les fruits et les feuilles", treatment: "Éliminer les parties infectées et traiter avec un fongicide adapté"},
      {name: "Cochenilles", description: "Insectes fixés sur les rameaux et feuilles", treatment: "Nettoyage manuel ou traitement à l'huile de neem"},
      {name: "Pourriture grise", description: "Moisissure grise sur les fleurs et fruits", treatment: "Améliorer la circulation d'air et réduire l'humidité"}
    ]
  },
  {
    name: "Grenadier",
    species: "Punica granatum",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "15-35°C",
    careNotes: "Arbuste méditerranéen résistant à la sécheresse et relativement rustique. Préfère les sols bien drainés, même calcaires. Floraison décorative suivie de fruits à grains juteux. Taille légère en fin d'hiver.",
    potSize: "Pot de 40-50 cm de diamètre avec drainage efficace",
    commonDiseases: [
      {name: "Oïdium", description: "Champignon qui forme un feutrage blanc sur les feuilles", treatment: "Traiter avec du soufre ou un fongicide adapté"},
      {name: "Zeuzère", description: "Chenille qui creuse des galeries dans le bois", treatment: "Insérer un fil métallique dans les galeries pour détruire les larves"},
      {name: "Pucerons", description: "Insectes qui attaquent les jeunes pousses", treatment: "Pulvériser une solution de savon noir ou un insecticide naturel"}
    ]
  },
  {
    name: "Kumquat",
    species: "Fortunella sp.",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Petit agrume dont les fruits se mangent avec la peau. Plus résistant au froid que la plupart des agrumes. Préfère un sol légèrement acide et des arrosages réguliers sans excès.",
    potSize: "Pot de 30-40 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Cochenilles", description: "Insectes qui colonisent les feuilles et rameaux", treatment: "Nettoyage avec un chiffon imbibé d'alcool"},
      {name: "Chlorose ferrique", description: "Jaunissement des feuilles par manque de fer", treatment: "Application de chélate de fer et acidification du substrat"},
      {name: "Acariens", description: "Minuscules parasites qui provoquent un aspect bronzé des feuilles", treatment: "Augmenter l'humidité ambiante et traiter avec un acaricide si nécessaire"}
    ]
  },
  {
    name: "Mirabellier",
    species: "Prunus domestica subsp. syriaca",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Variété de prunier produisant de petits fruits jaunes très parfumés. Assez rustique et peu exigeant. Préfère les sols profonds. La plupart des variétés nécessitent un pollinisateur compatible.",
    potSize: "Grand pot de 50-60 cm pour les variétés naines",
    commonDiseases: [
      {name: "Moniliose", description: "Pourriture brune des fruits qui restent momifiés sur l'arbre", treatment: "Éliminer tous les fruits atteints et tailler les rameaux infectés"},
      {name: "Rouille", description: "Pustules orange sur les feuilles", treatment: "Ramasser les feuilles tombées et pulvériser un fongicide au printemps"},
      {name: "Carpocapse", description: "Chenille qui pénètre dans les fruits", treatment: "Pièges à phéromones et traitements biologiques adaptés"}
    ]
  },
  {
    name: "Mûrier",
    species: "Morus sp.",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-30°C",
    careNotes: "Arbre rustique et peu exigeant qui produit des fruits ressemblant aux mûres de ronce. Préfère les sols profonds et bien drainés. Croissance assez rapide. Les fruits mûrs tachent fortement.",
    potSize: "Grand pot de 50-60 cm de diamètre pour les jeunes sujets",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Traiter avec du soufre ou un fongicide spécifique"},
      {name: "Pourriture des fruits", description: "Moisissure sur les fruits par temps humide", treatment: "Récolter régulièrement et ne pas laisser les fruits trop mûrs sur l'arbre"},
      {name: "Psylle", description: "Insecte qui déforme les feuilles", treatment: "Insecticide adapté en début d'infestation"}
    ]
  },
  {
    name: "Nashi - Pomme-Poire Asiatique",
    species: "Pyrus pyrifolia",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-30°C",
    careNotes: "Arbre fruitier produisant des fruits qui ressemblent à des pommes mais avec la texture et le goût des poires. Assez rustique. Nécessite généralement un pollinisateur compatible. Taille comme le poirier.",
    potSize: "Pot de 50 cm de diamètre pour les formes naines",
    commonDiseases: [
      {name: "Tavelure", description: "Taches brunes-olivâtres sur les fruits et les feuilles", treatment: "Traitements fongicides préventifs au printemps"},
      {name: "Feu bactérien", description: "Noircissement et dessèchement des rameaux comme s'ils étaient brûlés", treatment: "Tailler largement sous les parties infectées avec des outils désinfectés"},
      {name: "Carpocapse", description: "Ver des fruits qui creuse des galeries dans la chair", treatment: "Pièges à phéromones et traitements au moment opportun"}
    ]
  },
  {
    name: "Nectarinier",
    species: "Prunus persica var. nucipersica",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Variété de pêcher à peau lisse. Mêmes exigences que le pêcher : sol bien drainé, exposition ensoleillée. Sensible aux maladies fongiques par temps humide. Taille régulière pour maintenir la production.",
    potSize: "Pot de 50 cm de diamètre pour les variétés naines",
    commonDiseases: [
      {name: "Cloque du pêcher", description: "Déformation et rougissement des feuilles au printemps", treatment: "Traitement préventif à la chute des feuilles et avant le débourrement"},
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles et taches sur les fruits", treatment: "Pulvérisations de soufre dès l'apparition des symptômes"},
      {name: "Pucerons", description: "Insectes qui déforment les jeunes pousses", treatment: "Traitement insecticide dès l'apparition des premières colonies"}
    ]
  },
  {
    name: "Néflier",
    species: "Mespilus germanica",
    wateringFrequency: 5,
    light: "Directe à mi-ombragée",
    temperature: "10-25°C",
    careNotes: "Arbre fruitier rustique produisant des fruits qui se consomment blettis (après les premières gelées). Auto-fertile. Peu exigeant en culture. Port étalé, peut former un petit arbre ou un grand arbuste.",
    potSize: "Pot de 50 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Tavelure", description: "Taches brunes sur les feuilles et les fruits", treatment: "Traitements fongicides au printemps"},
      {name: "Moniliose", description: "Pourriture des fruits, dessèchement des rameaux", treatment: "Éliminer les parties atteintes et traiter avec un fongicide"},
      {name: "Pucerons", description: "Insectes qui attaquent les jeunes pousses", treatment: "Savon noir ou insecticide naturel en début d'infestation"}
    ]
  },
  {
    name: "Néflier du Japon",
    species: "Eriobotrya japonica",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-30°C",
    careNotes: "Arbre au feuillage persistant produisant des fruits jaunes-orangés en fin d'hiver. Sensible aux fortes gelées. Floraison automnale parfumée. Préfère les sols bien drainés et les situations protégées du vent.",
    potSize: "Pot de 40-50 cm de diamètre avec drainage efficace",
    commonDiseases: [
      {name: "Tavelure", description: "Taches sombres sur les feuilles et les fruits", treatment: "Éliminer les parties infectées et traiter avec un fongicide à base de cuivre"},
      {name: "Fumagine", description: "Dépôt noir sur les feuilles", treatment: "Éliminer les insectes producteurs de miellat et laver les feuilles"},
      {name: "Cochenilles", description: "Insectes qui se fixent sur les feuilles et tiges", treatment: "Nettoyage mécanique ou traitement à l'huile blanche"}
    ]
  },
  {
    name: "Noisetier",
    species: "Corylus avellana",
    wateringFrequency: 6,
    light: "Directe à mi-ombragée",
    temperature: "5-25°C",
    careNotes: "Arbuste rustique produisant des noisettes. Préfère les sols frais et légèrement acides. Nécessite généralement plusieurs variétés pour une bonne pollinisation. Taille modérée pour maintenir l'aération.",
    potSize: "Pot de 50 cm de diamètre minimum",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles et les jeunes rameaux", treatment: "Traitements au soufre dès l'apparition des symptômes"},
      {name: "Balanin des noisettes", description: "Charançon dont la larve se développe dans les fruits", treatment: "Ramasser et détruire les noisettes tombées, pièges à phéromones"},
      {name: "Puceron jaune", description: "Cause l'enroulement et la décoloration des feuilles", treatment: "Savon noir ou insecticide naturel en début d'infestation"}
    ]
  },
  {
    name: "Noyer",
    species: "Juglans regia",
    wateringFrequency: 7,
    light: "Directe",
    temperature: "5-30°C",
    careNotes: "Grand arbre à croissance lente qui peut atteindre 25m. Préfère les sols profonds et bien drainés. Attention à l'effet allélopathique qui peut inhiber la croissance d'autres plantes à proximité.",
    potSize: "Non adapté à la culture en pot (trop grand)",
    commonDiseases: [
      {name: "Anthracnose", description: "Taches brunes sur les feuilles qui tombent prématurément", treatment: "Ramasser et détruire les feuilles tombées, traiter avec un fongicide"},
      {name: "Carpocapse", description: "Chenille qui pénètre dans les fruits", treatment: "Pièges à phéromones et traitements biologiques au moment des pontes"},
      {name: "Bactériose", description: "Taches noires sur les feuilles et les fruits", treatment: "Traitements cupriques préventifs au printemps"}
    ]
  },
  {
    name: "Olivier",
    species: "Olea europaea",
    wateringFrequency: 7,
    light: "Directe",
    temperature: "5-35°C",
    careNotes: "Arbre méditerranéen très résistant à la sécheresse. Sensible aux fortes gelées prolongées. Préfère les sols calcaires bien drainés. Croissance lente. Taille modérée en fin d'hiver pour maintenir la forme.",
    potSize: "Pot de 40-50 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Fumagine", description: "Champignon noir qui se développe sur le miellat", treatment: "Éliminer les insectes producteurs de miellat et laver les feuilles"},
      {name: "Cochenille noire", description: "Insecte qui se fixe sur les rameaux et les feuilles", treatment: "Huile blanche en hiver et insecticide spécifique si nécessaire"},
      {name: "Mouche de l'olivier", description: "Insecte dont la larve se développe dans les olives", treatment: "Pièges alimentaires ou à phéromones, traitements préventifs à base d'argile"}
    ]
  },
  {
    name: "Oranger",
    species: "Citrus sinensis",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Agrume sensible au gel (à protéger en-dessous de 0°C). Préfère les sols acides bien drainés. Arrosages réguliers. Apport d'engrais spécial agrumes au printemps et en été. Taille légère pour maintenir la forme.",
    potSize: "Pot de 40-50 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Cochenilles", description: "Insectes qui se fixent sur les feuilles et les tiges", treatment: "Nettoyage avec un chiffon imbibé d'alcool ou huile blanche en hiver"},
      {name: "Chlorose ferrique", description: "Jaunissement des feuilles entre les nervures", treatment: "Apport de chélate de fer et acidification du substrat"},
      {name: "Fumagine", description: "Champignon noir qui se développe sur le miellat", treatment: "Éliminer les insectes producteurs de miellat puis laver les feuilles"}
    ]
  },
  {
    name: "Pacanier - Noix de pécan",
    species: "Carya illinoinensis",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-30°C",
    careNotes: "Grand arbre originaire d'Amérique du Nord qui peut atteindre 30m. Préfère les sols profonds et bien drainés. Sensible au gel durant les premières années. Plusieurs variétés sont nécessaires pour la pollinisation.",
    potSize: "Non adapté à la culture en pot (trop grand)",
    commonDiseases: [
      {name: "Tavelure", description: "Taches olive-brun sur les feuilles et les fruits", treatment: "Traitements fongicides préventifs au printemps"},
      {name: "Pucerons", description: "Insectes qui attaquent les jeunes pousses et feuilles", treatment: "Favoriser les prédateurs naturels ou traiter avec un insecticide adapté"},
      {name: "Charançon", description: "Coléoptère dont les larves se développent dans les noix", treatment: "Ramasser et détruire les fruits attaqués tombés au sol"}
    ]
  },
  {
    name: "Pamplemoussier",
    species: "Citrus paradisi",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Agrume produisant de gros fruits. Très sensible au gel. Préfère les climats chauds. Sol acide et bien drainé. Arrosages réguliers sans excès. Apport d'engrais spécial agrumes au printemps et en été.",
    potSize: "Grand pot de 50-60 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Cochenilles", description: "Insectes parasites qui se fixent sur les feuilles et tiges", treatment: "Nettoyage manuel ou traitement à l'huile de neem"},
      {name: "Fumagine", description: "Champignon noir qui se développe sur le miellat", treatment: "Contrôler les insectes producteurs de miellat et laver les feuilles"},
      {name: "Chlorose", description: "Jaunissement des feuilles dû à des carences", treatment: "Apport d'oligoéléments et acidification du substrat"}
    ]
  },
  {
    name: "Pêcher",
    species: "Prunus persica",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Arbre fruitier à croissance rapide et durée de vie assez courte (15-20 ans). Préfère les sols bien drainés. Sensible aux maladies fongiques en climat humide. Taille annuelle nécessaire pour maintenir la production.",
    potSize: "Pot de 50 cm de diamètre pour les variétés naines",
    commonDiseases: [
      {name: "Cloque du pêcher", description: "Déformation et rougissement des feuilles au printemps", treatment: "Traitements préventifs à la chute des feuilles et avant le débourrement"},
      {name: "Moniliose", description: "Pourriture brune des fruits qui se momifient", treatment: "Éliminer tous les fruits atteints et tailler les rameaux infectés"},
      {name: "Puceron vert", description: "Insecte qui provoque l'enroulement des feuilles", treatment: "Insecticide spécifique dès l'apparition des premières colonies"}
    ]
  },
  {
    name: "Plaqueminier - Kaki",
    species: "Diospyros kaki",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-30°C",
    careNotes: "Arbre produisant des fruits orangés comestibles après les premières gelées pour certaines variétés. Assez rustique une fois établi. Préfère les sols profonds et bien drainés. Belle coloration automnale du feuillage.",
    potSize: "Pot de 40-50 cm de diamètre pour les jeunes sujets",
    commonDiseases: [
      {name: "Anthracnose", description: "Taches noires sur les feuilles et les fruits", treatment: "Éliminer les parties atteintes et traiter avec un fongicide adapté"},
      {name: "Cochenilles", description: "Insectes qui se fixent sur les branches et les feuilles", treatment: "Brossage à l'aide d'une brosse douce et traitement à l'huile blanche"},
      {name: "Cercosporiose", description: "Taches grisâtres sur les feuilles", treatment: "Ramasser les feuilles tombées et traiter avec un fongicide"}
    ]
  },
  {
    name: "Poirier",
    species: "Pyrus communis",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Arbre fruitier à longue durée de vie. Préfère les sols profonds et frais. Plusieurs variétés sont souvent nécessaires pour assurer la pollinisation. Taille de formation puis d'entretien essentielle.",
    potSize: "Pot de 50 cm de diamètre pour les variétés naines",
    commonDiseases: [
      {name: "Tavelure", description: "Taches brunes-olivâtres sur les fruits et les feuilles", treatment: "Traitements fongicides préventifs au printemps"},
      {name: "Feu bactérien", description: "Noircissement et dessèchement des rameaux", treatment: "Tailler largement sous les parties infectées avec des outils désinfectés"},
      {name: "Psylle du poirier", description: "Insecte qui sécrète du miellat abondant", treatment: "Huile blanche en hiver et insecticides spécifiques au printemps"}
    ]
  },
  {
    name: "Pommier",
    species: "Malus domestica",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "5-25°C",
    careNotes: "Arbre fruitier rustique adaptable à de nombreux climats. Préfère les sols profonds et frais. Plusieurs variétés sont généralement nécessaires pour assurer la pollinisation. Taille régulière pour aérer la ramure.",
    potSize: "Pot de 50-60 cm de diamètre pour les variétés naines",
    commonDiseases: [
      {name: "Tavelure", description: "Taches brunes sur les feuilles et les fruits", treatment: "Traitements fongicides préventifs au printemps"},
      {name: "Oïdium", description: "Feutrage blanc sur les jeunes pousses", treatment: "Tailler les parties atteintes et traiter au soufre"},
      {name: "Carpocapse", description: "Ver de la pomme qui creuse des galeries dans les fruits", treatment: "Pièges à phéromones et traitements biologiques au moment des pontes"}
    ]
  },
  {
    name: "Prunier",
    species: "Prunus domestica",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Arbre fruitier rustique produisant des prunes de différentes couleurs selon les variétés. Préfère les sols profonds. Certaines variétés sont auto-fertiles, d'autres nécessitent un pollinisateur compatible.",
    potSize: "Pot de 50 cm de diamètre pour les variétés naines",
    commonDiseases: [
      {name: "Moniliose", description: "Pourriture brune des fruits qui se momifient", treatment: "Éliminer tous les fruits atteints et tailler les rameaux infectés"},
      {name: "Rouille", description: "Pustules orange sur les feuilles", treatment: "Ramasser les feuilles tombées et traiter avec un fongicide au printemps"},
      {name: "Hoplocampe", description: "Petit hyménoptère dont les larves creusent des galeries dans les fruits", treatment: "Pièges blancs englués et traitements au moment de la floraison"}
    ]
  },
  {
    name: "Prunier Reine Claude",
    species: "Prunus domestica subsp. italica",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Variété de prunier produisant des fruits verts-jaunes très sucrés. Mêmes exigences que les autres pruniers. La plupart des variétés de Reine Claude nécessitent un pollinisateur compatible.",
    potSize: "Pot de 50 cm de diamètre pour les variétés naines",
    commonDiseases: [
      {name: "Moniliose", description: "Pourriture brune des fruits et dessèchement des rameaux", treatment: "Éliminer tous les fruits momifiés et tailler les parties atteintes"},
      {name: "Sharka", description: "Maladie virale grave causant des déformations des fruits et des taches sur les feuilles", treatment: "Aucun traitement : arracher et brûler les arbres contaminés"},
      {name: "Carpocapse", description: "Chenille qui creuse des galeries dans les fruits", treatment: "Pièges à phéromones et insecticides biologiques au moment approprié"}
    ]
  }
];
