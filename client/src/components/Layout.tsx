import { ReactNode } from "react";
import { useLocation } from "wouter";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";
import OnboardingTutorial from "./OnboardingTutorial";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // Vérifier si on est sur la page d'authentification
  const isAuthPage = location === "/auth";
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Header />
      
      <main className={`flex-grow container mx-auto px-4 py-6 ${!isAuthPage ? "mb-16" : ""}`}>
        {children}
      </main>
      
      {/* ADD PLANT FLOATING BUTTON - Masqué sur la page d'authentification */}
      {!isAuthPage && (
        <div className="fixed right-4 bottom-20 z-10">
          <a 
            href="/add-plant" 
            className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
          >
            <span className="material-icons">add</span>
          </a>
        </div>
      )}
      
      {/* Barre de navigation - Masquée sur la page d'authentification */}
      {!isAuthPage && <BottomNavigation />}
      
      <OnboardingTutorial />
    </div>
  );
}
