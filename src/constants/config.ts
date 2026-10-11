/**
 * Configuration globale KIRAAM CARSHARE
 */

export const APP_CONFIG = {
  name: 'KIRAAM CARSHARE',
  slogan: 'Louez. Roulez. Partagez.',
  tagline: 'La location de voitures entre particuliers à Djibouti',
  version: '1.0.0',
  bundleId: 'dj.kiraam.carshare',

  // Localisation
  defaultLanguage: 'fr' as const,
  supportedLanguages: ['fr', 'ar', 'en'] as const,
  defaultCurrency: 'DJF' as const,
  currencySymbol: 'Fdj',
  exchangeRateUSD: 178, // 1 USD ≈ 178 DJF

  // Téléphone
  phonePrefix: '+253',
  phoneLength: 8,

  // Plaque immatriculation Djibouti format XX-XXXX-XX
  plateRegex: /^[A-Z]{2}-\d{4}-[A-Z]{2}$/,

  // Tarifs & commission
  serviceFeePct: 0.10, // 10%
  cashDepositPct: 0.20, // 20% acompte cash
  driverExtraDaily: 1500, // Fdj
  insurancePremiumDaily: 2000, // Fdj
  airportDeliveryFee: 2000, // Fdj
  defaultKmPerDay: 200,

  // Réductions par durée
  discountTiers: [
    { minDays: 3, discount: 0.10 },
    { minDays: 7, discount: 0.15 },
    { minDays: 30, discount: 0.25 },
  ],

  // Parrainage
  referralBonus: 2000, // Fdj
  referralPrefix: 'KIRAAM',

  // KIRAAM REWARDS — niveaux
  loyaltyLevels: [
    { name: 'Sable', minPoints: 0, discount: 0 },
    { name: 'Coraille', minPoints: 5000, discount: 0.03 },
    { name: 'Or', minPoints: 20000, discount: 0.07 },
    { name: 'Étoile', minPoints: 50000, discount: 0.12 },
  ],

  // Support
  supportEmail: 'support@kiraam.dj',
  emergencyPhone: '+253 77 00 00 00',
  supportWhatsApp: '+253 77 00 00 00',

  // URLs
  websiteUrl: 'https://kiraam.dj',
  termsUrl: 'https://kiraam.dj/cgu',
  privacyUrl: 'https://kiraam.dj/confidentialite',

  // Limites
  maxCarPhotos: 15,
  minCarPhotos: 5,
  maxBio: 500,
  maxMessageLength: 1000,

  // Géolocalisation par défaut (centre de Djibouti-ville)
  defaultLocation: {
    latitude: 11.5721,
    longitude: 43.1456,
  },
} as const;

export type SupportedLanguage = typeof APP_CONFIG.supportedLanguages[number];
