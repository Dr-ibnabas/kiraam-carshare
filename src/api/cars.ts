import { MOCK_CARS } from '../constants/mockData';
import { sleep } from '../utils/helpers';
import { haversineDistance } from '../utils/distance';
import type { Car, SearchFilters } from '../types/car.types';

/**
 * Récupère toutes les voitures
 */
export async function fetchAllCars(): Promise<Car[]> {
  await sleep(300);
  return MOCK_CARS;
}

/**
 * Voitures en vedette
 */
export async function fetchFeaturedCars(): Promise<Car[]> {
  await sleep(200);
  return MOCK_CARS.filter((c) => c.isFeatured);
}

/**
 * Récupère une voiture par ID
 */
export async function fetchCarById(carId: string): Promise<Car | null> {
  await sleep(200);
  return MOCK_CARS.find((c) => c.id === carId) ?? null;
}

/**
 * Voitures par propriétaire
 */
export async function fetchCarsByOwner(ownerId: string): Promise<Car[]> {
  await sleep(200);
  return MOCK_CARS.filter((c) => c.ownerId === ownerId);
}

/**
 * Voitures proches d'une position
 */
export async function fetchNearbyCars(args: {
  latitude: number;
  longitude: number;
  maxDistanceKm?: number;
}): Promise<Array<Car & { distanceKm: number }>> {
  const { latitude, longitude, maxDistanceKm = 50 } = args;
  await sleep(300);
  return MOCK_CARS
    .map((car) => ({
      ...car,
      distanceKm: haversineDistance(latitude, longitude, car.location.latitude, car.location.longitude),
    }))
    .filter((c) => c.distanceKm <= maxDistanceKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/**
 * Recherche avec filtres
 */
export async function searchCars(
  filters: SearchFilters,
  userLocation?: { latitude: number; longitude: number },
): Promise<Array<Car & { distanceKm?: number }>> {
  await sleep(250);
  let results: Array<Car & { distanceKm?: number }> = MOCK_CARS.map((car) => {
    if (userLocation) {
      return {
        ...car,
        distanceKm: haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          car.location.latitude,
          car.location.longitude,
        ),
      };
    }
    return { ...car };
  });

  // Recherche full-text
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (c) =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.location.city.toLowerCase().includes(q) ||
        c.location.district.toLowerCase().includes(q),
    );
  }

  // Catégorie
  if (filters.categories.length > 0) {
    results = results.filter((c) => filters.categories.includes(c.category));
  }

  // Prix
  results = results.filter(
    (c) => c.pricing.pricePerDay >= filters.priceMin && c.pricing.pricePerDay <= filters.priceMax,
  );

  // AC obligatoire
  if (filters.hasAC) results = results.filter((c) => c.hasAC);

  // 4x4
  if (filters.isFourWD) results = results.filter((c) => c.isFourWD);

  // Transmission
  if (filters.transmission) results = results.filter((c) => c.transmission === filters.transmission);

  // Carburant
  if (filters.fuel) results = results.filter((c) => c.fuel === filters.fuel);

  // Année
  if (filters.yearMin) results = results.filter((c) => c.year >= filters.yearMin!);
  if (filters.yearMax) results = results.filter((c) => c.year <= filters.yearMax!);

  // Équipements
  if (filters.features.length > 0) {
    results = results.filter((c) => filters.features.every((f) => c.features.includes(f)));
  }

  // Note minimale
  if (filters.minRating > 0) results = results.filter((c) => c.rating >= filters.minRating);

  // Distance
  if (userLocation) {
    results = results.filter((c) => (c.distanceKm ?? 0) <= filters.maxDistanceKm);
  }

  // Livraison
  if (filters.hasDelivery) results = results.filter((c) => (c.pricing.deliveryFee ?? 0) > 0);

  // Tri
  results.sort((a, b) => {
    const factor = filters.sortOrder === 'asc' ? 1 : -1;
    switch (filters.sortBy) {
      case 'price':
        return (a.pricing.pricePerDay - b.pricing.pricePerDay) * factor;
      case 'distance':
        return ((a.distanceKm ?? 0) - (b.distanceKm ?? 0)) * factor;
      case 'rating':
        return (a.rating - b.rating) * -factor; // toujours best first
      case 'popularity':
      default:
        return (a.totalBookings - b.totalBookings) * -factor;
    }
  });

  return results;
}
