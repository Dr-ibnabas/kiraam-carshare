import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { formatPrice } from '../../utils/formatters';

interface Props {
  pricePerDay: number;
  selected?: boolean;
}

export function CarMapMarker({ pricePerDay, selected = false }: Props): React.ReactElement {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: selected ? theme.colors.accent : theme.colors.primary,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: '#fff',
        ...theme.shadows.md,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>{formatPrice(pricePerDay)}</Text>
    </View>
  );
}
