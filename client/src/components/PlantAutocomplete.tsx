import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface PlantSuggestion {
  name: string;
  species?: string;
}

interface PlantAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectSuggestion: (suggestion: PlantSuggestion) => void;
  placeholder?: string;
  className?: string;
}

export default function PlantAutocomplete({
  value,
  onChange,
  onSelectSuggestion,
  placeholder = "Nom de la plante",
  className = ""
}: PlantAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<PlantSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const debouncedSearch = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Effet pour détecter les clics en dehors du composant
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fonction pour rechercher des suggestions
  const fetchSuggestions = async (query: string) => {
    // Si la requête est trop courte, ne pas rechercher
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Annuler toute recherche précédente en cours
    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }
    
    // Débounce la recherche pour éviter trop d'appels API
    debouncedSearch.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        console.log("Recherche de suggestions pour:", query);
        
        // Utiliser à la fois q et search comme paramètres pour plus de robustesse
        const params = new URLSearchParams();
        params.append('q', query);
        params.append('search', query);
        
        const response = await fetch(`/api/plant-database?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`);
        }
        
        const data: PlantSuggestion[] = await response.json();
        console.log(`Résultats de recherche: ${data.length} suggestions trouvées`);
        
        setSuggestions(data);
        setShowSuggestions(hasFocus && data.length > 0);
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  // Effet pour déclencher la recherche lorsque la valeur change
  useEffect(() => {
    fetchSuggestions(value);
  }, [value]);

  // Gestion du changement de valeur dans l'input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  // Gestion de la sélection d'une suggestion
  const handleSuggestionClick = (suggestion: PlantSuggestion) => {
    onChange(suggestion.name);
    onSelectSuggestion(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            setHasFocus(true);
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Délai pour permettre le clic sur une suggestion
            setTimeout(() => setHasFocus(false), 200);
          }}
          placeholder={placeholder}
          className="w-full pr-10"
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {/* Liste des suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white rounded-md shadow-lg border border-gray-200">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="font-medium">{suggestion.name}</div>
                {suggestion.species && (
                  <div className="text-xs text-gray-500">{suggestion.species}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
