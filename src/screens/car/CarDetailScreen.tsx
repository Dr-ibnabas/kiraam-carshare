import React from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Heart, Share2, Star, MapPin, Users, Fuel, Cog, Snowflake, MessageCircle, Shield } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useCar } from '../../hooks/useCars';
import { useCarReviews } from '../../hooks/useBookings';
import { useFavoritesStore } from '../../store/favoritesStore';
import { CarGallery } from '../../components/cars/CarGallery';
import { CarFeatures } from '../../components/cars/CarFeatures';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ReviewCard } from '../../components/reviews/ReviewCard';
import { formatPrice, formatRating, formatDistance_ } from '../../utils/formatters';
import { haversineDistance } from '../../utils/distance';
import { useLocation } from '../../hooks/useLocation';
import { useCartStore } from '../../store/cartStore';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function CarDetailScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'CarDetail'>>();
  const { coords } = useLocation();
  const { data: car, isLoading } = useCar(route.params.carId);
  const { data: reviews = [] } = useCarReviews(route.params.carId);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(route.params.carId));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const setCarId = useCartStore((s) => s.setCarId);

  if (isLoading || !car) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  const distance = haversineDistance(coords.latitude, coords.longitude, car.location.latitude, car.location.longitude);

  const handleBook = (): void => {
    setCarId(car.id);
    navigation.navigate('BookingFlow', { carId: car.id });
  };

  const handleShare = async (): Promise<void> => {
    try {
      await Share.share({
        message: `Découvre ce ${car.brand} ${car.model} sur KIRAAM : ${formatPrice(car.pricing.pricePerDay)}/jour ! kiraam://car/${car.id}`,
      });
    } catch {
      // Silencieux
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ position: 'relative' }}>
          <CarGallery photos={car.photos} onPhotoPress={(idx) => navigation.navigate('Gallery', { photos: car.photos, initialIndex: idx })} />
          <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
              <Pressable onPress={() => navigation.goBack()} style={iconBtn(theme)}>
                <ArrowLeft size={20} color="#000" />
              </Pressable>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Pressable onPress={handleShare} style={iconBtn(theme)}>
                  <Share2 size={20} color="#000" />
                </Pressable>
                <Pressable onPress={() => toggleFavorite(car.id)} style={iconBtn(theme)}>
                  <Heart size={20} color={isFavorite ? theme.colors.accent : '#000'} fill={isFavorite ? theme.colors.accent : 'transparent'} />
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '800' }}>
                {car.brand} {car.model}
              </Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 4 }}>
                {car.year} · {car.color} · {car.licensePlate}
              </Text>
            </View>
            {car.isVerified ? <Badge label="Vérifié ✓" variant="success" /> : null}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Star size={15} color="#F5A623" fill="#F5A623" />
              <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: '700' }}>{formatRating(car.rating)}</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>({car.reviewsCount} avis)</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MapPin size={14} color={theme.colors.textSecondary} />
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                {car.location.district} · {formatDistance_(distance)}
              </Text>
            </View>
          </View>

          {/* Spécifications */}
          <Text style={sectionTitle(theme)}>Spécifications</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <SpecItem icon={<Users size={16} color={theme.colors.primary} />} label={`${car.seats} places`} theme={theme} />
            <SpecItem icon={<Cog size={16} color={theme.colors.primary} />} label={car.transmission === 'automatic' ? 'Automatique' : 'Manuelle'} theme={theme} />
            <SpecItem icon={<Fuel size={16} color={theme.colors.primary} />} label={fuelLabel(car.fuel)} theme={theme} />
            {car.hasAC ? <SpecItem icon={<Snowflake size={16} color={theme.colors.primary} />} label="Clim" theme={theme} /> : null}
            {car.isFourWD ? <SpecItem icon={<Text style={{ color: theme.colors.secondary, fontWeight: '700' }}>4×4</Text>} label="" theme={theme} /> : null}
          </View>

          {/* Équipements */}
          <Text style={sectionTitle(theme)}>Équipements</Text>
          <CarFeatures featureIds={car.features} />

          {/* Description */}
          <Text style={sectionTitle(theme)}>Description</Text>
          <Text style={{ color: theme.colors.text, fontSize: 14, lineHeight: 21 }}>{car.description}</Text>

          {/* Propriétaire */}
          <Text style={sectionTitle(theme)}>Propriétaire</Text>
          <Pressable
            onPress={() => navigation.navigate('UserProfile', { userId: car.ownerId })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              padding: 14,
              backgroundColor: theme.colors.card,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Avatar uri={car.ownerAvatar} firstName={car.ownerName.split(' ')[0]} lastName={car.ownerName.split(' ')[1]} size={48} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '700' }}>{car.ownerName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <Badge label="Super-Host" variant="gold" size="sm" />
                <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>{car.rating.toFixed(1)} ★</Text>
              </View>
            </View>
            <MessageCircle size={22} color={theme.colors.primary} />
          </Pressable>

          {/* Tarification */}
          <Text style={sectionTitle(theme)}>Tarification</Text>
          <View style={{ backgroundColor: theme.colors.backgroundAlt, padding: 14, borderRadius: 14 }}>
            <PriceRow label="Prix par jour" value={formatPrice(car.pricing.pricePerDay)} theme={theme} bold />
            <PriceRow label="3+ jours" value="-10%" theme={theme} />
            <PriceRow label="7+ jours" value="-15%" theme={theme} />
            <PriceRow label="30+ jours" value="-25%" theme={theme} />
            <PriceRow label="Caution (remboursable)" value={formatPrice(car.pricing.deposit)} theme={theme} />
            <PriceRow label="Km inclus" value={`${car.pricing.kmIncludedPerDay} km/jour`} theme={theme} />
            <PriceRow label="Km supplémentaire" value={`${formatPrice(car.pricing.pricePerExtraKm)}/km`} theme={theme} />
          </View>

          {/* Politique */}
          <Text style={sectionTitle(theme)}>Règles & politique</Text>
          <View style={{ gap: 8 }}>
            <RuleLine icon={<Shield size={16} color={theme.colors.success} />} text="Assurance basique incluse" theme={theme} />
            <RuleLine icon={<Text>🚭</Text>} text="Non-fumeur" theme={theme} />
            <RuleLine icon={<Text>{car.rules.petsAllowed ? '🐶' : '🚫'}</Text>} text={car.rules.petsAllowed ? 'Animaux acceptés' : 'Pas d\'animaux'} theme={theme} />
            <RuleLine icon={<Text>🎂</Text>} text={`Âge minimum : ${car.rules.minAge} ans`} theme={theme} />
            <RuleLine icon={<Text>📅</Text>} text={`Permis depuis ${car.rules.minLicenseYears} an${car.rules.minLicenseYears > 1 ? 's' : ''} min`} theme={theme} />
            <RuleLine icon={<Text>↩️</Text>} text={`Annulation ${car.rules.cancellationPolicy === 'flexible' ? 'flexible' : car.rules.cancellationPolicy === 'moderate' ? 'modérée' : 'stricte'}`} theme={theme} />
          </View>

          {/* Avis */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 12 }}>
            <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: '700' }}>
              Avis ({car.reviewsCount})
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Star size={16} color="#F5A623" fill="#F5A623" />
              <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '700' }}>{formatRating(car.rating)}</Text>
            </View>
          </View>
          {reviews.slice(0, 3).map((r) => <ReviewCard key={r.id} review={r} />)}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Boutons sticky */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: theme.colors.card, borderTopWidth: 1, borderTopColor: theme.colors.border }}>
        <View style={{ flexDirection: 'row', padding: 16, gap: 10, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.colors.primary, fontSize: 22, fontWeight: '800' }}>
              {formatPrice(car.pricing.pricePerDay)}
            </Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>par jour</Text>
          </View>
          <Button label="Contacter" variant="outline" onPress={() => undefined} />
          <Button label="Réserver" onPress={handleBook} />
        </View>
      </SafeAreaView>
    </View>
  );
}

