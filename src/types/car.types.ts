export type CarCategory = 'suv' | 'city' | 'luxury' | 'family' | 'sedan' | 'hybrid' | 'pickup';
export type Transmission = 'automatic' | 'manual';
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type CancellationPolicy = 'flexible' | 'moderate' | 'strict';
export type CarStatus = 'active' | 'paused' | 'rented' | 'maintenance';

export interface CarFeature {
  id: string;
  label: string;
  icon: string;
}

export interface CarLocation {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  deliveryRadiusKm: number;
}

export interface CarPricing {
  pricePerDay: number; // Fdj
  deposit: number; // Fdj
  cleaningFee?: number; // Fdj
  kmIncludedPerDay: number;
  pricePerExtraKm: number; // Fdj
  deliveryFee?: number; // Fdj
}

export interface CarRules {
  smokingAllowed: boolean;
  petsAllowed: boolean;
  minAge: number;
  minLicenseYears: number;
  cancellationPolicy: CancellationPolicy;
  customRules?: string;
}

export interface Car {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin?: string;
  category: CarCategory;
  transmission: Transmission;
  fuel: FuelType;
  seats: number;
  doors: number;
  trunkLiters: number;
  hasAC: boolean;
  isFourWD: boolean;
  consumption?: number; // L/100km
  mileage: number; // km au compteur
  photos: string[];
  features: string[]; // ids des CarFeature
  description: string;
  location: CarLocation;
  pricing: CarPricing;
  rules: CarRules;
  rating: number;
  reviewsCount: number;
  totalBookings: number;
  status: CarStatus;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  isVerified: boolean;
  // Disponibilités: tableau de dates indisponibles ISO
  unavailableDates: string[];
}

export interface SearchFilters {
  query?: string;
  categories: CarCategory[];
  priceMin: number;
  priceMax: number;
  hasAC: boolean;
  isFourWD: boolean;
  transmission?: Transmission;
  fuel?: FuelType;
  yearMin?: number;
  yearMax?: number;
  features: string[];
  minRating: number;
  maxDistanceKm: number;
  hasDelivery: boolean;
  sortBy: 'price' | 'distance' | 'rating' | 'popularity';
  sortOrder: 'asc' | 'desc';
}
