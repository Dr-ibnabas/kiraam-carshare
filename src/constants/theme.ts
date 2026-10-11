import { Colors } from './colors';

export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundAlt: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    overlay: string;
  };
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadowsLight;
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadowsLight = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

export const shadowsDark = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    accent: Colors.accent,
    background: Colors.bgLight,
    backgroundAlt: Colors.bgLightAlt,
    card: Colors.bgLight,
    text: Colors.textLightPrimary,
    textSecondary: Colors.textLightSecondary,
    border: Colors.borderLight,
    success: Colors.success,
    warning: Colors.warning,
    error: Colors.error,
    overlay: Colors.overlay,
  },
  spacing,
  radius,
  shadows: shadowsLight,
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    accent: Colors.accent,
    background: Colors.bgDark,
    backgroundAlt: Colors.bgDarkAlt,
    card: Colors.bgDarkAlt,
    text: Colors.textDarkPrimary,
    textSecondary: Colors.textDarkSecondary,
    border: Colors.borderDark,
    success: Colors.success,
    warning: Colors.warning,
    error: Colors.error,
    overlay: Colors.overlay,
  },
  spacing,
  radius,
  shadows: shadowsDark,
};
