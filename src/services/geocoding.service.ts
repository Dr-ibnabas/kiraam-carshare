import * as Location from 'expo-location';

import { DJIBOUTI_DISTRICTS, DJIBOUTI_CITIES } from '../constants/djibouti';
import { haversineDistance } from '../utils/distance';

export interface GeoCoords {
  latitude: number;
  longitude: number;
}

export interface ReverseGeoResult {
  city: string;
  district: string;
  address: string;
}

export class GeocodingService {
  async getCurrentLocation(): Promise<GeoCoords | null> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return null;
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
    } catch {
      return null;
    }
  }

  /**
   * Reverse-geocode local sur les districts djiboutiens
   * (sans appel API externe — distance minimale au plus proche district)
   */
  reverseGeocodeLocal(coords: GeoCoords): ReverseGeoResult {
    const sortedDistricts = DJIBOUTI_DISTRICTS
      .map((d) => ({
        ...d,
        distance: haversineDistance(coords.latitude, coords.longitude, d.latitude, d.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    const closestDistrict = sortedDistricts[0];
    const city = DJIBOUTI_CITIES.find((c) => c.id === closestDistrict.cityId);

    // Si on est trop loin des quartiers de Djibouti-ville, on attribue la ville la plus proche
    if (closestDistrict.distance > 5) {
      const closestCity = DJIBOUTI_CITIES
        .map((c) => ({ ...c, distance: haversineDistance(coords.latitude, coords.longitude, c.latitude, c.longitude) }))
        .sort((a, b) => a.distance - b.distance)[0];
      return {
        city: closestCity.name,
        district: '',
        address: closestCity.name,
      };
    }

    return {
      city: city?.name ?? 'Djibouti-ville',
      district: closestDistrict.name,
      address: `${closestDistrict.name}, ${city?.name ?? 'Djibouti-ville'}`,
    };
  }
}

export const geocodingService = new GeocodingService();
