import React from 'react';
import { ActivityIndicator, Pressable, Text, View, type PressableProps, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';

import { useTheme } from '../../hooks/useTheme';

type Variant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  textStyle,
  ...rest
}: ButtonProps): React.ReactElement {
  const theme = useTheme();

  const sizes = {
    sm: { paddingV: 8, paddingH: 14, fontSize: 13, height: 36 },
    md: { paddingV: 12, paddingH: 20, fontSize: 15, height: 46 },
    lg: { paddingV: 16, paddingH: 24, fontSize: 17, height: 54 },
  } as const;

  const { paddingV, paddingH, fontSize, height } = sizes[size];

  const getColors = (): { bg: string; text: string; border: string } => {
    switch (variant) {
      case 'primary':
        return { bg: theme.colors.primary, text: '#fff', border: theme.colors.primary };
      case 'secondary':
        return { bg: theme.colors.secondary, text: '#fff', border: theme.colors.secondary };
      case 'accent':
        return { bg: theme.colors.accent, text: '#fff', border: theme.colors.accent };
      case 'outline':
        return { bg: 'transparent', text: theme.colors.primary, border: theme.colors.primary };
      case 'ghost':
        return { bg: 'transparent', text: theme.colors.text, border: 'transparent' };
      case 'danger':
        return { bg: theme.colors.error, text: '#fff', border: theme.colors.error };
    }
  };

  const colors = getColors();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          minHeight: height,
          borderRadius: 12,
          opacity: isDisabled ? 0.6 : pressed ? 0.85 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {leftIcon}
          <Text style={[{ color: colors.text, fontSize, fontWeight: '600' }, textStyle]}>{label}</Text>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}
