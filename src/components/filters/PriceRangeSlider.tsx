import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

import { useTheme } from '../../hooks/useTheme';
import { formatPrice } from '../../utils/formatters';

interface Props {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
}

export function PriceRangeSlider({ min, max, value, onChange, label }: Props): React.ReactElement {
  const theme = useTheme();
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>{label}</Text>
        <Text style={{ color: theme.colors.primary, fontSize: 14, fontWeight: '700' }}>{formatPrice(value)}</Text>
      </View>
      <Slider
        minimumValue={min}
        maximumValue={max}
        value={value}
        step={500}
        onValueChange={onChange}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.border}
        thumbTintColor={theme.colors.primary}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>{formatPrice(min)}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>{formatPrice(max)}</Text>
      </View>
    </View>
  );
}
