import React from 'react';
import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MapPin, Bell, Search, Mic, ChevronDown, Gift } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../../hooks/useTheme';
import { useLocation } from '../../hooks/useLocation';
import { useFeaturedCars, useNearbyCars } from '../../hooks/useCars';
import { CategoryChips } from '../../components/common/CategoryChips';
import { CarCard } from '../../components/cars/CarCard';
import { CarCardHorizontal } from '../../components/cars/CarCardHorizontal';
import { Skeleton } from '../../components/ui/Skeleton';
import { Colors } from '../../constants/colors';
import { DJIBOUTI_EXCURSIONS } from '../../constants/djibouti';
import { MOCK_USERS } from '../../constants/mockData';
import { useFiltersStore } from '../../store/filtersStore';
import { formatRating } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

/**
 * HomeScreen — pixel-aligné sur le design Claude Design handoff.
 * Header "Votre position" + chevron, hero promo parrainage, catégories "Toutes",
 * carrousel "✨ Voitures en vedette", excursions, près de vous, super-hosts.
 */
export function HomeScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { coords, reverseGeo } = useLocation();
  const filters = useFiltersStore((s) => s.filters);
  const toggleCategory = useFiltersStore((s) => s.toggleCategory);
  const { data: featured = [], isLoading: loadingFeatured } = useFeaturedCars();
  const { data: nearby = [], isLoading: loadingNearby } = useNearbyCars(coords);
  const superHosts = MOCK_USERS.filter((u) => u.isSuperHost).slice(0, 4);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header — "Votre position" + chevron + bell */}
        <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 11, fontWeight: '600', color: theme.colors.textSecondary, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Votre position
            </Text>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <MapPin size={16} color={Colors.accent} />
              <Text style={{ fontSize: 15, fontWeight: '700', color: theme.colors.text }}>
                {reverseGeo?.district || 'Plateau du Serpent'}
              </Text>
              <ChevronDown size={14} color={theme.colors.textSecondary} />
            </Pressable>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Notifications')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              backgroundColor: theme.colors.card,
              borderWidth: 1,
              borderColor: theme.colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bell size={18} color={theme.colors.text} />
            <View
              style={{
                position: 'absolute',
                top: 8,
                right: 9,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: Colors.accent,
                borderWidth: 2,
                borderColor: theme.colors.background,
              }}
            />
          </Pressable>
        </View>

        {/* Search bar (52px, pressable, mène à Search) */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
          <Pressable
            onPress={() => navigation.getParent()?.navigate('Main', { screen: 'Search' })}
            style={{
              width: '100%',
              height: 52,
              paddingHorizontal: 16,
              backgroundColor: theme.colors.card,
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Search size={20} color={theme.colors.textSecondary} />
            <Text style={{ flex: 1, fontSize: 14, color: theme.colors.textSecondary }}>
              Marque, modèle, ville…
            </Text>
            <Mic size={18} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Hero promo parrainage */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <View
            style={{
              borderRadius: 22,
              padding: 18,
              backgroundColor: Colors.primary,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Text
              style={{
                position: 'absolute',
                right: -10,
                bottom: -30,
                fontSize: 130,
                opacity: 0.18,
              }}
            >
              🎁
            </Text>
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(255,255,255,0.22)',
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 0.4 }}>
                PARRAINAGE
              </Text>
            </View>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800', letterSpacing: -0.3, marginBottom: 4 }}>
              Gagnez 2 000 Fdj par ami
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.92)', fontSize: 13, marginBottom: 14, maxWidth: 240, lineHeight: 18 }}>
              Partagez votre code et recevez un crédit à chaque première location.
            </Text>
            <Pressable
              onPress={() => navigation.navigate('Referral')}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#fff',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 100,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Gift size={13} color={Colors.primaryDark} />
              <Text style={{ color: Colors.primaryDark, fontSize: 13, fontWeight: '700' }}>
                Inviter des amis →
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Categories */}
        <View style={{ paddingBottom: 22 }}>
          <CategoryChips selected={filters.categories} onToggle={toggleCategory} />
        </View>

        {/* ✨ Voitures en vedette */}
        <SectionTitle title="✨ Voitures en vedette" action="Tout voir" onAction={() => navigation.getParent()?.navigate('Main', { screen: 'Search' })} />
        {loadingFeatured ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {[1, 2].map((i) => <Skeleton key={i} width={260} height={280} borderRadius={20} />)}
          </ScrollView>
        ) : (
          <FlatList
            data={featured}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14, paddingBottom: 28 }}
            renderItem={({ item }) => (
              <CarCard car={item} onPress={() => navigation.navigate('CarDetail', { carId: item.id })} />
            )}
          />
        )}

        {/* 🏜️ Excursions */}
        <SectionTitle title="🏜️ Excursions populaires" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 28 }}>
          {DJIBOUTI_EXCURSIONS.map((exc) => (
            <Pressable
              key={exc.id}
              style={{
                width: 140,
                height: 170,
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image source={{ uri: exc.image }} style={{ position: 'absolute', width: '100%', height: '100%' }} contentFit="cover" />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}
              />
              <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12 }}>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800', marginBottom: 2 }}>
                  {exc.name}
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>
                  {exc.estimatedDuration} · {exc.requiresOffRoad ? '4x4 requis' : 'Plage'}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* 📍 Près de vous */}
        <SectionTitle title="📍 Près de vous" action="Voir carte" onAction={() => navigation.navigate('Map')} />
        <View style={{ paddingHorizontal: 20, paddingBottom: 28 }}>
          {loadingNearby
            ? [1, 2].map((i) => <Skeleton key={i} width="100%" height={104} borderRadius={18} style={{ marginBottom: 12 }} />)
            : nearby.slice(0, 4).map((car) => (
                <CarCardHorizontal key={car.id} car={car} onPress={() => navigation.navigate('CarDetail', { carId: car.id })} />
              ))}
        </View>

        {/* 🌟 Super-Hosts djiboutiens */}
        <SectionTitle title="🌟 Super-Hosts djiboutiens" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 24 }}>
          {superHosts.map((host) => (
            <Pressable
              key={host.id}
              onPress={() => navigation.navigate('UserProfile', { userId: host.id })}
              style={{
                width: 130,
                padding: 14,
                backgroundColor: theme.colors.card,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 18,
                alignItems: 'center',
              }}
            >
              <View style={{ width: 60, height: 60, position: 'relative', marginBottom: 10 }}>
                <Image
                  source={{ uri: host.avatar }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  contentFit="cover"
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: Colors.gold,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: theme.colors.card,
                  }}
                >
                  <Text style={{ fontSize: 11 }}>👑</Text>
                </View>
              </View>
              <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.text, marginBottom: 3 }}>
                {host.firstName}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Text style={{ color: Colors.gold, fontSize: 10 }}>★</Text>
                <Text style={{ color: Colors.gold, fontSize: 11, fontWeight: '600' }}>
                  {formatRating(host.rating)}
                </Text>
              </View>
              <Text style={{ fontSize: 10, color: theme.colors.textSecondary, marginTop: 3 }}>
                {host.totalBookings} locations
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}): React.ReactElement {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 20,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '800', color: theme.colors.text, letterSpacing: -0.3 }}>
        {title}
      </Text>
      {action && onAction ? (
        <Pressable onPress={onAction} hitSlop={10}>
          <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: '600' }}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
