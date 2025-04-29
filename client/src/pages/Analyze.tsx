import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { InsertPlant, InsertPlantAnalysis } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Analyze() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [plantName, setPlantName] = useState("");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Gérer le glisser-déposer
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Format non supporté",
          description: "Veuillez déposer uniquement des images",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une image",
        variant: "destructive",
      });
      return;
    }

    // Vérifier la taille de l'image (20 MB max)
    if (selectedImage.size > 20 * 1024 * 1024) {
      toast({
        title: "Image trop volumineuse",
        description: "L'image ne doit pas dépasser 20 Mo",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMsg = errorData?.message || `Erreur: ${response.status}`;
        
        if (response.status === 429 || errorMsg.includes("quota") || errorMsg.includes("dépassée")) {
          throw new Error("Le service d'analyse est temporairement indisponible (quota dépassé). Veuillez réessayer plus tard.");
        } else if (response.status === 413 || errorMsg.includes("taille")) {
          throw new Error("L'image est trop volumineuse. Veuillez utiliser une image plus petite.");
        } else {
          throw new Error(errorMsg);
        }
      }
      
      const result = await response.json();
      
      // Vérification de la réponse d'urgence en cas de problème d'API
      if (result.recommendations && 
          result.recommendations.length > 0 && 
          result.recommendations[0].includes("temporairement indisponible")) {
        
        toast({
          title: "Service limité",
          description: "L'analyse est actuellement limitée. Certaines informations peuvent être incomplètes.",
        });
      }
      
      setAnalysisResult(result);
      
      // Auto-fill the plant name if available
      if (result.plantName) {
        setPlantName(result.plantName);
      }
      
      setShowSaveDialog(true);
    } catch (error: any) {
      console.error("Erreur d'analyse:", error);
      toast({
        title: "Erreur d'analyse",
        description: error.message || "Une erreur est survenue lors de l'analyse de l'image",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const savePlant = async () => {
    if (!analysisResult) return;
    
    try {
      // Create plant first
      const plantData: InsertPlant = {
        name: plantName || "Plante sans nom",
        species: analysisResult.species || "",
        status: analysisResult.status || "healthy",
        image: analysisResult.imagePath || "",
        wateringFrequency: 7, // Default value
        light: analysisResult.careInstructions?.light || "",
        temperature: analysisResult.careInstructions?.temperature || "",
        careNotes: analysisResult.careInstructions?.additional?.join(". ") || "",
      };
      
      const plantResponse = await apiRequest("POST", "/api/plants", plantData);
      const plant = await plantResponse.json();
      
      // Then create analysis for the plant
      const analysisData: InsertPlantAnalysis = {
        plantId: plant.id,
        status: analysisResult.status || "healthy",
        image: analysisResult.imagePath || "",
        aiAnalysis: analysisResult,
        healthIssues: analysisResult.healthIssues?.join(". ") || "",
        recommendations: analysisResult.recommendations?.join(". ") || "",
      };
      
      await apiRequest("POST", `/api/plants/${plant.id}/analyses`, analysisData);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["/api/plants"] });
      
      toast({
        title: "Plante sauvegardée",
        description: "La plante a été ajoutée à votre collection",
      });
      
      setShowSaveDialog(false);
      // Ajout d'un court délai pour s'assurer que les données sont bien invalidées
      setTimeout(() => {
        navigate(`/plants`);
      }, 100);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button 
          className="flex items-center text-primary mb-4"
          onClick={() => navigate("/")}
        >
          <span className="material-icons mr-1">arrow_back</span>
          Retour
        </button>
        <h2 className="text-xl font-raleway font-semibold">Analyser une plante</h2>
        <p className="text-gray-600">Prenez une photo ou importez une image pour obtenir des informations sur votre plante</p>
      </div>

      <Card className="bg-white rounded-lg shadow-md mb-6">
        <CardContent className="p-6">
          {imagePreview ? (
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-4">
                <img 
                  src={imagePreview} 
                  alt="Aperçu de la plante" 
                  className="w-full h-64 object-contain rounded-lg" 
                />
                <button 
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                    setAnalysisResult(null);
                  }}
                >
                  <span className="material-icons text-gray-600">close</span>
                </button>
              </div>
              <div className="flex gap-3">
                <Button
                  className="bg-primary text-white"
                  onClick={handleSubmit}
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <>
                      <span className="material-icons animate-spin mr-2">refresh</span>
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <span className="material-icons mr-2">auto_fix_high</span>
                      Analyser
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <span className="material-icons text-gray-400 text-4xl mb-4">add_photo_alternate</span>
              <h3 className="font-medium mb-2">Déposez votre photo ici</h3>
              <p className="text-sm text-gray-500 mb-4">ou utilisez l'une des options ci-dessous</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-primary text-white"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.setAttribute("capture", "environment");
                      fileInputRef.current.click();
                    }
                  }}
                >
                  <span className="material-icons mr-2">photo_camera</span>
                  Prendre une photo
                </Button>
                <Button
                  variant="outline"
                  className="border border-primary text-primary"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.removeAttribute("capture");
                      fileInputRef.current.click();
                    }
                  }}
                >
                  <span className="material-icons mr-2">photo_library</span>
                  Importer une image
                </Button>
                <Button
                  variant="outline"
                  className="border border-primary text-primary"
                  onClick={() => navigate("/add-plant")}
                >
                  <span className="material-icons mr-2">edit</span>
                  Ajouter manuellement
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-md">
        <CardContent className="p-6">
          <h3 className="font-raleway font-semibold mb-4">Comment obtenir une bonne analyse ?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="material-icons text-primary mr-2 mt-0.5">check_circle</span>
              <span>Prenez une photo claire avec un bon éclairage</span>
            </li>
            <li className="flex items-start">
              <span className="material-icons text-primary mr-2 mt-0.5">check_circle</span>
              <span>Capturez l'ensemble de la plante pour une analyse complète</span>
            </li>
            <li className="flex items-start">
              <span className="material-icons text-primary mr-2 mt-0.5">check_circle</span>
              <span>Pour les maladies, photographiez les zones affectées en gros plan</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Save plant dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Enregistrer la plante</DialogTitle>
            <DialogDescription>
              L'analyse est terminée ! Vous pouvez maintenant ajouter cette plante à votre collection.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="plantName">Nom de la plante</Label>
              <Input
                id="plantName"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="Ex: Ficus Lyrata"
                className="w-full"
              />
            </div>
            
            {analysisResult && (
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                <div>
                  <h4 className="text-sm font-semibold mb-1">État de santé</h4>
                  <p className="text-sm">
                    {analysisResult.status === "healthy" ? "Bonne santé" : 
                     analysisResult.status === "warning" ? "Attention requise" : 
                     "Besoin d'aide urgente"}
                  </p>
                </div>
                
                {analysisResult.healthIssues && analysisResult.healthIssues.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Problèmes détectés</h4>
                    <ul className="text-sm space-y-1">
                      {analysisResult.healthIssues.map((issue: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="material-icons text-alert mr-1 text-sm">warning</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Recommandations</h4>
                    <ul className="text-sm space-y-1">
                      {analysisResult.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="material-icons text-primary mr-1 text-sm">eco</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-semibold mb-1">Soins recommandés</h4>
                  {analysisResult.careInstructions && (
                    <div className="space-y-2 text-sm">
                      {analysisResult.careInstructions.watering && (
                        <p>
                          <span className="font-medium">Arrosage:</span> {analysisResult.careInstructions.watering}
                        </p>
                      )}
                      {analysisResult.careInstructions.light && (
                        <p>
                          <span className="font-medium">Lumière:</span> {analysisResult.careInstructions.light}
                        </p>
                      )}
                      {analysisResult.careInstructions.temperature && (
                        <p>
                          <span className="font-medium">Température:</span> {analysisResult.careInstructions.temperature}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setShowSaveDialog(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={savePlant}
              className="bg-primary text-white"
            >
              Ajouter à ma collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
