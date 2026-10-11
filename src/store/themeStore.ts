import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

import { darkTheme, lightTheme, type Theme } from '../constants/theme';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  theme: Theme;
  setMode: (mode: ThemeMode) => Promise<void>;
  initializeTheme: () => Promise<void>;
}

const STORAGE_KEY = '@kiraam_theme_mode';

function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === 'auto') return Appearance.getColorScheme() === 'dark';
  return mode === 'dark';
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'auto',
  isDark: false,
  theme: lightTheme,
  setMode: async (mode) => {
    const isDark = resolveIsDark(mode);
    set({ mode, isDark, theme: isDark ? darkTheme : lightTheme });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Silencieux
    }
  },
  initializeTheme: async () => {
    try {
      const saved = (await AsyncStorage.getItem(STORAGE_KEY)) as ThemeMode | null;
      const mode = saved ?? 'auto';
      const isDark = resolveIsDark(mode);
      set({ mode, isDark, theme: isDark ? darkTheme : lightTheme });
    } catch {
      set({ mode: 'auto', isDark: false, theme: lightTheme });
    }
  },
}));
