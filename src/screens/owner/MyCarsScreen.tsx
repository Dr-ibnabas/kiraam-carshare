import React from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, Car as CarIcon } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { CarCardHorizontal } from '../../components/cars/CarCardHorizontal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { useCarsByOwner } from '../../hooks/useCars';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function MyCarsScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();
  // Pour la démo : on prend Hassan Idriss qui a plusieurs véhicules
  const ownerId = (user?.role === 'owner' || user?.role === 'both') ? user.id : 'u3';
  const { data: cars = [] } = useCarsByOwner(ownerId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header
        title="Mes véhicules"
        rightAction={
          <Button label="+" onPress={() => navigation.navigate('AddCar')} size="sm" />
        }
      />
      {cars.length === 0 ? (
        <EmptyState
          icon={<CarIcon size={48} color={theme.colors.textSecondary} />}
          title="Aucun véhicule"
          subtitle="Ajoutez votre 1er véhicule pour commencer"
          actionLabel="Ajouter un véhicule"
          onAction={() => navigation.navigate('AddCar')}
        />
      ) : (
        <FlatList
          data={cars}
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
