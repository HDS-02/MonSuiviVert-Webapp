/**
 * Base de données de fleurs
 */

import { PlantEntry } from './plantDatabase';

export const flowers: Omit<PlantEntry, 'category'>[] = [
  {
    name: "Absinthe",
    species: "Artemisia absinthium",
    wateringFrequency: 7,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Plante aromatique au feuillage argenté, très rustique. Parfumée et médicinale. Préfère les sols secs et bien drainés. Tailler après floraison pour maintenir la forme.",
    potSize: "Pot de 25-30 cm de diamètre, profond pour les racines",
    commonDiseases: [
      {name: "Oïdium", description: "Champignon formant un feutrage blanc sur les feuilles", treatment: "Traiter avec du soufre ou une solution à base de bicarbonate de sodium"},
      {name: "Pucerons", description: "Petits insectes qui attaquent les jeunes pousses", treatment: "Pulvériser une solution de savon noir ou d'huile de neem"},
      {name: "Pourriture racinaire", description: "Due à un excès d'humidité au niveau des racines", treatment: "Réduire l'arrosage et améliorer le drainage du sol"}
    ]
  },
  {
    name: "Abutilon",
    species: "Abutilon sp.",
    wateringFrequency: 3,
    light: "Semi-directe à directe",
    temperature: "15-25°C",
    careNotes: "Plante aux fleurs en forme de clochettes, souvent appelée 'érable d'intérieur'. Arrosage régulier en été, plus modéré en hiver. Taille légère au printemps pour favoriser la ramification.",
    potSize: "Pot de 25-30 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Cochenilles", description: "Insectes formant des amas cotonneux sur les tiges et feuilles", treatment: "Nettoyage avec un chiffon imbibé d'alcool à 70°, puis traitement à l'huile de neem"},
      {name: "Araignées rouges", description: "Acariens minuscules causant un aspect piqué sur les feuilles", treatment: "Augmenter l'humidité ambiante et pulvériser régulièrement le feuillage"},
      {name: "Jaunissement des feuilles", description: "Souvent causé par un excès d'eau ou un manque de luminosité", treatment: "Ajuster l'arrosage et placer dans un endroit plus lumineux"}
    ]
  },
  {
    name: "Achillée",
    species: "Achillea millefolium",
    wateringFrequency: 7,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Plante vivace très rustique au feuillage aromatique finement découpé. Fleurs en ombelles plates, idéales pour massifs et bouquets. Supporte la sécheresse une fois établie.",
    potSize: "Pot de 30 cm de diamètre minimum pour permettre l'étalement",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles et les tiges", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Pourriture du collet", description: "Décomposition de la base de la plante en cas d'humidité excessive", treatment: "Améliorer le drainage et réduire l'arrosage"},
      {name: "Pucerons", description: "Insectes qui peuvent déformer les nouvelles pousses", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Adonis",
    species: "Adonis sp.",
    wateringFrequency: 4,
    light: "Directe à semi-ombragée",
    temperature: "10-20°C",
    careNotes: "Fleurs délicates étoilées, souvent rouges ou jaunes. Préfère les sols frais et bien drainés. Plante de courte durée qui peut se ressemer naturellement. Éviter les températures trop élevées.",
    potSize: "Pot de 20 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Pourriture racinaire", description: "Causée par un sol trop humide ou mal drainé", treatment: "Améliorer le drainage et réduire l'arrosage"},
      {name: "Mildiou", description: "Champignon causant des taches sur les feuilles", treatment: "Améliorer la circulation d'air et traiter avec un fongicide à base de cuivre"},
      {name: "Taches foliaires", description: "Diverses maladies fongiques causant des taches sur les feuilles", treatment: "Retirer les feuilles atteintes et éviter de mouiller le feuillage"}
    ]
  },
  {
    name: "Agapanthe",
    species: "Agapanthus sp.",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Plante vivace formant des touffes de feuilles persistantes avec de hautes tiges florales portant des ombelles bleues ou blanches. Peu exigeante une fois établie, mais sensible aux fortes gelées.",
    potSize: "Grand pot de 30-40 cm de diamètre, idéalement profond",
    commonDiseases: [
      {name: "Pourriture du rhizome", description: "Due à un excès d'humidité hivernale", treatment: "Réduire drastiquement l'arrosage en hiver et assurer un excellent drainage"},
      {name: "Escargots et limaces", description: "Attaquent les jeunes pousses au printemps", treatment: "Pièges à bière ou granulés anti-limaces écologiques"},
      {name: "Botrytis", description: "Moisissure grise qui se développe sur les feuilles et fleurs par temps humide", treatment: "Améliorer la circulation d'air et éviter les arrosages tard dans la journée"}
    ]
  },
  {
    name: "Alysson",
    species: "Alyssum maritimum",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Petite plante couvre-sol aux fleurs blanches ou violettes très abondantes et au parfum de miel. Idéale pour rocailles et bordures. Se ressème facilement. Tailler légèrement après la première floraison pour stimuler une remontée.",
    potSize: "Pot de 20-25 cm de diamètre, peu profond",
    commonDiseases: [
      {name: "Alternariose", description: "Taches brunes circulaires sur les feuilles", treatment: "Éviter d'arroser le feuillage et traiter avec un fongicide si nécessaire"},
      {name: "Fonte des semis", description: "Pourriture des jeunes plants", treatment: "Utiliser un substrat stérile pour les semis et éviter l'excès d'humidité"},
      {name: "Altises", description: "Petits coléoptères qui criblent les feuilles de petits trous", treatment: "Pulvériser une solution de savon noir ou utiliser des pièges collants jaunes"}
    ]
  },
  {
    name: "Amaryllis",
    species: "Hippeastrum sp.",
    wateringFrequency: 3,
    light: "Directe à semi-directe",
    temperature: "15-25°C",
    careNotes: "Plante à bulbe produisant de grandes fleurs spectaculaires en entonnoir. Période de repos nécessaire après la floraison. Arroser modérément pendant la croissance, très peu pendant le repos.",
    potSize: "Pot de 20-25 cm de diamètre, avec le tiers supérieur du bulbe émergé",
    commonDiseases: [
      {name: "Pourriture du bulbe", description: "Causée par un excès d'humidité", treatment: "Réduire l'arrosage et s'assurer que le bulbe n'est pas enterré trop profondément"},
      {name: "Cochenilles farineuses", description: "Insectes blancs cotonneux qui s'installent entre les écailles du bulbe", treatment: "Nettoyer avec un coton-tige imbibé d'alcool à 70°"},
      {name: "Botrytis", description: "Taches brunes sur les feuilles et fleurs", treatment: "Augmenter la circulation d'air et éviter de mouiller le feuillage"}
    ]
  },
  {
    name: "Ancolie",
    species: "Aquilegia sp.",
    wateringFrequency: 4,
    light: "Semi-ombragée",
    temperature: "10-20°C",
    careNotes: "Plante vivace aux fleurs élégantes et colorées avec des éperons caractéristiques. Préfère les sols frais et riches en humus. Se ressème facilement. Couper les tiges florales fanées pour éviter une propagation excessive.",
    potSize: "Pot de 25-30 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Traiter avec du soufre ou une solution de bicarbonate de soude"},
      {name: "Mineuse de l'ancolie", description: "Larve qui creuse des galeries dans les feuilles", treatment: "Retirer et détruire les feuilles atteintes dès l'apparition des mines"},
      {name: "Pucerons", description: "Attaquent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou d'huile de neem"}
    ]
  },
  {
    name: "Anémone",
    species: "Anemone sp.",
    wateringFrequency: 4,
    light: "Semi-ombragée à ombragée",
    temperature: "10-20°C",
    careNotes: "Plante vivace aux fleurs délicates et colorées. Plusieurs espèces disponibles pour floraison printanière ou automnale. Préfère les sols frais, riches et bien drainés. Diviser les touffes tous les 3-4 ans pour maintenir la vigueur.",
    potSize: "Pot de 25-30 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Taches foliaires", description: "Diverses maladies fongiques causant des taches sur les feuilles", treatment: "Éviter d'arroser le feuillage et améliorer la circulation d'air"},
      {name: "Rouille", description: "Pustules orangées sous les feuilles", treatment: "Traiter avec un fongicide à base de cuivre et ramasser les feuilles atteintes"},
      {name: "Limaces", description: "Attaquent les jeunes pousses tendres", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Aster",
    species: "Aster sp.",
    wateringFrequency: 4,
    light: "Directe à semi-ombragée",
    temperature: "10-25°C",
    careNotes: "Plante vivace aux fleurs étoilées colorées, souvent à floraison automnale. Rustique et facile à cultiver. Diviser les touffes tous les 3 ans pour éviter l'épuisement. Pincer les tiges au printemps pour favoriser la ramification.",
    potSize: "Pot de 30 cm de diamètre minimum pour permettre un bon développement",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles, fréquent en fin d'été", treatment: "Traiter avec du soufre ou une solution de bicarbonate de soude dès l'apparition"},
      {name: "Rouille", description: "Pustules orangées ou brunes sur les feuilles", treatment: "Éliminer les parties atteintes et traiter avec un fongicide à base de cuivre"},
      {name: "Pucerons", description: "S'attaquent aux jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Azalée",
    species: "Rhododendron sp.",
    wateringFrequency: 3,
    light: "Semi-ombragée",
    temperature: "10-20°C",
    careNotes: "Arbuste aux fleurs abondantes, disponible en nombreuses couleurs. Nécessite un sol acide, frais et riche en humus. Arrosage régulier avec de l'eau non calcaire. Tailler légèrement après la floraison.",
    potSize: "Pot de 30-40 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Chlorose ferrique", description: "Jaunissement des feuilles dû à un sol trop calcaire", treatment: "Arroser avec de l'eau de pluie et apporter du fer chélaté"},
      {name: "Pourriture des racines", description: "Causée par un excès d'humidité", treatment: "Améliorer le drainage et réduire la fréquence d'arrosage"},
      {name: "Thrips", description: "Minuscules insectes qui déforment les boutons floraux", treatment: "Pulvériser une solution d'huile de neem ou utiliser des pièges bleus englués"}
    ]
  },
  {
    name: "Bégonia",
    species: "Begonia sp.",
    wateringFrequency: 3,
    light: "Semi-ombragée",
    temperature: "18-25°C",
    careNotes: "Genre comprenant de nombreuses espèces et variétés, aux feuillages décoratifs et/ou aux floraisons généreuses. Préfère les atmosphères humides. Éviter de mouiller le feuillage pour prévenir les maladies.",
    potSize: "Pot de 20-30 cm de diamètre selon l'espèce et la variété",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Améliorer la circulation d'air et traiter avec un fongicide adapté"},
      {name: "Botrytis", description: "Moisissure grise sur les feuilles et fleurs par temps humide", treatment: "Retirer les parties atteintes, réduire l'humidité ambiante"},
      {name: "Thrips", description: "Insectes minuscules qui causent des taches argentées sur les feuilles", treatment: "Pulvériser une solution d'huile de neem ou utiliser des pièges bleus englués"}
    ]
  },
  {
    name: "Bleuet",
    species: "Centaurea cyanus",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Plante annuelle aux fleurs bleues emblématiques. Facile à cultiver, se ressème spontanément. Excellente fleur à couper et attire les pollinisateurs. Supporte bien la sécheresse une fois établie.",
    potSize: "Pot de 25 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles et tiges", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Rouille", description: "Pustules orangées sur les feuilles", treatment: "Enlever les parties atteintes et traiter avec un fongicide à base de cuivre"},
      {name: "Limaces", description: "Attaquent les jeunes plants", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Camélia",
    species: "Camellia japonica",
    wateringFrequency: 3,
    light: "Semi-ombragée",
    temperature: "10-20°C",
    careNotes: "Arbuste au feuillage persistant et aux fleurs élégantes. Nécessite un sol acide, frais et riche en humus. Sensible au calcaire, arroser avec de l'eau de pluie. Protéger les fleurs du gel et du soleil direct.",
    potSize: "Grand pot de 40-50 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Chlorose", description: "Jaunissement des feuilles dû à un sol trop calcaire", treatment: "Utiliser de l'eau non calcaire et apporter du fer chélaté"},
      {name: "Taches foliaires", description: "Taches brunes ou noires sur les feuilles", treatment: "Améliorer la circulation d'air et éviter de mouiller le feuillage"},
      {name: "Cochenilles", description: "Insectes qui se fixent sur les feuilles et les tiges", treatment: "Nettoyage avec un chiffon imbibé d'alcool et application d'huile de neem"}
    ]
  },
  {
    name: "Capucine",
    species: "Tropaeolum majus",
    wateringFrequency: 4,
    light: "Directe à semi-ombragée",
    temperature: "15-25°C",
    careNotes: "Plante annuelle grimpante ou rampante aux fleurs comestibles orangées, rouges ou jaunes. Facile à cultiver. Préfère les sols pauvres, un sol trop riche favorise le feuillage au détriment des fleurs.",
    potSize: "Pot de 25-30 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Pucerons noirs", description: "Insectes qui colonisent les tiges et le dessous des feuilles", treatment: "Pulvériser une solution de savon noir ou utiliser comme plante piège pour protéger d'autres cultures"},
      {name: "Mildiou", description: "Taches jaunes sur les feuilles, puis feutrage grisâtre", treatment: "Améliorer la circulation d'air et traiter avec un fongicide à base de cuivre"},
      {name: "Altises", description: "Petits coléoptères qui percent de petits trous dans les feuilles", treatment: "Pulvériser une solution d'huile de neem ou utiliser des pièges collants jaunes"}
    ]
  },
  {
    name: "Chrysanthème",
    species: "Chrysanthemum sp.",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "10-20°C",
    careNotes: "Plante vivace connue pour sa floraison automnale. Nombreuses formes et couleurs disponibles. Pincer régulièrement jusqu'en juillet pour favoriser la ramification. Peut nécessiter un tuteurage pour les grandes variétés.",
    potSize: "Pot de 30-40 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Rouille blanche", description: "Pustules blanches sous les feuilles", treatment: "Retirer les parties atteintes et traiter avec un fongicide adapté"},
      {name: "Pucerons", description: "Insectes qui colonisent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Clématite",
    species: "Clematis sp.",
    wateringFrequency: 3,
    light: "Directe (fleurs) et ombragée (base)",
    temperature: "10-25°C",
    careNotes: "Plante grimpante vigoureuse aux fleurs spectaculaires. Préfère la tête au soleil et les pieds à l'ombre. Nécessite un support solide. Tailler selon le groupe de floraison auquel appartient la variété.",
    potSize: "Grand pot de 40-50 cm de diamètre, profond pour les racines",
    commonDiseases: [
      {name: "Flétrissement de la clématite", description: "Champignon qui cause un flétrissement soudain des tiges", treatment: "Couper la tige atteinte jusqu'au sol, désinfecter les outils, traiter avec un fongicide préventif"},
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles et tiges", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Limaces", description: "Attaquent les jeunes pousses au printemps", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Cyclamen",
    species: "Cyclamen persicum",
    wateringFrequency: 4,
    light: "Semi-ombragée",
    temperature: "10-15°C",
    careNotes: "Plante à tubercule aux fleurs délicates et au feuillage décoratif. Arroser par le dessous pour éviter de mouiller le tubercule. Préfère les températures fraîches. Période de repos estivale avec arrosage très réduit.",
    potSize: "Pot de 15-20 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Pourriture du tubercule", description: "Causée par un excès d'humidité", treatment: "Réduire l'arrosage et éviter de mouiller le cœur de la plante"},
      {name: "Botrytis", description: "Moisissure grise sur les feuilles et fleurs", treatment: "Améliorer la circulation d'air et retirer les parties atteintes"},
      {name: "Acariens", description: "Causent un aspect bronzé des feuilles", treatment: "Augmenter l'humidité ambiante et pulvériser de l'eau sur le feuillage (sauf les fleurs)"}
    ]
  },
  {
    name: "Dahlia",
    species: "Dahlia sp.",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Plante à tubercules aux fleurs spectaculaires de l'été jusqu'aux gelées. Nombreuses formes et couleurs disponibles. Nécessite un tuteurage pour les grandes variétés. Arracher les tubercules en régions froides.",
    potSize: "Pot de 30-40 cm de diamètre, profond d'au moins 30 cm",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles, fréquent en fin d'été", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Virus de la mosaïque", description: "Décoloration et déformation des feuilles", treatment: "Aucun traitement efficace, détruire les plantes atteintes"},
      {name: "Escargots et limaces", description: "Dévorent les jeunes pousses au printemps", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Digitale",
    species: "Digitalis purpurea",
    wateringFrequency: 4,
    light: "Semi-ombragée",
    temperature: "10-20°C",
    careNotes: "Plante bisannuelle ou vivace courte aux hautes hampes florales tubulaires. Se ressème facilement. Toutes les parties sont toxiques. Couper les hampes fanées pour favoriser une floraison latérale.",
    potSize: "Pot de 30 cm de diamètre, profond pour l'ancrage",
    commonDiseases: [
      {name: "Anthracnose", description: "Taches brunes sur les feuilles", treatment: "Améliorer la circulation d'air et traiter avec un fongicide à base de cuivre"},
      {name: "Mildiou", description: "Duvet grisâtre sous les feuilles", treatment: "Éviter d'arroser le feuillage et traiter avec un fongicide adapté"},
      {name: "Pucerons", description: "Attaquent les hampes florales", treatment: "Pulvériser une solution de savon noir ou d'huile de neem"}
    ]
  },
  {
    name: "Edelweiss",
    species: "Leontopodium alpinum",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "5-20°C",
    careNotes: "Plante alpine emblématique au feuillage argenté et aux fleurs étoilées blanches. Préfère les sols caillouteux et calcaires bien drainés. Soleil direct mais températures fraîches. Protection hivernale contre l'excès d'humidité.",
    potSize: "Pot de 15-20 cm de diamètre, peu profond mais avec excellent drainage",
    commonDiseases: [
      {name: "Pourriture racinaire", description: "Causée par un excès d'humidité hivernale", treatment: "Assurer un excellent drainage et protéger des pluies hivernales"},
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Améliorer la circulation d'air et pulvériser une solution de bicarbonate de soude"},
      {name: "Pucerons", description: "Attaquent les jeunes pousses", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Freesia",
    species: "Freesia sp.",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "15-20°C",
    careNotes: "Plante à bulbe aux fleurs délicates et parfumées. Culture en automne pour floraison printanière. Arrêt progressif des arrosages après la floraison. Conservation des bulbes au sec pendant la période de repos.",
    potSize: "Pot de 20 cm de diamètre, profond de 15 cm minimum",
    commonDiseases: [
      {name: "Pourriture des bulbes", description: "Causée par un excès d'humidité", treatment: "Réduire l'arrosage et améliorer le drainage"},
      {name: "Virus", description: "Déformations et panachures anormales des feuilles", treatment: "Aucun traitement efficace, détruire les plantes atteintes"},
      {name: "Thrips", description: "Insectes minuscules qui causent des taches argentées", treatment: "Pulvériser une solution d'huile de neem ou utiliser des pièges bleus englués"}
    ]
  },
  {
    name: "Fuchsia",
    species: "Fuchsia sp.",
    wateringFrequency: 2,
    light: "Semi-ombragée",
    temperature: "15-20°C",
    careNotes: "Arbuste aux fleurs pendantes bicolores très décoratives. Préfère une atmosphère humide et des températures modérées. Taille de forme en fin d'hiver. Peut être conservé d'une année sur l'autre dans un local frais et lumineux.",
    potSize: "Pot de 25-30 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Rouille", description: "Pustules orangées sous les feuilles", treatment: "Retirer les parties atteintes et traiter avec un fongicide à base de cuivre"},
      {name: "Botrytis", description: "Moisissure grise sur les feuilles et fleurs", treatment: "Améliorer la circulation d'air et éviter de mouiller le feuillage"},
      {name: "Aleurodes", description: "Petites mouches blanches qui colonisent le dessous des feuilles", treatment: "Pulvériser une solution savonneuse ou installer des pièges jaunes englués"}
    ]
  },
  {
    name: "Giroflée",
    species: "Matthiola incana",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "10-20°C",
    careNotes: "Plante bisannuelle ou vivace courte aux fleurs parfumées en épis. Disponible en nombreuses couleurs. Préfère les situations ensoleillées et les sols bien drainés. Excellente pour les massifs et les bouquets.",
    potSize: "Pot de 20-25 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Mildiou", description: "Duvet grisâtre sous les feuilles", treatment: "Améliorer la circulation d'air et traiter avec un fongicide à base de cuivre"},
      {name: "Alternariose", description: "Taches brunes concentriques sur les feuilles", treatment: "Éviter d'arroser le feuillage et éliminer les parties atteintes"},
      {name: "Pucerons", description: "Colonisent les jeunes pousses et hampes florales", treatment: "Pulvériser une solution de savon noir ou d'huile de neem"}
    ]
  },
  {
    name: "Glaïeul",
    species: "Gladiolus sp.",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Plante à bulbe (corme) aux hautes hampes florales colorées. Excellente fleur à couper. Plantation échelonnée pour étaler la floraison. Arracher les cormes dans les régions froides et les conserver au sec.",
    potSize: "Pot profond de 30 cm minimum, avec bon drainage",
    commonDiseases: [
      {name: "Fusariose", description: "Pourriture des cormes et flétrissement des plantes", treatment: "Détruire les plantes atteintes et désinfecter les cormes avant stockage"},
      {name: "Thrips", description: "Petits insectes qui provoquent des stries décolorées sur les fleurs", treatment: "Pulvériser une solution d'huile de neem ou utiliser des pièges bleus englués"},
      {name: "Virus", description: "Panachures anormales sur les feuilles et fleurs", treatment: "Aucun traitement efficace, détruire les plantes atteintes"}
    ]
  },
  {
    name: "Glycine",
    species: "Wisteria sinensis",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Liane vigoureuse et longévive aux grappes de fleurs parfumées. Nécessite un support très solide. Deux tailles annuelles : une après floraison et une en hiver. Peut mettre plusieurs années avant de fleurir.",
    potSize: "Grand pot de 50-60 cm de diamètre, très stable",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles et jeunes pousses", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Cochenilles", description: "Insectes qui colonisent les rameaux", treatment: "Brosser les branches avec une brosse souple et traiter à l'huile blanche en hiver"},
      {name: "Pucerons", description: "Attaquent les jeunes pousses au printemps", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Hortensia",
    species: "Hydrangea macrophylla",
    wateringFrequency: 2,
    light: "Semi-ombragée",
    temperature: "10-25°C",
    careNotes: "Arbuste aux grandes inflorescences globulaires. La couleur des fleurs varie selon l'acidité du sol (bleu en sol acide, rose en sol calcaire). Arrosages abondants en été. Taille légère après floraison.",
    potSize: "Grand pot de 40-50 cm de diamètre",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles, fréquent en fin d'été", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Chlorose", description: "Jaunissement des feuilles dû à une carence en fer en sol calcaire", treatment: "Acidifier le sol et apporter du fer chélaté"},
      {name: "Cochenilles", description: "Insectes qui colonisent les tiges et le dessous des feuilles", treatment: "Nettoyage avec un chiffon imbibé d'alcool et traitement à l'huile de neem"}
    ]
  },
  {
    name: "Iris",
    species: "Iris sp.",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Plante vivace rhizomateuse aux fleurs complexes très décoratives. Nombreuses espèces et variétés disponibles. Planter les rhizomes en surface. Diviser les touffes tous les 3-4 ans après la floraison.",
    potSize: "Pot large de 30-40 cm de diamètre, peu profond",
    commonDiseases: [
      {name: "Pourriture des rhizomes", description: "Causée par un excès d'humidité", treatment: "Améliorer le drainage et éviter de recouvrir les rhizomes"},
      {name: "Taches foliaires", description: "Diverses maladies fongiques causant des taches sur les feuilles", treatment: "Couper les feuilles atteintes et traiter avec un fongicide adapté"},
      {name: "Limaces", description: "Attaquent les jeunes pousses", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Jacinthe",
    species: "Hyacinthus orientalis",
    wateringFrequency: 3,
    light: "Directe à semi-ombragée",
    temperature: "10-20°C",
    careNotes: "Plante à bulbe au parfum intense et à la floraison printanière. Plantation en automne. Laisser le feuillage jaunir naturellement après la floraison. Les bulbes forcés en intérieur sont généralement épuisés après la floraison.",
    potSize: "Pot de 15-20 cm de diamètre, profond de 15 cm minimum",
    commonDiseases: [
      {name: "Pourriture grise", description: "Moisissure sur les feuilles et fleurs par temps humide", treatment: "Améliorer la circulation d'air et éviter d'arroser le feuillage"},
      {name: "Pourriture du bulbe", description: "Causée par un excès d'humidité", treatment: "Assurer un bon drainage et planter les bulbes à la bonne profondeur"},
      {name: "Pucerons", description: "Attaquent les hampes florales", treatment: "Pulvériser une solution de savon noir ou d'huile de neem"}
    ]
  },
  {
    name: "Jonquille",
    species: "Narcissus jonquilla",
    wateringFrequency: 4,
    light: "Directe à semi-ombragée",
    temperature: "5-20°C",
    careNotes: "Plante à bulbe à floraison printanière précoce. Plantation en automne. Feuillage à laisser jaunir naturellement après la floraison. Peut être naturalisée dans les pelouses. Division des touffes tous les 3-4 ans.",
    potSize: "Pot de 20 cm de diamètre, profond de 15 cm minimum",
    commonDiseases: [
      {name: "Fusariose", description: "Pourriture sèche des bulbes", treatment: "Détruire les bulbes atteints et traiter les autres au fongicide avant plantation"},
      {name: "Virus", description: "Stries jaunes anormales sur les feuilles", treatment: "Aucun traitement efficace, détruire les plantes atteintes"},
      {name: "Mouche du narcisse", description: "Larve qui se développe dans le bulbe", treatment: "Traiter le sol avec un insecticide adapté avant plantation"}
    ]
  },
  {
    name: "Lilas",
    species: "Syringa vulgaris",
    wateringFrequency: 5,
    light: "Directe",
    temperature: "5-25°C",
    careNotes: "Arbuste rustique à la floraison printanière très parfumée. Nombreux coloris disponibles. Taille juste après la floraison. Supporte bien le calcaire. Peut former des rejets qu'il faut éliminer régulièrement.",
    potSize: "Grand pot de 50 cm de diamètre minimum",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles en été", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Bactériose", description: "Taches nécrotiques sur les feuilles", treatment: "Éliminer les parties atteintes et traiter avec un produit à base de cuivre"},
      {name: "Otiorhynque", description: "Coléoptère dont les larves s'attaquent aux racines", treatment: "Pièges collants autour du tronc et traitement du sol avec des nématodes parasites"}
    ]
  },
  {
    name: "Lys",
    species: "Lilium sp.",
    wateringFrequency: 3,
    light: "Semi-ombragée (base) à directe (sommet)",
    temperature: "15-25°C",
    careNotes: "Plante à bulbe aux fleurs spectaculaires et souvent parfumées. Nombreuses variétés disponibles. Préfère les sols frais, riches et bien drainés. Protéger la base des plantes de l'ensoleillement direct avec un paillage ou des plantes compagnes.",
    potSize: "Pot profond de 30-40 cm avec excellent drainage",
    commonDiseases: [
      {name: "Botrytis", description: "Taches brunes sur les feuilles et boutons floraux", treatment: "Améliorer la circulation d'air et éviter d'arroser le feuillage"},
      {name: "Virus", description: "Déformations et panachures anormales des feuilles", treatment: "Aucun traitement efficace, détruire les plantes atteintes"},
      {name: "Criocère du lys", description: "Petit coléoptère rouge vif dont les larves dévorent le feuillage", treatment: "Ramasser manuellement les insectes et traiter avec un insecticide adapté"}
    ]
  },
  {
    name: "Marguerite",
    species: "Leucanthemum vulgare",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Plante vivace rustique aux fleurs blanches typiques à cœur jaune. Facile à cultiver. Division des touffes tous les 3 ans pour maintenir la vigueur. Rabattre après la première floraison pour favoriser une remontée.",
    potSize: "Pot de 25-30 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Pucerons", description: "Colonisent les boutons floraux et jeunes pousses", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"},
      {name: "Nématodes", description: "Vers microscopiques qui attaquent les racines", treatment: "Rotation des cultures et solarisation du sol"}
    ]
  },
  {
    name: "Mimosa",
    species: "Acacia dealbata",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Arbre ou arbuste au feuillage fin et aux fleurs jaunes en pompons très parfumées en hiver. Originaire d'Australie, sensible aux fortes gelées. Préfère les sols acides. Croissance rapide.",
    potSize: "Grand pot de 50 cm de diamètre minimum",
    commonDiseases: [
      {name: "Psylles", description: "Petits insectes qui provoquent l'enroulement des feuilles", treatment: "Pulvériser une solution d'huile de neem ou introduire des auxiliaires de lutte biologique"},
      {name: "Chlorose ferrique", description: "Jaunissement des feuilles dû à un sol trop calcaire", treatment: "Acidifier le sol et apporter du fer chélaté"},
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"}
    ]
  },
  {
    name: "Myosotis",
    species: "Myosotis sp.",
    wateringFrequency: 3,
    light: "Semi-ombragée",
    temperature: "10-20°C",
    careNotes: "Plante bisannuelle aux petites fleurs bleues, roses ou blanches. Symbolise le souvenir. Se ressème facilement. Supporte les sols frais à humides. Floraison printanière abondante.",
    potSize: "Pot de 20 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Améliorer la circulation d'air et pulvériser une solution de bicarbonate de soude"},
      {name: "Rouille", description: "Pustules orangées sous les feuilles", treatment: "Retirer les parties atteintes et traiter avec un fongicide à base de cuivre"},
      {name: "Limaces", description: "Attaquent les jeunes plants", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Narcisse",
    species: "Narcissus sp.",
    wateringFrequency: 4,
    light: "Directe à semi-ombragée",
    temperature: "5-20°C",
    careNotes: "Plante à bulbe à floraison printanière précoce. Plantation en automne. Feuillage à laisser jaunir naturellement après la floraison. Peut être naturalisée dans les pelouses. Division des touffes tous les 3-4 ans.",
    potSize: "Pot de 20 cm de diamètre, profond de 15 cm minimum",
    commonDiseases: [
      {name: "Fusariose", description: "Pourriture sèche des bulbes", treatment: "Détruire les bulbes atteints et traiter les autres au fongicide avant plantation"},
      {name: "Virus", description: "Stries jaunes anormales sur les feuilles", treatment: "Aucun traitement efficace, détruire les plantes atteintes"},
      {name: "Mouche du narcisse", description: "Larve qui se développe dans le bulbe", treatment: "Traiter le sol avec un insecticide adapté avant plantation"}
    ]
  },
  {
    name: "Nénuphar",
    species: "Nymphaea sp.",
    wateringFrequency: 0,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Plante aquatique aux grandes feuilles flottantes et aux fleurs spectaculaires. Nécessite un bassin ou un contenant étanche profond. Hiverner les espèces tropicales en intérieur. Division possible au printemps.",
    potSize: "Contenant large de 30-40 cm, profond de 20-30 cm, placé dans un bassin",
    commonDiseases: [
      {name: "Pucerons", description: "Colonisent les feuilles émergées", treatment: "Rincer à l'eau ou introduire des auxiliaires de lutte biologique"},
      {name: "Pourriture des racines", description: "Causée par une eau stagnante ou polluée", treatment: "Assurer une bonne qualité de l'eau et une oxygénation suffisante"},
      {name: "Algues", description: "Peuvent envahir le bassin et étouffer les plantes", treatment: "Limiter l'ensoleillement direct, installer des plantes oxygénantes et éviter l'excès de nutriments"}
    ]
  },
  {
    name: "Œillet",
    species: "Dianthus sp.",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Genre comprenant de nombreuses espèces et variétés aux fleurs parfumées. Préfère les sols calcaires et bien drainés. Tailler légèrement après la floraison pour favoriser la ramification et prolonger la floraison.",
    potSize: "Pot de 20-25 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Alternariose", description: "Taches brunes sur les feuilles", treatment: "Éviter d'arroser le feuillage et traiter avec un fongicide adapté"},
      {name: "Rouille", description: "Pustules orangées sous les feuilles", treatment: "Retirer les parties atteintes et traiter avec un fongicide à base de cuivre"},
      {name: "Thrips", description: "Minuscules insectes qui déforment les boutons floraux", treatment: "Pulvériser une solution d'huile de neem ou utiliser des pièges bleus englués"}
    ]
  },
  {
    name: "Orchidée",
    species: "Orchidaceae (famille)",
    wateringFrequency: 7,
    light: "Semi-directe à filtrée",
    temperature: "18-25°C",
    careNotes: "Vaste famille comprenant de nombreux genres et espèces. Les plus courantes en intérieur sont les Phalaenopsis. Arroser par immersion quand le substrat est sec. Éviter le soleil direct. Rempotage tous les 2-3 ans dans un substrat spécifique.",
    potSize: "Pot transparent de 10-15 cm de diamètre selon l'espèce",
    commonDiseases: [
      {name: "Pourriture des racines", description: "Causée par un excès d'arrosage", treatment: "Réduire l'arrosage et rempoter dans un substrat frais après avoir coupé les racines mortes"},
      {name: "Cochenilles", description: "Insectes qui colonisent les feuilles et la base des feuilles", treatment: "Nettoyage avec un coton-tige imbibé d'alcool à 70°"},
      {name: "Botrytis", description: "Taches brunes sur les fleurs", treatment: "Améliorer la circulation d'air et éviter de mouiller les fleurs"}
    ]
  },
  {
    name: "Pâquerette",
    species: "Bellis perennis",
    wateringFrequency: 3,
    light: "Directe à semi-ombragée",
    temperature: "5-20°C",
    careNotes: "Petite plante vivace aux fleurs blanches ou roses. Floraison très longue, du printemps à l'automne. Facile à cultiver, peu exigeante. Division des touffes possible au printemps ou en automne.",
    potSize: "Pot de 15-20 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Pucerons", description: "Colonisent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"},
      {name: "Limaces", description: "Attaquent les jeunes plants", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Pavot de Californie",
    species: "Eschscholzia californica",
    wateringFrequency: 6,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Plante annuelle ou vivace courte aux fleurs lumineuses orangées. Se ressème facilement. Préfère les sols pauvres et secs. Éviter la transplantation qui perturbe les racines pivotantes.",
    potSize: "Pot de 20 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Mildiou", description: "Duvet grisâtre sous les feuilles", treatment: "Éviter l'excès d'humidité et améliorer la circulation d'air"},
      {name: "Pucerons", description: "Attaquent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou d'huile de neem"},
      {name: "Limaces", description: "Dévorent les jeunes plants", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Pensée",
    species: "Viola × wittrockiana",
    wateringFrequency: 3,
    light: "Directe à semi-ombragée",
    temperature: "5-20°C",
    careNotes: "Plante annuelle ou bisannuelle aux fleurs colorées à face de velours. Préfère les températures fraîches. Plantation d'automne pour floraison printanière ou plantation de printemps pour floraison estivale en climat frais.",
    potSize: "Pot de 20 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Taches foliaires", description: "Diverses maladies fongiques causant des taches sur les feuilles", treatment: "Éviter d'arroser le feuillage et améliorer la circulation d'air"},
      {name: "Limaces", description: "Dévorent les jeunes plants et les fleurs", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Perce-neige",
    species: "Galanthus nivalis",
    wateringFrequency: 4,
    light: "Semi-ombragée",
    temperature: "0-15°C",
    careNotes: "Plante à bulbe à floraison hivernale très précoce. Petites fleurs blanches pendantes. Plantation en automne. Préfère les sols frais et humifères. Peut former des colonies naturalisées sous les arbres et arbustes.",
    potSize: "Pot de 15 cm de diamètre, profond de 15 cm minimum",
    commonDiseases: [
      {name: "Pourriture grise", description: "Moisissure sur les feuilles et fleurs", treatment: "Améliorer la circulation d'air et éviter l'excès d'humidité"},
      {name: "Virus", description: "Stries jaunes anormales sur les feuilles", treatment: "Aucun traitement efficace, détruire les plantes atteintes"},
      {name: "Limaces", description: "Attaquent les jeunes pousses émergeant du sol", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Pervenche",
    species: "Vinca minor",
    wateringFrequency: 5,
    light: "Semi-ombragée à ombragée",
    temperature: "5-25°C",
    careNotes: "Plante vivace couvre-sol au feuillage persistant et aux fleurs bleues, blanches ou pourpres. Idéale sous les arbres. Croissance rapide, peut devenir envahissante. Taille de contrôle si nécessaire en fin d'hiver.",
    potSize: "Pot de 25 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Taches foliaires", description: "Diverses maladies fongiques causant des taches sur les feuilles", treatment: "Éviter d'arroser le feuillage et améliorer la circulation d'air"},
      {name: "Limaces", description: "Attaquent les jeunes pousses", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Pétunia",
    species: "Petunia × hybrida",
    wateringFrequency: 2,
    light: "Directe",
    temperature: "15-25°C",
    careNotes: "Plante annuelle aux fleurs colorées en forme de trompette. Nombreuses variétés disponibles. Arrosages fréquents mais sans excès en été. Supprimer régulièrement les fleurs fanées pour stimuler la floraison.",
    potSize: "Pot de 25 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Botrytis", description: "Moisissure grise sur les fleurs par temps humide", treatment: "Améliorer la circulation d'air et éviter d'arroser le feuillage"},
      {name: "Aleurodes", description: "Petites mouches blanches qui colonisent le dessous des feuilles", treatment: "Pulvériser une solution savonneuse ou installer des pièges jaunes englués"}
    ]
  },
  {
    name: "Phlox",
    species: "Phlox sp.",
    wateringFrequency: 3,
    light: "Directe à semi-ombragée",
    temperature: "10-25°C",
    careNotes: "Genre comprenant de nombreuses espèces vivaces ou annuelles aux fleurs colorées et parfumées. Les formes vivaces forment des touffes dressées, idéales pour les massifs. Division tous les 3-4 ans pour maintenir la vigueur.",
    potSize: "Pot de 25-30 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles, très fréquent en été", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre dès les premiers signes"},
      {name: "Taches foliaires", description: "Diverses maladies fongiques causant des taches sur les feuilles", treatment: "Éviter d'arroser le feuillage et améliorer la circulation d'air"},
      {name: "Pucerons", description: "Colonisent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Pivoine",
    species: "Paeonia sp.",
    wateringFrequency: 4,
    light: "Directe à semi-ombragée",
    temperature: "10-25°C",
    careNotes: "Plante vivace longévive aux fleurs spectaculaires. Plantation en automne. Ne pas planter trop profond. Tuteurage nécessaire pour les variétés à grandes fleurs. Division possible tous les 7-10 ans, mais préfère ne pas être dérangée.",
    potSize: "Grand pot de 40-50 cm de diamètre, profond d'au moins 40 cm",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Botrytis", description: "Taches brunes sur les tiges, feuilles et boutons", treatment: "Améliorer la circulation d'air et traiter avec un fongicide adapté"},
      {name: "Nématodes", description: "Vers microscopiques qui attaquent les racines", treatment: "Rotation des cultures et solarisation du sol"}
    ]
  },
  {
    name: "Pourpier à grandes fleurs",
    species: "Portulaca grandiflora",
    wateringFrequency: 7,
    light: "Directe",
    temperature: "20-30°C",
    careNotes: "Plante annuelle succulente aux fleurs colorées qui s'ouvrent au soleil. Excellente résistance à la sécheresse. Idéale pour rocailles et bordures ensoleillées. Se ressème facilement. Éviter l'excès d'humidité qui peut faire pourrir les tiges.",
    potSize: "Pot de 20 cm de diamètre avec excellent drainage",
    commonDiseases: [
      {name: "Pourriture des tiges", description: "Causée par un excès d'humidité", treatment: "Réduire l'arrosage et améliorer le drainage"},
      {name: "Pucerons", description: "Attaquent les jeunes pousses", treatment: "Pulvériser une solution de savon noir ou d'huile de neem"},
      {name: "Cochenilles farineuses", description: "Insectes blancs cotonneux qui colonisent les tiges", treatment: "Nettoyage avec un coton-tige imbibé d'alcool à 70°"}
    ]
  },
  {
    name: "Renoncule",
    species: "Ranunculus sp.",
    wateringFrequency: 3,
    light: "Directe à semi-ombragée",
    temperature: "10-20°C",
    careNotes: "Plante à rhizomes ou tubercules aux fleurs colorées en forme de rose. Plantation en automne ou au printemps selon les espèces. Préfère les sols frais et bien drainés. Excellente fleur à couper.",
    potSize: "Pot de 20-25 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Botrytis", description: "Moisissure grise sur les fleurs et feuilles", treatment: "Améliorer la circulation d'air et éviter d'arroser le feuillage"},
      {name: "Pucerons", description: "Colonisent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Rhododendron",
    species: "Rhododendron sp.",
    wateringFrequency: 3,
    light: "Semi-ombragée",
    temperature: "10-25°C",
    careNotes: "Arbuste au feuillage persistant et aux grandes fleurs colorées en bouquets. Nécessite un sol acide, frais et riche en humus. Sensible au calcaire. Arrosage à l'eau de pluie. Protection contre les vents desséchants.",
    potSize: "Grand pot de 40-50 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Chlorose ferrique", description: "Jaunissement des feuilles dû à un sol trop calcaire", treatment: "Arroser avec de l'eau de pluie et apporter du fer chélaté"},
      {name: "Phytophthora", description: "Maladie racinaire qui cause un dépérissement progressif", treatment: "Améliorer le drainage et éviter l'excès d'humidité"},
      {name: "Cochenilles", description: "Insectes qui colonisent les feuilles et les tiges", treatment: "Nettoyage avec un chiffon imbibé d'alcool et traitement à l'huile de neem"}
    ]
  },
  {
    name: "Rose",
    species: "Rosa sp.",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Arbuste emblématique cultivé pour ses fleurs parfumées. Nombreuses variétés disponibles. Taille annuelle en fin d'hiver. Arrosage au pied sans mouiller le feuillage. Paillage recommandé pour maintenir la fraîcheur du sol.",
    potSize: "Pot de 40-50 cm de diamètre, profond d'au moins 40 cm",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles et jeunes pousses", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Taches noires", description: "Maladie fongique qui cause des taches noires sur les feuilles", treatment: "Ramasser les feuilles atteintes et traiter avec un fongicide adapté"},
      {name: "Pucerons", description: "Colonisent les boutons floraux et jeunes pousses", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Rose trémière",
    species: "Alcea rosea",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Plante bisannuelle ou vivace courte aux hautes hampes florales décoratives. Culture facile. Peut nécessiter un tuteurage. Se ressème facilement. Préfère les sols riches et bien drainés.",
    potSize: "Pot de 30-40 cm de diamètre, profond pour l'ancrage",
    commonDiseases: [
      {name: "Rouille", description: "Pustules orangées qui se développent sous les feuilles", treatment: "Retirer les parties atteintes et traiter avec un fongicide à base de cuivre"},
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Pucerons", description: "Attaquent les jeunes pousses et hampes florales", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Souci",
    species: "Calendula officinalis",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "10-25°C",
    careNotes: "Plante annuelle aux fleurs jaunes ou orangées. Culture facile, se ressème spontanément. Fleurs comestibles et médicinales. Floraison longue si on retire régulièrement les fleurs fanées.",
    potSize: "Pot de 20-25 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Pucerons", description: "Colonisent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"},
      {name: "Limaces", description: "Attaquent les jeunes plants", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Tournesol",
    species: "Helianthus annuus",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "15-30°C",
    careNotes: "Plante annuelle emblématique aux grandes fleurs jaunes suivant le soleil. Croissance rapide. Besoin d'un emplacement ensoleillé et abrité du vent. Arrosages réguliers en période de croissance.",
    potSize: "Grand pot de 40 cm de diamètre minimum, profond pour l'ancrage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Mildiou", description: "Taches jaunes sur les feuilles puis duvet grisâtre", treatment: "Améliorer la circulation d'air et traiter avec un fongicide à base de cuivre"},
      {name: "Pucerons", description: "Colonisent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  },
  {
    name: "Tulipe",
    species: "Tulipa sp.",
    wateringFrequency: 4,
    light: "Directe",
    temperature: "5-20°C",
    careNotes: "Plante à bulbe emblématique à floraison printanière. Plantation en automne. Nombreuses formes et couleurs disponibles. Laisser le feuillage jaunir naturellement après la floraison. Certaines variétés peuvent être naturalisées.",
    potSize: "Pot de 20-25 cm de diamètre, profond de 20 cm minimum",
    commonDiseases: [
      {name: "Botrytis", description: "Taches brunes sur les feuilles et fleurs", treatment: "Améliorer la circulation d'air et éviter d'arroser le feuillage"},
      {name: "Virus", description: "Panachures anormales sur les fleurs", treatment: "Aucun traitement efficace, détruire les plantes atteintes"},
      {name: "Pourriture du bulbe", description: "Causée par un excès d'humidité", treatment: "Assurer un bon drainage et éviter les arrosages excessifs après la floraison"}
    ]
  },
  {
    name: "Violette",
    species: "Viola odorata",
    wateringFrequency: 3,
    light: "Semi-ombragée",
    temperature: "5-20°C",
    careNotes: "Petite plante vivace au parfum délicat et aux fleurs violettes ou blanches. Préfère les emplacements frais et ombragés. Se propage par stolons. Floraison printanière. Fleurs comestibles pour parfumer desserts et salades.",
    potSize: "Pot de 15-20 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Taches foliaires", description: "Diverses maladies fongiques causant des taches sur les feuilles", treatment: "Éviter d'arroser le feuillage et améliorer la circulation d'air"},
      {name: "Limaces", description: "Dévorent les feuilles et les fleurs", treatment: "Installer des pièges à bière ou utiliser des granulés anti-limaces écologiques"}
    ]
  },
  {
    name: "Zinnia",
    species: "Zinnia elegans",
    wateringFrequency: 3,
    light: "Directe",
    temperature: "20-30°C",
    careNotes: "Plante annuelle aux fleurs colorées et durables. Excellente fleur à couper. Préfère les climats chauds et ensoleillés. Floraison abondante en été et automne. Retirer les fleurs fanées pour stimuler la floraison.",
    potSize: "Pot de 25 cm de diamètre avec bon drainage",
    commonDiseases: [
      {name: "Oïdium", description: "Feutrage blanc sur les feuilles, fréquent en fin d'été", treatment: "Pulvériser une solution de bicarbonate de soude ou du soufre"},
      {name: "Alternariose", description: "Taches brunes sur les feuilles", treatment: "Éviter d'arroser le feuillage et traiter avec un fongicide adapté"},
      {name: "Pucerons", description: "Colonisent les jeunes pousses et boutons floraux", treatment: "Pulvériser une solution de savon noir ou introduire des coccinelles"}
    ]
  }
];
