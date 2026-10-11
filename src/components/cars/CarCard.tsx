import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Heart, Star } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useFavoritesStore } from '../../store/favoritesStore';
import { formatRating } from '../../utils/formatters';
import { Colors } from '../../constants/colors';
import type { Car } from '../../types/car.types';

interface CarCardProps {
  car: Car & { distanceKm?: number };
  onPress: () => void;
  width?: number;
}

/**
 * Carte large "En vedette" — alignée sur le design Claude Design handoff.
 * 260px de large, badge "👑 SUPER" doré pour les véhicules Super-Host,
 * prix en chiffre + "Fdj / jour" séparé.
 */
export function CarCard({ car, onPress, width = 260 }: CarCardProps): React.ReactElement {
  const theme = useTheme();
  const isFavorite = useFavoritesStore((s) => s.isFavorite(car.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  // "Super" = vérifié + super-host (rating >= 4.85)
  const isSuper = car.isVerified && car.rating >= 4.85;
  const priceNumber = new Intl.NumberFormat('fr-FR').format(Math.round(car.pricing.pricePerDay));

  return (
    <Pressable
      onPress={onPress}
      style={{
        width,
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <View style={{ position: 'relative', height: 160 }}>
        <Image
          source={{ uri: car.photos[0] }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          transition={200}
        />
        {isSuper ? (
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: 'rgba(245,166,35,0.16)',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Text style={{ color: '#B07514', fontSize: 11, fontWeight: '700', letterSpacing: 0.1 }}>👑 SUPER</Text>
          </View>
        ) : null}
        <Pressable
          onPress={() => toggleFavorite(car.id)}
          hitSlop={10}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(255,255,255,0.95)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart
            size={18}
            color={Colors.accent}
            fill={isFavorite ? Colors.accent : 'transparent'}
          />
        </Pressable>
      </View>

      <View style={{ padding: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
          <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '800', flex: 1 }} numberOfLines={1}>
            {car.brand} {car.model}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Star size={12} color={Colors.gold} fill={Colors.gold} />
            <Text style={{ color: Colors.gold, fontSize: 13, fontWeight: '600' }}>{formatRating(car.rating)}</Text>
          </View>
        </View>

        <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginBottom: 12 }} numberOfLines={1}>
          {car.location.district} · {car.distanceKm !== undefined ? `${car.distanceKm.toFixed(1)} km` : car.location.city}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '800' }}>
            {priceNumber}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12, fontWeight: '600' }}>Fdj / jour</Text>
        </View>
      </View>
    </Pressable>
  );
}
