import React from 'react';
import { Pressable, Text } from 'react-native';

import { useTheme } from '../../hooks/useTheme';

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
}

export function FilterChip({ label, active, onPress, icon }: Props): React.ReactElement {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1.5,
        borderColor: active ? theme.colors.primary : theme.colors.border,
        backgroundColor: active ? `${theme.colors.primary}15` : 'transparent',
      }}
    >
      {icon}
      <Text style={{ color: active ? theme.colors.primary : theme.colors.text, fontSize: 13, fontWeight: '600' }}>
        {label}
      </Text>
    </Pressable>
  );
}
