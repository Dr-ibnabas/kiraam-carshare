import React from 'react';
import { View, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../hooks/useTheme';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'gold' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

export function Badge({ label, variant = 'primary', icon, size = 'md', style }: BadgeProps): React.ReactElement {
  const theme = useTheme();

  const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
    primary: { bg: `${theme.colors.primary}22`, text: theme.colors.primary },
    secondary: { bg: `${theme.colors.secondary}22`, text: theme.colors.secondary },
    accent: { bg: `${theme.colors.accent}22`, text: theme.colors.accent },
    gold: { bg: '#F5A62322', text: '#C47F00' },
    success: { bg: `${theme.colors.success}22`, text: theme.colors.success },
    warning: { bg: `${theme.colors.warning}22`, text: theme.colors.warning },
    error: { bg: `${theme.colors.error}22`, text: theme.colors.error },
    neutral: { bg: theme.colors.backgroundAlt, text: theme.colors.textSecondary },
  };

  const colors = variantColors[variant];
  const padding = size === 'sm' ? { paddingHorizontal: 8, paddingVertical: 3 } : { paddingHorizontal: 10, paddingVertical: 5 };
  const fontSize = size === 'sm' ? 11 : 12;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          backgroundColor: colors.bg,
          borderRadius: 999,
          alignSelf: 'flex-start',
          ...padding,
        },
        style,
      ]}
    >
      {icon}
      <Text style={{ color: colors.text, fontSize, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}
