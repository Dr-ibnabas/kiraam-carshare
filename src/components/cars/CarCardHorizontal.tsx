import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Star, Award } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { formatPrice, formatRating } from '../../utils/formatters';
import { Colors } from '../../constants/colors';
import type { Car } from '../../types/car.types';

interface Props {
  car: Car & { distanceKm?: number };
  onPress: () => void;
}

/**
 * Carte horizontale compacte — alignée sur le design Claude Design handoff.
 * Photo 100x80, padding 12, layout flex avec rating + distance + prix sur ligne du bas.
 */
export function CarCardHorizontal({ car, onPress }: Props): React.ReactElement {
  const theme = useTheme();
  const isSuper = car.isVerified && car.rating >= 4.85;

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 18,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
      }}
    >
      <View style={{ width: 100, height: 80, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
        <Image
          source={{ uri: car.photos[0] }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          transition={200}
        />
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: '800', flex: 1 }} numberOfLines={1}>
            {car.brand} {car.model}
          </Text>
          {isSuper ? <Award size={14} color={Colors.gold} /> : null}
        </View>

        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 6 }}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>
            {labelType(car.category)} · {car.transmission === 'automatic' ? 'Auto' : 'Manuelle'} · {car.seats}p
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Star size={10} color={Colors.gold} fill={Colors.gold} />
              <Text style={{ color: Colors.gold, fontSize: 11, fontWeight: '600' }}>
                {formatRating(car.rating)}
              </Text>
            </View>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>
              ({car.reviewsCount}) · {car.distanceKm !== undefined ? `${car.distanceKm.toFixed(1)} km` : '—'}
            </Text>
          </View>
          <Text style={{ color: Colors.primaryDark, fontSize: 14, fontWeight: '800' }}>
            {formatPrice(car.pricing.pricePerDay)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function labelType(c: Car['category']): string {
  const map: Record<Car['category'], string> = {
    suv: 'SUV/4x4',
    city: 'Citadine',
    luxury: 'Luxe',
    family: 'Familiale',
    sedan: 'Berline',
    hybrid: 'Hybride',
    pickup: 'Pick-up',
  };
  return map[c];
}
