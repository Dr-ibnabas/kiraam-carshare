import { useThemeStore } from '../store/themeStore';

export function useTheme() {
  return useThemeStore((s) => s.theme);
}

export function useThemeMode() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const isDark = useThemeStore((s) => s.isDark);
  return { mode, setMode, isDark };
}
