import React from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Heart } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { CarCardHorizontal } from '../../components/cars/CarCardHorizontal';
import { EmptyState } from '../../components/ui/EmptyState';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useAllCars } from '../../hooks/useCars';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const favoriteIds = useFavoritesStore((s) => s.carIds);
  const { data: cars = [] } = useAllCars();
  const favorites = cars.filter((c) => favoriteIds.includes(c.id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Favoris" />
      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart size={48} color={theme.colors.textSecondary} />}
          title="Aucun favori"
          subtitle="Touchez ♥ sur un véhicule pour l'ajouter ici"
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <CarCardHorizontal car={item} onPress={() => navigation.navigate('CarDetail', { carId: item.id })} />
          )}
        />
      )}
    </SafeAreaView>
  );
}
