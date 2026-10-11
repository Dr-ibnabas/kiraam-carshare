import React from 'react';
import { View, Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  padded?: boolean;
}

export function Card({ children, style, onPress, padded = true }: CardProps): React.ReactElement {
  const theme = useTheme();
  const cardStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: padded ? 16 : 0,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.95 : 1 }]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}
