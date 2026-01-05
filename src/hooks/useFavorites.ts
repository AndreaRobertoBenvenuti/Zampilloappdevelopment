import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'zampillo_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Errore nel salvare i preferiti:', error);
    }
  }, [favorites]);

  const toggleFavorite = (fountainId: string) => {
    setFavorites(prev =>
      prev.includes(fountainId)
        ? prev.filter(id => id !== fountainId)
        : [...prev, fountainId]
    );
  };

  const isFavorite = (fountainId: string) => favorites.includes(fountainId);

  return { favorites, toggleFavorite, isFavorite };
}
