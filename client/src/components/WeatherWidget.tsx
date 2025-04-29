import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Interface pour les données météo
interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  recommendations: string[];
  location: string;
  forecast?: {
    temperature: number;
    humidity: number;
    description: string;
    icon: string;
  };
}

// Conseils d'entretien basés sur les conditions météorologiques
function generateRecommendations(temperature: number, humidity: number): string[] {
  const recommendations: string[] = [];
  
  // Recommandations basées sur la température
  if (temperature > 28) {
    recommendations.push("Arrosez vos plantes plus fréquemment à cause de la chaleur.");
    recommendations.push("Placez vos plantes d'intérieur à l'abri du soleil direct.");
  } else if (temperature > 22) {
    recommendations.push("Température idéale pour la plupart des plantes. Surveillez l'humidité.");
  } else if (temperature > 15) {
    recommendations.push("Conditions de croissance favorables. Arrosage modéré recommandé.");
  } else if (temperature > 10) {
    recommendations.push("Réduisez l'arrosage, les plantes ont besoin de moins d'eau.");
  } else {
    recommendations.push("Protégez vos plantes sensibles du froid.");
    recommendations.push("Évitez d'arroser en fin de journée pour prévenir le gel des racines.");
  }
  
  // Recommandations basées sur l'humidité
  if (humidity > 70) {
    recommendations.push("Humidité élevée: attention aux maladies fongiques.");
    recommendations.push("Assurez une bonne circulation d'air autour de vos plantes.");
  } else if (humidity < 40) {
    recommendations.push("Air sec: brumisez vos plantes d'intérieur régulièrement.");
  }
  
  return recommendations;
}

