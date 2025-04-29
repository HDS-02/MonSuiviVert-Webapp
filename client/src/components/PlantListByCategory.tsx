import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlantCategory } from './PlantCategorySelect';
import { Input } from './ui/input';
import { Search, ArrowLeft, Leaf, Droplets, Sun } from 'lucide-react';

// Interface pour les plantes dans la base de données
export interface PlantEntry {
  name: string;
  species: string;
  category: string;
  wateringFrequency: number;
  light: string;
  temperature: string;
  careNotes: string;
}

interface PlantListByCategoryProps {
  category: PlantCategory;
  onSelectPlant: (plant: PlantEntry) => void;
  onGoBack: () => void;
}

export default function PlantListByCategory({ 
  category, 
  onSelectPlant, 
  onGoBack 
}: PlantListByCategoryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Récupérer les plantes pour la catégorie sélectionnée
  const { data: plants, isLoading, error } = useQuery<PlantEntry[]>({
    queryKey: [`/api/plant-database/category/${category.id}`],
  });

  // Filtrer les plantes en fonction du terme de recherche
  const filteredPlants = plants?.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-green-800">{category.name}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onGoBack}
            className="flex items-center gap-1 text-green-700 hover:text-green-900 hover:bg-green-50"
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Input 
            placeholder="Rechercher une plante..." 
            className="pl-10 bg-white/60 backdrop-blur-sm border-green-100 focus-visible:ring-green-400" 
            disabled 
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-500/50" />
        </div>
        
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="w-full bg-white/60 backdrop-blur-sm border-green-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-green-800">{category.name}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onGoBack}
            className="flex items-center gap-1 text-green-700 hover:text-green-900 hover:bg-green-50"
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
        </div>
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-md p-4 text-red-600 flex items-center gap-2">
          Erreur lors du chargement des plantes. Veuillez réessayer.
        </div>
      </div>
    );
  }

  if (!plants || plants.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-green-800">{category.name}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onGoBack}
            className="flex items-center gap-1 text-green-700 hover:text-green-900 hover:bg-green-50"
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
        </div>
        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-md p-4 text-amber-700 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-amber-600" />
          Aucune plante n'est disponible dans cette catégorie.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium text-green-800">{category.name}</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onGoBack}
          className="flex items-center gap-1 text-green-700 hover:text-green-900 hover:bg-green-50"
        >
          <ArrowLeft size={16} />
          Retour
        </Button>
      </div>
      
      <div className="relative mb-6">
        <Input 
          placeholder="Rechercher une plante..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/60 backdrop-blur-sm border-green-100 focus-visible:ring-green-400"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-500" />
      </div>
      
      {filteredPlants && filteredPlants.length > 0 ? (
        <div className="space-y-3">
          {filteredPlants.map((plant) => (
            <Card 
              key={plant.name} 
              className="w-full hover:bg-white/70 group transition-all duration-300 cursor-pointer bg-white/60 backdrop-blur-sm border border-green-100"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="font-medium text-green-800 group-hover:text-green-900">{plant.name}</h4>
                    <p className="text-sm text-green-600/75">{plant.species}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center text-xs text-green-600">
                        <Droplets className="h-3 w-3 mr-1" />
                        <span>Arrosage : {plant.wateringFrequency > 5 ? 'Rare' : plant.wateringFrequency > 3 ? 'Modéré' : 'Fréquent'}</span>
                      </div>
                      <div className="flex items-center text-xs text-green-600">
                        <Sun className="h-3 w-3 mr-1" />
                        <span>Lumière : {plant.light}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSelectPlant(plant)}
                    className="bg-green-50/50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                  >
                    Sélectionner
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-md p-4 text-amber-700 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-amber-600" />
          Aucune plante ne correspond à votre recherche.
        </div>
      )}
    </div>
  );
}
