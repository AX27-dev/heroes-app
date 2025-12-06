import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Hero } from '../types/hero.interface';

export interface FavoriteHeroContextType {
  // State
  favorites: Hero[];
  favoriteCount: number;

  // Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContextType);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage()
  );

  const toggleFavorite = (hero: Hero) => {
    const heroExists = favorites.find((h) => h.id === hero.id);

    if (heroExists) {
      setFavorites(favorites.filter((h) => h.id !== hero.id));
      return;
    }

    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => favorites.some((h) => h.id === hero.id);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        // State
        favoriteCount: favorites.length,
        favorites,

        // Methods
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
