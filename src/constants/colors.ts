/**
 * Palette de couleurs KIRAAM CARSHARE
 * Inspirée du drapeau djiboutien : bleu, vert, blanc, rouge
 */

export const Colors = {
  // Couleurs primaires (matching Claude Design handoff)
  primary: '#6AB2E7',
  primaryLight: '#87C1ED',
  primaryDark: '#3D8EC9',

  // Couleurs secondaires
  secondary: '#12AD2B',
  secondaryLight: '#56D86F',
  secondaryDark: '#0A671A',

  // Accent (rouge étoile)
  accent: '#D7141A',
  accentLight: '#E76F75',
  accentDark: '#811015',

  // Or / Premium
  gold: '#F5A623',
  goldLight: '#FFD080',
  goldDark: '#C47F00',

  // Backgrounds
  bgLight: '#FFFFFF',
  bgLightAlt: '#F8FAFC',
  bgDark: '#0A0E1A',
  bgDarkAlt: '#141B2D',

  // Texte
  textLightPrimary: '#0F172A',
  textLightSecondary: '#64748B',
  textDarkPrimary: '#F1F5F9',
  textDarkSecondary: '#94A3B8',

  // Bordures
  borderLight: '#E2E8F0',
  borderDark: '#1E293B',

  // États
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Transparent
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof Colors;
