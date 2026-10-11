import React from 'react';
import { View, Pressable } from 'react-native';
import { Star } from 'lucide-react-native';

interface Props {
  rating: number;
  size?: number;
  onChange?: (rating: number) => void;
  color?: string;
}

export function RatingStars({ rating, size = 18, onChange, color = '#F5A623' }: Props): React.ReactElement {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = rating >= n;
        return (
          <Pressable key={n} onPress={() => onChange?.(n)} disabled={!onChange} hitSlop={4}>
            <Star size={size} color={color} fill={filled ? color : 'transparent'} />
          </Pressable>
        );
      })}
    </View>
  );
}
