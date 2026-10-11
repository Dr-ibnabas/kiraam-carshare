import { useQuery } from '@tanstack/react-query';

import { fetchAllCars, fetchCarById, fetchFeaturedCars, fetchNearbyCars, fetchCarsByOwner, searchCars } from '../api/cars';
import type { SearchFilters } from '../types/car.types';

export function useAllCars() {
  return useQuery({
    queryKey: ['cars', 'all'],
    queryFn: fetchAllCars,
  });
}

export function useFeaturedCars() {
  return useQuery({
    queryKey: ['cars', 'featured'],
    queryFn: fetchFeaturedCars,
  });
}

export function useCar(carId: string | undefined) {
  return useQuery({
    queryKey: ['cars', 'byId', carId],
    queryFn: () => (carId ? fetchCarById(carId) : Promise.resolve(null)),
    enabled: !!carId,
  });
}

export function useNearbyCars(args: { latitude: number; longitude: number; maxDistanceKm?: number }) {
  return useQuery({
    queryKey: ['cars', 'nearby', args.latitude, args.longitude, args.maxDistanceKm],
    queryFn: () => fetchNearbyCars(args),
  });
}

export function useCarsByOwner(ownerId: string | undefined) {
  return useQuery({
    queryKey: ['cars', 'byOwner', ownerId],
    queryFn: () => (ownerId ? fetchCarsByOwner(ownerId) : Promise.resolve([])),
    enabled: !!ownerId,
  });
}

export function useSearchCars(filters: SearchFilters, userLocation?: { latitude: number; longitude: number }) {
  return useQuery({
    queryKey: ['cars', 'search', filters, userLocation],
    queryFn: () => searchCars(filters, userLocation),
  });
}
