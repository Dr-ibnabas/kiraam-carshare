import React, { useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../../hooks/useTheme';
import { useAllCars } from '../../hooks/useCars';
import { useLocation } from '../../hooks/useLocation';
import { Header } from '../../components/common/Header';
import { CarCardHorizontal } from '../../components/cars/CarCardHorizontal';
import { CarMapMarker } from '../../components/cars/CarMapMarker';
import { APP_CONFIG } from '../../constants/config';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// MapView est importé dynamiquement pour éviter de casser le build Web
let MapView: typeof import('react-native-maps').default | undefined;
let Marker: typeof import('react-native-maps').Marker | undefined;
if (Platform.OS !== 'web') {
  try {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
  } catch {
    // Map natif non disponible
  }
}

export function MapScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { coords } = useLocation();
  const { data: cars = [] } = useAllCars();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCar = cars.find((c) => c.id === selectedId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Carte" />
      <View style={{ flex: 1 }}>
        {MapView && Marker ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.08,
              longitudeDelta: 0.08,
            }}
          >
            {cars.map((car) => (
              <Marker
                key={car.id}
                coordinate={{ latitude: car.location.latitude, longitude: car.location.longitude }}
                onPress={() => setSelectedId(car.id)}
              >
                <CarMapMarker pricePerDay={car.pricing.pricePerDay} selected={selectedId === car.id} />
              </Marker>
            ))}
          </MapView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <Text style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
              La carte interactive n'est disponible que sur mobile.{'\n'}
              {cars.length} véhicules disponibles autour de Djibouti-ville
              {'\n\n'}
              Lat: {APP_CONFIG.defaultLocation.latitude.toFixed(4)} / Lon: {APP_CONFIG.defaultLocation.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        {selectedCar ? (
          <View style={{ position: 'absolute', left: 16, right: 16, bottom: 24 }}>
            <Pressable onPress={() => setSelectedId(null)} style={{ alignSelf: 'flex-end', marginBottom: 6 }}>
              <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>Fermer ✕</Text>
            </Pressable>
            <CarCardHorizontal car={selectedCar} onPress={() => navigation.navigate('CarDetail', { carId: selectedCar.id })} />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
