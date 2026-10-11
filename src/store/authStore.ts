import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CURRENT_USER } from '../constants/mockData';
import type { User, UserRole } from '../types/user.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (patch: Partial<User>) => void;
  setRole: (role: UserRole) => void;
  completeOnboarding: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

const KEY_USER = '@kiraam_user';
const KEY_ONBOARDED = '@kiraam_onboarded';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isOnboarded: false,

  login: async (user) => {
    set({ user, isAuthenticated: true });
    try {
      await AsyncStorage.setItem(KEY_USER, JSON.stringify(user));
    } catch {
      // Silencieux
    }
  },

  logout: async () => {
    set({ user: null, isAuthenticated: false });
    try {
      await AsyncStorage.removeItem(KEY_USER);
    } catch {
      // Silencieux
    }
  },

  updateUser: (patch) => {
    const current = get().user;
    if (!current) return;
    const updated = { ...current, ...patch };
    set({ user: updated });
    AsyncStorage.setItem(KEY_USER, JSON.stringify(updated)).catch(() => undefined);
  },

  setRole: (role) => {
    const current = get().user;
    if (!current) return;
    const updated = { ...current, role };
    set({ user: updated });
    AsyncStorage.setItem(KEY_USER, JSON.stringify(updated)).catch(() => undefined);
  },

  completeOnboarding: async () => {
    set({ isOnboarded: true });
    try {
      await AsyncStorage.setItem(KEY_ONBOARDED, 'true');
    } catch {
      // Silencieux
    }
  },

  initializeAuth: async () => {
    try {
      const onboardedRaw = await AsyncStorage.getItem(KEY_ONBOARDED);
      const userRaw = await AsyncStorage.getItem(KEY_USER);
      const isOnboarded = onboardedRaw === 'true';
      // En démo: pas d'auth persistée → garder déconnecté.
      // On expose juste l'état "onboarded" + utilisateur si sauvegardé.
      const user = userRaw ? (JSON.parse(userRaw) as User) : null;
      set({
        isOnboarded,
        user,
        isAuthenticated: !!user,
      });
    } catch {
      set({ isOnboarded: false, user: null, isAuthenticated: false });
    }
  },
}));

// Utilisateur de démo pour développer rapidement
export const DEMO_USER: User = CURRENT_USER;
