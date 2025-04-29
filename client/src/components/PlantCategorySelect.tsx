import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from '@tanstack/react-query';
import { FlowerIcon, TreePine, Sprout, Leaf, Flower2, Home, Apple, Carrot } from 'lucide-react';

// Interface pour les catégories de plantes
export interface PlantCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface PlantCategorySelectProps {
  onSelectCategory: (category: PlantCategory) => void;
}

// Classe CSS pour le motif de grille
const gridPattern = `
.bg-grid-pattern {
  background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}
`;

// Fonction pour obtenir l'icône et les couleurs basées sur la catégorie
const getCategoryDetails = (categoryId: string, size = 28) => {
  switch (categoryId) {
    case 'interieur':
      return {
        icon: <Home size={size} />,
        gradient: 'from-blue-100 via-blue-200 to-blue-100',
        bgColor: 'bg-blue-50/80',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-700'
      };
    case 'exterieur':
      return {
        icon: <TreePine size={size} />,
        gradient: 'from-green-100 via-green-300 to-green-100',
        bgColor: 'bg-green-50/80',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        iconColor: 'text-green-700'
      };
    case 'fruitier':
      return {
        icon: <Apple size={size} />,
        gradient: 'from-amber-100 via-amber-200 to-amber-100',
        bgColor: 'bg-amber-50/80',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-800',
        iconColor: 'text-amber-700'
      };
    case 'fleurs':
      return {
        icon: <Flower2 size={size} />,
        gradient: 'from-pink-200 via-pink-300 to-pink-100',
        bgColor: 'bg-pink-50/80',
        borderColor: 'border-pink-200',
        textColor: 'text-pink-800',
        iconColor: 'text-pink-700'
      };
    case 'legumes':
      return {
        icon: <Carrot size={size} />,
        gradient: 'from-emerald-100 via-emerald-200 to-emerald-100',
        bgColor: 'bg-emerald-50/80',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-800',
        iconColor: 'text-emerald-700'
      };
    default:
      return {
        icon: <Sprout size={size} />,
        gradient: 'from-teal-100 via-teal-200 to-teal-100',
        bgColor: 'bg-teal-50/80',
        borderColor: 'border-teal-200',
        textColor: 'text-teal-800',
        iconColor: 'text-teal-700'
      };
  }
};

export default function PlantCategorySelect({ onSelectCategory }: PlantCategorySelectProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Ajouter les styles CSS une seule fois lors du montage du composant
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = gridPattern;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  // Requête pour récupérer les catégories de plantes
  const { data: categories, isLoading, error } = useQuery<PlantCategory[]>({
    queryKey: ['/api/plant-categories'],
  });

  // Gérer la sélection d'une catégorie
  const handleSelectCategory = (category: PlantCategory) => {
    setSelectedCategoryId(category.id);
    onSelectCategory(category);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-green-800 mb-4">Choisissez une catégorie</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-white/60 backdrop-blur-sm border-green-100/60 transition-all overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[140px]">
                <Skeleton className="h-12 w-12 rounded-full mb-3" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-36 mt-1" />
                <Skeleton className="h-4 w-24 mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-green-800 mb-4">Choisissez une catégorie</h3>
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-md p-6 text-red-600 flex items-center justify-center">
          <p className="text-center">
            Une erreur est survenue lors du chargement des catégories.<br />
            Veuillez actualiser la page pour réessayer.
          </p>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-green-800 mb-4">Choisissez une catégorie</h3>
        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-md p-6 text-amber-700 flex items-center justify-center">
          <p className="text-center">
            Aucune catégorie de plantes n'est actuellement disponible.<br />
            Veuillez réessayer ultérieurement.
          </p>
        </div>
      </div>
    );
  }

  // Rendu du sélecteur de catégories
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-green-800 mb-6 tracking-tight">Choisissez une catégorie de plantes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          const { icon, gradient, bgColor, borderColor, textColor, iconColor } = getCategoryDetails(category.id);
          const isSelected = selectedCategoryId === category.id;
          
          return (
            <div 
              key={category.id}
              className={`rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 ${
                isSelected ? 'scale-105 shadow-lg' : 'hover:shadow-md hover:scale-[1.02]'
              }`}
              onClick={() => handleSelectCategory(category)}
            >
              <div className={`relative h-full backdrop-blur-md rounded-xl border-2 transition-all ${
                isSelected ? `${bgColor} ${borderColor}` : 'bg-white/70 border-gray-100 hover:bg-white/80'
              }`}>
                <div className="absolute inset-0 opacity-30 bg-grid-pattern pointer-events-none"></div>
                
                <div className="p-6 z-10 relative flex flex-col items-center justify-center min-h-[180px]">
                  <div className={`w-16 h-16 mb-5 rounded-full flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg
                    transition-transform hover:scale-110 duration-300`}>
                    <div className={`${iconColor}`}>
                      {icon}
                    </div>
                  </div>
                  
                  <h4 className={`font-semibold text-xl mb-2 transition-colors ${isSelected ? textColor : 'text-gray-800'}`}>
                    {category.name}
                  </h4>
                  
                  <p className="text-sm text-gray-600 text-center max-w-[90%]">
                    {category.description}
                  </p>
                  
                  {isSelected && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 
                      bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
