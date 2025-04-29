import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import PlantGrowth from './animations/PlantGrowth';
import BadgeAchievement from './animations/BadgeAchievement';
import PlantDiagnostic from './animations/PlantDiagnostic';
import { 
  HomeScreenMockup, 
  AddPlantScreenMockup, 
  TasksScreenMockup, 
  SOSScreenMockup, 
  BadgesScreenMockup 
} from './animations/ScreenMockups';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  mainAnimation: React.ReactNode;
  screenPreview?: React.ReactNode;
  color: string;
  position?: 'center' | 'left' | 'right';
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Bienvenue sur Mon Suivi Vert !",
    description: "Suivez la santé de vos plantes et obtenez des conseils personnalisés pour les aider à s'épanouir.",
    icon: "eco",
    mainAnimation: <motion.div 
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-8xl"
    >
      🌱
    </motion.div>,
    screenPreview: <HomeScreenMockup />,
    color: "from-green-400 to-emerald-600",
    position: "center"
  },
  {
    id: 2,
    title: "Ajoutez vos plantes",
    description: "Créez votre collection personnelle en ajoutant vos plantes avec leur nom, espèce et photo.",
    icon: "add_circle",
    mainAnimation: <div className="relative w-32 h-32">
      <PlantGrowth />
      <motion.div 
        className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="material-icons text-base">add</span>
      </motion.div>
    </div>,
    screenPreview: <AddPlantScreenMockup />,
    color: "from-blue-400 to-indigo-600",
    position: "left"
  },
  {
    id: 3,
    title: "Suivez leur entretien",
    description: "Recevez des rappels personnalisés pour l'arrosage et autres soins en fonction de chaque espèce.",
    icon: "water_drop",
    mainAnimation: <div className="w-32 h-32 flex items-center justify-center">
      <motion.div 
        className="relative"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div className="text-6xl">🪴</motion.div>
        <motion.div 
          className="absolute -top-4 -right-4 text-4xl"
          animate={{ 
            y: [0, 15, 20],
            opacity: [1, 1, 0],
            scale: [1, 0.8, 0.6]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          💧
        </motion.div>
        <motion.div 
          className="absolute -top-1 right-2 text-3xl"
          animate={{ 
            y: [0, 18, 25],
            opacity: [1, 1, 0],
            scale: [1, 0.8, 0.6]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 0.5,
            repeatDelay: 1
          }}
        >
          💧
        </motion.div>
      </motion.div>
    </div>,
    screenPreview: <TasksScreenMockup />,
    color: "from-cyan-400 to-sky-600",
    position: "right"
  },
  {
    id: 4,
    title: "Besoin d'aide ?",
    description: "Utilisez le bouton SOS pour diagnostiquer les problèmes de vos plantes et obtenir des conseils immédiats.",
    icon: "emergency",
    mainAnimation: <div className="w-32 h-32 flex items-center justify-center">
      <PlantDiagnostic />
    </div>,
    screenPreview: <SOSScreenMockup />,
    color: "from-orange-400 to-red-600",
    position: "left"
  },
  {
    id: 5,
    title: "Débloquez des badges",
    description: "Collectionnez des badges en prenant soin de vos plantes et en utilisant les fonctionnalités de l'application.",
    icon: "emoji_events",
    mainAnimation: <div className="w-32 h-32 flex items-center justify-center">
      <BadgeAchievement />
    </div>,
    screenPreview: <BadgesScreenMockup />,
    color: "from-yellow-400 to-amber-600",
    position: "right"
  }
];

export default function OnboardingTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage('hasSeenOnboarding', false);

  useEffect(() => {
    // Afficher l'onboarding après un court délai seulement s'il n'a pas déjà été vu
    if (!hasSeenOnboarding) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasSeenOnboarding]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    setIsVisible(false);
    setHasSeenOnboarding(true);
    toast({
      title: "Tutoriel terminé !",
      description: "Vous êtes prêt à commencer votre aventure végétale.",
    });
  };

  const skipTutorial = () => {
    setIsVisible(false);
    setHasSeenOnboarding(true);
  };

  // Si l'utilisateur a déjà vu l'onboarding, ne rien afficher
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl mx-auto bg-white rounded-xl overflow-hidden shadow-xl"
        >
          {/* Barre de progression */}
          <div className="w-full h-1 bg-gray-200">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Informations à gauche */}
            <div className="p-6 md:w-1/2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="material-icons text-primary">{steps[currentStep].icon}</span>
                </div>
                <h2 className="text-xl font-bold">{steps[currentStep].title}</h2>
              </div>
              
              <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
              
              <div className="hidden md:block">
                {steps[currentStep].mainAnimation}
              </div>
            </div>
            
            {/* Preview à droite */}
            <div className="md:w-1/2 p-4 bg-gray-50 flex items-center justify-center">
              <div className="w-full max-w-[220px] transform scale-75">
                {steps[currentStep].screenPreview}
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <div>
              {currentStep > 0 ? (
                <Button variant="ghost" size="sm" onClick={prevStep}>
                  <span className="material-icons mr-1 text-sm">arrow_back</span>
                  Précédent
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={skipTutorial}>
                  Passer
                </Button>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </div>
            <Button size="sm" onClick={nextStep}>
              {currentStep < steps.length - 1 ? (
                <>
                  Suivant
                  <span className="material-icons ml-1 text-sm">arrow_forward</span>
                </>
              ) : (
                'Terminer'
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
