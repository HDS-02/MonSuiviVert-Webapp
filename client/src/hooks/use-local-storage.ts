import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // État pour stocker notre valeur
  // Passer la fonction d'initialisation à useState pour que la logique
  // ne s'exécute qu'une seule fois
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Récupérer depuis le stockage local par clé
      const item = window.localStorage.getItem(key);
      // Parser le JSON stocké ou renvoyer initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si une erreur se produit, renvoyer initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur dans le localStorage et l'état
  const setValue = (value: T) => {
    try {
      // Autoriser la valeur à être une fonction pour avoir la même API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Sauvegarder l'état
      setStoredValue(valueToStore);
      // Sauvegarder dans localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Une erreur plus élaborée serait mieux ici
      console.log(error);
    }
  };

  // Écouter les changements dans d'autres onglets/fenêtres
  useEffect(() => {
    function handleStorageChange() {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.log(error);
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
