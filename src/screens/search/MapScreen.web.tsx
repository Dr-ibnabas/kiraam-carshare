import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapPin } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useAllCars } from '../../hooks/useCars';
import { Header } from '../../components/common/Header';
import { CarCardHorizontal } from '../../components/cars/CarCardHorizontal';
import { formatPrice } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

/**
 * Version Web de MapScreen.
 * react-native-maps ne supporte pas le web → on affiche une liste avec carte simulée.
 */
export function MapScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { data: cars = [] } = useAllCars();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCar = cars.find((c) => c.id === selectedId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Carte (Web)" />

      <View
        style={{
          height: 320,
          backgroundColor: '#E8F1FA',
          backgroundImage: 'linear-gradient(135deg, #cfe6f9 0%, #a3d2f0 100%)' as unknown as undefined,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          position: 'relative',
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: '600', marginBottom: 6 }}>
          🗺️ Djibouti-ville
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 11, textAlign: 'center' }}>
          {cars.length} véhicules disponibles{'\n'}
          (Carte interactive native uniquement sur mobile)
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: 16, maxWidth: 360 }}>
          {cars.slice(0, 10).map((car) => (
            <Pressable
              key={car.id}
              onPress={() => setSelectedId(car.id)}
              style={{
                backgroundColor: selectedId === car.id ? theme.colors.accent : theme.colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 14,
                borderWidth: 2,
                borderColor: '#fff',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>
                {formatPrice(car.pricing.pricePerDay)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        {selectedCar ? (
          <>
            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginBottom: 10 }}>
              Véhicule sélectionné
            </Text>
            <CarCardHorizontal car={selectedCar} onPress={() => navigation.navigate('CarDetail', { carId: selectedCar.id })} />
          </>
        ) : (
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <MapPin size={32} color={theme.colors.textSecondary} />
            <Text style={{ color: theme.colors.textSecondary, marginTop: 8, fontSize: 13 }}>
              Cliquez sur un prix pour voir le véhicule
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
