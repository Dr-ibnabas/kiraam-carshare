import { useEffect, useState } from 'react';

import { APP_CONFIG } from '../constants/config';
import { geocodingService, type GeoCoords, type ReverseGeoResult } from '../services/geocoding.service';

interface UseLocationReturn {
  coords: GeoCoords;
  reverseGeo: ReverseGeoResult | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
}

const DEFAULT: GeoCoords = APP_CONFIG.defaultLocation;

export function useLocation(): UseLocationReturn {
  const [coords, setCoords] = useState<GeoCoords>(DEFAULT);
  const [reverseGeo, setReverseGeo] = useState<ReverseGeoResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await geocodingService.getCurrentLocation();
      if (result) {
        setCoords(result);
        setReverseGeo(geocodingService.reverseGeocodeLocal(result));
      } else {
        setError('Permission de localisation refusée');
        setReverseGeo(geocodingService.reverseGeocodeLocal(DEFAULT));
      }
    } catch {
      setError('Erreur de géolocalisation');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reverse-geo par défaut sur la position de Djibouti-ville
    setReverseGeo(geocodingService.reverseGeocodeLocal(DEFAULT));
  }, []);

  return { coords, reverseGeo, loading, error, requestLocation };
}