function iconBtn(theme: ReturnType<typeof useTheme>) {
  return {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...theme.shadows.sm,
  };
}

function sectionTitle(theme: ReturnType<typeof useTheme>) {
  return {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '700' as const,
    marginTop: 28,
    marginBottom: 12,
  };
}

function SpecItem({ icon, label, theme }: { icon: React.ReactNode; label: string; theme: ReturnType<typeof useTheme> }): React.ReactElement {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: theme.colors.backgroundAlt,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
      }}
    >
      {icon}
      {label ? <Text style={{ color: theme.colors.text, fontSize: 12, fontWeight: '500' }}>{label}</Text> : null}
    </View>
  );
}

function PriceRow({ label, value, theme, bold = false }: { label: string; value: string; theme: ReturnType<typeof useTheme>; bold?: boolean }): React.ReactElement {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 13, fontWeight: bold ? '700' : '400' }}>{label}</Text>
      <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: bold ? '700' : '500' }}>{value}</Text>
    </View>
  );
}

function RuleLine({ icon, text, theme }: { icon: React.ReactNode; text: string; theme: ReturnType<typeof useTheme> }): React.ReactElement {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <View style={{ width: 22 }}>{icon}</View>
      <Text style={{ color: theme.colors.text, fontSize: 13 }}>{text}</Text>
    </View>
  );
}

function fuelLabel(f: string): string {
  return f === 'petrol' ? 'Essence' : f === 'diesel' ? 'Diesel' : f === 'hybrid' ? 'Hybride' : 'Électrique';
}