// Associer les codes météo aux icônes Material Icons
function getWeatherIcon(iconCode: string): string {
  switch (iconCode) {
    case 'clear_day': return 'wb_sunny';
    case 'partly_cloudy': return 'partly_cloudy_day';
    case 'cloudy': return 'cloud';
    case 'rainy': return 'water_drop';
    default: return 'wb_cloudy';
  }
}

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // État pour la géolocalisation
  useEffect(() => {
    // Forcer l'utilisation de la géolocalisation à chaque chargement
    localStorage.removeItem('userLocation');
    
    // Définir la durée de cache à 1 jour
    const ONE_DAY_MS = 24 * 60 * 60 * 1000; // Un jour en millisecondes
    
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupération de la position géographique de l'utilisateur
        const getLocation = () => {
          return new Promise<GeolocationPosition>((resolve, reject) => {
            if (!navigator.geolocation) {
              reject(new Error("La géolocalisation n'est pas prise en charge par votre navigateur"));
              return;
            }
            
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false, // Précision standard pour économiser la batterie
              timeout: 10000, // 10 secondes de timeout
              maximumAge: ONE_DAY_MS // Utiliser les données pendant une journée
            });
          });
        };
        
        // Localisation par défaut
        let location = "Paris, France";
        
        console.log("Demande d'accès à la géolocalisation...");
        
        // Fonction pour déterminer la ville approximative basée sur les coordonnées
        const getNearestCity = (lat: number, lon: number): string => {
          // Coordonnées approximatives de nombreuses villes françaises pour plus de précision
          const cities = [
            { name: "Paris", lat: 48.86, lon: 2.35 },
            { name: "Lyon", lat: 45.75, lon: 4.85 },
            { name: "Marseille", lat: 43.30, lon: 5.37 },
            { name: "Lille", lat: 50.63, lon: 3.07 },
            { name: "Bordeaux", lat: 44.84, lon: -0.58 },
            { name: "Toulouse", lat: 43.60, lon: 1.44 },
            { name: "Strasbourg", lat: 48.58, lon: 7.75 },
            { name: "Nice", lat: 43.70, lon: 7.27 },
            { name: "Nantes", lat: 47.22, lon: -1.55 },
            { name: "Rennes", lat: 48.11, lon: -1.68 },
            { name: "Montpellier", lat: 43.61, lon: 3.87 },
            { name: "Grenoble", lat: 45.19, lon: 5.72 },
            { name: "Dijon", lat: 47.32, lon: 5.04 },
            { name: "Angers", lat: 47.47, lon: -0.55 },
            { name: "Reims", lat: 49.26, lon: 4.03 },
            { name: "Le Havre", lat: 49.49, lon: 0.11 },
            { name: "Saint-Étienne", lat: 45.44, lon: 4.39 },
            { name: "Toulon", lat: 43.12, lon: 5.93 },
            { name: "Annecy", lat: 45.90, lon: 6.12 },
            { name: "Brest", lat: 48.39, lon: -4.49 },
            { name: "Le Mans", lat: 48.00, lon: 0.20 },
            { name: "Amiens", lat: 49.89, lon: 2.30 },
            { name: "Tours", lat: 47.39, lon: 0.69 },
            { name: "Limoges", lat: 45.83, lon: 1.26 },
            { name: "Clermont-Ferrand", lat: 45.78, lon: 3.08 },
            { name: "Besançon", lat: 47.24, lon: 6.02 },
          ];
          
          // Calculer la distance par rapport à chaque ville
          const cityWithDistance = cities.map(city => {
            const latDiff = city.lat - lat;
            const lonDiff = city.lon - lon;
            const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
            return { ...city, distance };
          });
          
          // Trouver la ville la plus proche
          const nearestCity = cityWithDistance.reduce((prev, curr) => 
            prev.distance < curr.distance ? prev : curr
          );
          
          return `${nearestCity.name}, France`;
        };
        
        try {
          // Essayer d'obtenir la position actuelle
          const position = await getLocation();
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          
          // Utiliser l'API de géocodage inverse pour obtenir le nom exact de la ville
          const lat = coords.latitude;
          const lon = coords.longitude;
          
          // Fonction pour obtenir le nom de la ville à partir des coordonnées
          const getExactCity = async (lat: number, lon: number): Promise<string> => {
            try {
              // Utiliser l'API OpenStreetMap Nominatim pour le géocodage inversé
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`);
              const data = await response.json();
              
              // Extraire le nom de la ville ou du village
              const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || "Localité inconnue";
              return city + ", France";
            } catch (error) {
              console.error("Erreur lors de la récupération du nom de la ville:", error);
              return "Localisation inconnue";
            }
          };
          
          // Obtenir le nom exact de la ville
          const exactCity = await getExactCity(lat, lon);
          location = exactCity;
          console.log("Localisation mise à jour:", location);
        } catch (locError) {
          console.log("Impossible d'obtenir la position, utilisation de Paris par défaut");
          // On continue avec la localisation par défaut de Paris
          location = "Paris, France"; // Localisation par défaut
        }
        
        // Simulation de données météo pour une expérience utilisateur fiable
        // Dans une version de production, une API météo serait utilisée
        
        // Date actuelle
        const now = new Date();
        const month = now.getMonth(); // 0-11
        
        // Températures ajustées selon la saison
        let baseTemp;
        let tempVariation;
        
        // Estimation saisonnière
        if (month >= 11 || month <= 1) {         // Hiver (Dec-Fév)
          baseTemp = 5;
          tempVariation = 7;
        } else if (month >= 2 && month <= 4) {   // Printemps (Mar-Mai)
          baseTemp = 15;
          tempVariation = 8;
        } else if (month >= 5 && month <= 8) {   // Été (Juin-Sep)
          baseTemp = 23;
          tempVariation = 7;
        } else {                                 // Automne (Oct-Nov)
          baseTemp = 12;
          tempVariation = 6;
        }
        
        // Calcul température et humidité pour aujourd'hui
        const temperature = Math.floor(baseTemp + (Math.random() * tempVariation));
        const humidity = Math.floor(Math.random() * 30) + 50;    // 50-80%
        
        // Détermination de l'icône et la description pour aujourd'hui
        let icon = "partly_cloudy";
        let description = "Partiellement nuageux";
        
        if (temperature > 25) {
          icon = "clear_day";
          description = "Ensoleillé";
        } else if (temperature < 10) {
          if (Math.random() > 0.5) {
            icon = "cloudy";
            description = "Nuageux";
          } else {
            icon = "rainy";
            description = "Pluvieux";
          }
        }
        
        // Calcul des prévisions pour demain (légèrement différent d'aujourd'hui)
        // Variation de température de +/- 3 degrés par rapport à aujourd'hui
        const temperatureVariation = Math.floor(Math.random() * 7) - 3; // -3 à +3 degrés
        const forecastTemperature = temperature + temperatureVariation;
        
        // Variation d'humidité de +/- 10%
        const humidityVariation = Math.floor(Math.random() * 21) - 10; // -10% à +10%
        const forecastHumidity = Math.max(40, Math.min(90, humidity + humidityVariation));
        
        // Description et icône pour demain
        let forecastIcon = icon;
        let forecastDescription = description;
        
        // 30% de chances que le temps change
        if (Math.random() < 0.3) {
          // Changement de temps
          const weatherTypes = [
            { icon: "clear_day", description: "Ensoleillé" },
            { icon: "partly_cloudy", description: "Partiellement nuageux" },
            { icon: "cloudy", description: "Nuageux" },
            { icon: "rainy", description: "Pluvieux" }
          ];
          
          // Choisir un nouveau type de temps différent de l'actuel
          const availableTypes = weatherTypes.filter(type => type.icon !== icon);
          const newWeather = availableTypes[Math.floor(Math.random() * availableTypes.length)];
          
          forecastIcon = newWeather.icon;
          forecastDescription = newWeather.description;
        }
        
        // Court délai pour simuler une requête API et améliorer l'expérience utilisateur
        setTimeout(() => {
          setWeatherData({
            temperature,
            humidity,
            icon,
            description,
            location,
            recommendations: generateRecommendations(temperature, humidity),
            forecast: {
              temperature: forecastTemperature,
              humidity: forecastHumidity,
              icon: forecastIcon,
              description: forecastDescription
            }
          });
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        console.error("Erreur lors de la récupération des données météo:", err);
        setError("Impossible de récupérer les données météo");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (error) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-gray-100 rounded-xl shadow-md">
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <div className="bg-red-50 rounded-full inline-block p-3">
              <span className="material-icons text-3xl text-red-500">error_outline</span>
            </div>
            <p className="mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-100 rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500/90 to-blue-400/90 text-white p-4">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="material-icons mr-2">wb_sunny</span>
          Météo et conseils d'entretien
        </h3>
      </div>
      <CardContent className="pt-6">
        {loading ? (
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 animate-pulse flex items-center justify-center">
                <span className="material-icons text-blue-300 text-2xl">wb_cloudy</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-center">
                <Skeleton className="h-5 w-[80px] bg-blue-50" />
              </div>
              <div className="flex justify-center">
                <Skeleton className="h-4 w-[120px] bg-blue-50" />
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <Skeleton className="h-4 w-full bg-gray-50" />
              <Skeleton className="h-4 w-5/6 bg-gray-50" />
              <Skeleton className="h-4 w-4/5 bg-gray-50" />
            </div>
          </div>
        ) : weatherData ? (
          <div>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/10 p-4 rounded-full shadow-inner">
                <span className="material-icons text-5xl text-blue-500">
                  {getWeatherIcon(weatherData.icon)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between mb-4">
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Température</div>
                <div className="text-2xl font-medium">{weatherData.temperature}°C</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Humidité</div>
                <div className="text-2xl font-medium">{weatherData.humidity}%</div>
              </div>
            </div>
            
            <div className="text-center text-gray-600 mb-1 font-medium">{weatherData.description}</div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center">
                <span className="material-icons text-blue-500 text-sm mr-1">location_on</span>
                <span className="text-sm text-blue-600 font-medium">{weatherData.location}</span>
              </div>
            </div>
            
            {/* Prévisions pour demain */}
            {weatherData.forecast && (
              <div className="mt-4 mb-4 border-t border-b border-blue-100 py-4">
                <h4 className="font-medium mb-3 text-blue-700 flex items-center justify-center">
                  <span className="material-icons mr-2 text-sm">calendar_today</span>
                  Prévisions pour demain
                </h4>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-full p-2 mb-1 inline-block">
                      <span className="material-icons text-blue-500">
                        {getWeatherIcon(weatherData.forecast.icon)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{weatherData.forecast.description}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Température</div>
                    <div className="text-lg font-medium">{weatherData.forecast.temperature}°C</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Humidité</div>
                    <div className="text-lg font-medium">{weatherData.forecast.humidity}%</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Recommandations */}
            {weatherData.recommendations && weatherData.recommendations.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-blue-700 flex items-center">
                  <span className="material-icons mr-2 text-sm">tips_and_updates</span>
                  Conseils d'entretien
                </h4>
                <ul className="space-y-2">
                  {weatherData.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">eco</span>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
