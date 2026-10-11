/**
 * Données géographiques de la République de Djibouti 🇩🇯
 */

export interface City {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface District {
  id: string;
  name: string;
  cityId: string;
  latitude: number;
  longitude: number;
}

export interface Excursion {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  requiresOffRoad: boolean;
  estimatedDuration: string;
  image: string;
}

export const DJIBOUTI_CITIES: City[] = [
  { id: 'djibouti', name: 'Djibouti-ville', region: 'Djibouti', latitude: 11.5721, longitude: 43.1456 },
  { id: 'ali-sabieh', name: 'Ali Sabieh', region: 'Ali Sabieh', latitude: 11.1531, longitude: 42.7128 },
  { id: 'tadjourah', name: 'Tadjourah', region: 'Tadjourah', latitude: 11.7869, longitude: 42.8843 },
  { id: 'obock', name: 'Obock', region: 'Obock', latitude: 11.9697, longitude: 43.2944 },
  { id: 'dikhil', name: 'Dikhil', region: 'Dikhil', latitude: 11.1075, longitude: 42.3704 },
  { id: 'arta', name: 'Arta', region: 'Arta', latitude: 11.5258, longitude: 42.8478 },
];

export const DJIBOUTI_DISTRICTS: District[] = [
  { id: 'plateau-serpent', name: 'Plateau du Serpent', cityId: 'djibouti', latitude: 11.5945, longitude: 43.1463 },
  { id: 'heron', name: 'Héron', cityId: 'djibouti', latitude: 11.5871, longitude: 43.1395 },
  { id: 'haramous', name: 'Haramous', cityId: 'djibouti', latitude: 11.5538, longitude: 43.1657 },
  { id: 'balbala', name: 'Balbala', cityId: 'djibouti', latitude: 11.5278, longitude: 43.0944 },
  { id: 'gabode', name: 'Gabode', cityId: 'djibouti', latitude: 11.5614, longitude: 43.1227 },
  { id: 'pk12', name: 'PK12', cityId: 'djibouti', latitude: 11.5023, longitude: 43.0556 },
  { id: 'quartier-7', name: 'Quartier 7', cityId: 'djibouti', latitude: 11.5825, longitude: 43.1421 },
  { id: 'quartier-1', name: 'Quartier 1', cityId: 'djibouti', latitude: 11.5996, longitude: 43.1469 },
  { id: 'quartier-2', name: 'Quartier 2', cityId: 'djibouti', latitude: 11.5962, longitude: 43.1428 },
  { id: 'quartier-3', name: 'Quartier 3', cityId: 'djibouti', latitude: 11.5919, longitude: 43.1399 },
  { id: 'quartier-4', name: 'Quartier 4', cityId: 'djibouti', latitude: 11.5872, longitude: 43.1457 },
  { id: 'quartier-5', name: 'Quartier 5', cityId: 'djibouti', latitude: 11.5828, longitude: 43.1495 },
];

export const DJIBOUTI_EXCURSIONS: Excursion[] = [
  {
    id: 'lac-assal',
    name: 'Lac Assal',
    description: 'Le point le plus bas d\'Afrique (-155m), lac salé spectaculaire',
    latitude: 11.6541,
    longitude: 42.4060,
    requiresOffRoad: true,
    estimatedDuration: '1 journée',
    image: 'https://images.unsplash.com/photo-1547149350-bc6dc4c842e6?w=800',
  },
  {
    id: 'lac-abbe',
    name: 'Lac Abbé',
    description: 'Paysage lunaire avec cheminées calcaires et flamants roses',
    latitude: 11.1153,
    longitude: 41.7892,
    requiresOffRoad: true,
    estimatedDuration: '2 jours',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
  },
  {
    id: 'foret-day',
    name: 'Forêt du Day',
    description: 'Forêt primaire sur les monts Goda, oasis de fraîcheur',
    latitude: 11.7833,
    longitude: 42.6500,
    requiresOffRoad: true,
    estimatedDuration: '1 journée',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
  },
  {
    id: 'khor-ambado',
    name: 'Plage de Khor Ambado',
    description: 'Plage paradisiaque à 15 km de Djibouti-ville',
    latitude: 11.5503,
    longitude: 43.0631,
    requiresOffRoad: false,
    estimatedDuration: 'Demi-journée',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  },
  {
    id: 'plage-sables-blancs',
    name: 'Plages des Sables Blancs',
    description: 'Plages immaculées près de Tadjourah',
    latitude: 11.7869,
    longitude: 42.8843,
    requiresOffRoad: false,
    estimatedDuration: '1 journée',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
  },
  {
    id: 'arta-beach',
    name: 'Arta Beach',
    description: 'Plage rocheuse, requins-baleines en saison',
    latitude: 11.5258,
    longitude: 42.8478,
    requiresOffRoad: false,
    estimatedDuration: 'Demi-journée',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800',
  },
];

// Prénoms djiboutiens fréquents (pour mocks réalistes)
export const DJIBOUTIAN_FIRST_NAMES = [
  'Ahmed', 'Hassan', 'Mohamed', 'Abdou', 'Ali', 'Said', 'Ismail', 'Youssouf', 'Omar', 'Ibrahim',
  'Fatouma', 'Aïcha', 'Halima', 'Khadija', 'Hawa', 'Amina', 'Zeinab', 'Mariam', 'Asma', 'Saida',
];

export const DJIBOUTIAN_LAST_NAMES = [
  'Houssein', 'Robleh', 'Idriss', 'Farah', 'Abdi', 'Mahamoud', 'Bouh', 'Waberi', 'Egueh', 'Aden',
  'Guelleh', 'Bourhan', 'Awad', 'Kayad', 'Souleiman', 'Ismael', 'Daoud', 'Ahmed', 'Ali', 'Hassan',
];

// Types de routes à Djibouti
export type RoadType = 'urban' | 'desert' | 'mountain' | 'coastal';
