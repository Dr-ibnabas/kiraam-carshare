import { create } from 'zustand';

import type { CarCategory, SearchFilters } from '../types/car.types';

const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  categories: [],
  priceMin: 3000,
  priceMax: 50000,
  hasAC: true,
  isFourWD: false,
  features: [],
  minRating: 0,
  maxDistanceKm: 50,
  hasDelivery: false,
  sortBy: 'popularity',
  sortOrder: 'desc',
};

interface FiltersState {
  filters: SearchFilters;
  setQuery: (query: string) => void;
  toggleCategory: (category: CarCategory) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>((set, get) => ({
  filters: DEFAULT_FILTERS,
  setQuery: (query) =>
    set({ filters: { ...get().filters, query } }),
  toggleCategory: (category) => {
    const current = get().filters.categories;
    const exists = current.includes(category);
    set({
      filters: {
        ...get().filters,
        categories: exists ? current.filter((c) => c !== category) : [...current, category],
      },
    });
  },
  setFilters: (patch) =>
    set({ filters: { ...get().filters, ...patch } }),
  reset: () => set({ filters: DEFAULT_FILTERS }),
}));
