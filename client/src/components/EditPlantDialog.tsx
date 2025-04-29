import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertPlantSchema, Plant } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Validation schema
const editPlantSchema = insertPlantSchema.extend({
  id: z.number().optional(),
});

type EditPlantFormValues = z.infer<typeof editPlantSchema>;

interface EditPlantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plant?: Plant;
  onDelete?: () => void;
}

export default function EditPlantDialog({ open, onOpenChange, plant, onDelete }: EditPlantDialogProps) {
  const { toast } = useToast();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  const form = useForm<EditPlantFormValues>({
    resolver: zodResolver(editPlantSchema),
    defaultValues: {
      name: plant?.name || "",
      species: plant?.species || "",
      status: plant?.status || "healthy",
      light: plant?.light || "",
      temperature: plant?.temperature || "",
      wateringFrequency: plant?.wateringFrequency || 7,
      careNotes: plant?.careNotes || "",
      image: plant?.image || "",
      potSize: plant?.potSize || "",
      // Ces champs d'objets JSON sont convertis en chaînes pour le formulaire
      gallery: plant?.gallery ? JSON.stringify(plant.gallery) : "[]",
      commonDiseases: plant?.commonDiseases ? JSON.stringify(plant.commonDiseases) : "[]",
    },
  });
  
  // Update form values when plant changes
  useEffect(() => {
    if (plant) {
      form.reset({
        name: plant.name || "",
        species: plant.species || "",
        status: plant.status || "healthy",
        light: plant.light || "",
        temperature: plant.temperature || "",
        wateringFrequency: plant.wateringFrequency || 7,
        careNotes: plant.careNotes || "",
        image: plant.image || "",
        potSize: plant?.potSize || "",
        gallery: plant?.gallery ? JSON.stringify(plant.gallery) : "[]",
        commonDiseases: plant?.commonDiseases ? JSON.stringify(plant.commonDiseases) : "[]",
      });
    }
  }, [plant, form.reset]);

  const onSubmit = async (data: EditPlantFormValues) => {
    try {
      // Traitement des données JSON avant envoi
      const formattedData = {
        ...data,
        // Traiter la galerie : convertir la chaîne en tableau
        gallery: data.gallery ? 
          (typeof data.gallery === 'string' ? 
            data.gallery.split(',').map(url => url.trim()).filter(url => url) : 
            data.gallery) : 
          [],
        
        // Traiter les maladies courantes : s'assurer que c'est un JSON valide
        commonDiseases: data.commonDiseases ? 
          (typeof data.commonDiseases === 'string' ? 
            (() => {
              try {
                return JSON.parse(data.commonDiseases as string);
              } catch (e) {
                console.error("Format JSON invalide:", e);
                return [];
              }
            })() : 
            data.commonDiseases) : 
          []
      };

      if (plant?.id) {
        // Update existing plant
        await apiRequest("PATCH", `/api/plants/${plant.id}`, formattedData);
        toast({
          title: "Plante mise à jour",
          description: "Les informations de la plante ont été mises à jour avec succès.",
        });
        
        // Refresh data
        queryClient.invalidateQueries({ queryKey: ["/api/plants"] });
        queryClient.invalidateQueries({ queryKey: [`/api/plants/${plant.id}`] });
      } else {
        // Create new plant
        await apiRequest("POST", "/api/plants", formattedData);
        toast({
          title: "Plante créée",
          description: "La nouvelle plante a été ajoutée à votre collection.",
        });
        
        // Refresh data
        queryClient.invalidateQueries({ queryKey: ["/api/plants"] });
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de la plante.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!plant?.id) return;
    
    try {
      await apiRequest("DELETE", `/api/plants/${plant.id}`);
      
      toast({
        title: "Plante supprimée",
        description: "La plante a été supprimée de votre collection.",
      });
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/plants"] });
      
      if (onDelete) onDelete();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la plante.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{plant ? "Modifier la plante" : "Ajouter une plante"}</DialogTitle>
            <DialogDescription>
              {plant 
                ? "Modifiez les informations de votre plante" 
                : "Ajoutez une nouvelle plante à votre collection"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la plante</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Ficus Lyrata" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espèce</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Ficus lyrata" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>État de santé</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez l'état de santé" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="healthy">Bonne santé</SelectItem>
                        <SelectItem value="warning">Attention requise</SelectItem>
                        <SelectItem value="danger">Besoin d'aide</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="wateringFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fréquence d'arrosage (jours)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={60} 
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="light"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exposition à la lumière</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Indirecte brillante" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Température</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 18-24°C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="careNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes d'entretien</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Entrez vos notes d'entretien spécifiques ici..."
                        className="h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="potSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taille de pot recommandée</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Pot de 20-25 cm de diamètre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gallery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Galerie d'images (URLs séparées par des virgules)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Entrez une liste d'URLs d'images séparées par des virgules"
                        className="h-20"
                        {...field}
                        onChange={(e) => {
                          // Stocke les URLs sous forme de chaîne pour le formulaire
                          field.onChange(e.target.value);
                          
                          try {
                            // Validation simple pour s'assurer que c'est un tableau JSON valide
                            const urls = e.target.value.split(',').map(url => url.trim());
                            const jsonUrls = JSON.stringify(urls.filter(url => url));
                            // Cette ligne ne s'exécute que pour validation
                            JSON.parse(jsonUrls);
                          } catch (err) {
                            // En cas d'erreur de parsing, on garde la valeur telle quelle
                            console.error("Format de galerie invalide:", err);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="commonDiseases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maladies courantes (format JSON)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder='[{"name": "Oïdium", "description": "Champignon qui forme un duvet blanc sur les feuilles", "treatment": "Traitement fongicide ou solution de bicarbonate de soude"}]'
                        className="h-24 font-mono text-xs"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          
                          try {
                            // Validation simple pour s'assurer que c'est un JSON valide
                            JSON.parse(e.target.value);
                          } catch (err) {
                            // En cas d'erreur de parsing, on garde la valeur telle quelle
                            console.error("Format JSON invalide:", err);
                          }
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      Format: Tableau d'objets avec les propriétés name, description et treatment
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex sm:justify-between pt-4">
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Annuler
                  </Button>
                  {plant && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setIsDeleteConfirmOpen(true)}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
                <Button type="submit" className="bg-primary text-white">
                  {plant ? "Enregistrer les modifications" : "Ajouter la plante"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog for delete */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette plante ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
