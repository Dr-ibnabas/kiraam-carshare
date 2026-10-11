import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  carIds: string[];
  isFavorite: (carId: string) => boolean;
  toggleFavorite: (carId: string) => Promise<void>;
  initialize: () => Promise<void>;
}

const KEY = '@kiraam_favorites';

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  carIds: [],
  isFavorite: (carId) => get().carIds.includes(carId),
  toggleFavorite: async (carId) => {
    const current = get().carIds;
    const updated = current.includes(carId)
      ? current.filter((id) => id !== carId)
      : [...current, carId];
    set({ carIds: updated });
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    } catch {
      // Silencieux
    }
  },
  initialize: async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) set({ carIds: JSON.parse(raw) as string[] });
    } catch {
      // Silencieux
    }
  },
}));
