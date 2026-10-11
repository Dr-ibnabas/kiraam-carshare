import { APP_CONFIG } from '../constants/config';
import type { BookingPriceBreakdown } from '../types/booking.types';
import type { Car } from '../types/car.types';
import type { LoyaltyLevel } from '../types/user.types';

/**
 * Calcule le breakdown complet d'une réservation
 */
export function calculateBookingPrice(args: {
  car: Pick<Car, 'pricing'>;
  startDate: string;
  endDate: string;
  deliveryMode: 'pickup' | 'delivery' | 'airport';
  hasExtraDriver: boolean;
  hasPremiumInsurance: boolean;
}): BookingPriceBreakdown {
  const { car, startDate, endDate, deliveryMode, hasExtraDriver, hasPremiumInsurance } = args;
  const days = Math.max(1, daysBetween(startDate, endDate));
  const basePrice = days * car.pricing.pricePerDay;

  // Réduction selon durée
  let discountPct = 0;
  for (const tier of APP_CONFIG.discountTiers) {
    if (days >= tier.minDays) discountPct = tier.discount;
  }
  const discount = Math.round(basePrice * discountPct);
  const subtotalAfterDiscount = basePrice - discount;

  const deliveryFee = deliveryMode === 'delivery' ? (car.pricing.deliveryFee ?? 0) : 0;
  const airportFee = deliveryMode === 'airport' ? APP_CONFIG.airportDeliveryFee : 0;
  const extraDriverFee = hasExtraDriver ? days * APP_CONFIG.driverExtraDaily : 0;
  const insuranceFee = hasPremiumInsurance ? days * APP_CONFIG.insurancePremiumDaily : 0;
  const serviceFee = Math.round(subtotalAfterDiscount * APP_CONFIG.serviceFeePct);
  const deposit = car.pricing.deposit;

  const totalWithoutDeposit =
    subtotalAfterDiscount + deliveryFee + airportFee + extraDriverFee + insuranceFee + serviceFee;
  const total = totalWithoutDeposit + deposit;

  return {
    basePrice,
    days,
    discount,
    discountPct: Math.round(discountPct * 100),
    deliveryFee,
    airportFee,
    extraDriverFee,
    insuranceFee,
    serviceFee,
    deposit,
    total,
    totalWithoutDeposit,
  };
}

/**
 * Nombre de jours entre 2 dates (inclus le 1er jour)
 */
export function daysBetween(startISO: string, endISO: string): number {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Détermine le niveau de fidélité selon les points
 */
export function getLoyaltyLevel(points: number): LoyaltyLevel {
  const sorted = [...APP_CONFIG.loyaltyLevels].sort((a, b) => b.minPoints - a.minPoints);
  for (const level of sorted) {
    if (points >= level.minPoints) return level.name as LoyaltyLevel;
  }
  return 'Sable';
}

/**
 * Points restants pour le prochain niveau
 */
export function pointsToNextLevel(points: number): { next: LoyaltyLevel | null; remaining: number } {
  const sorted = [...APP_CONFIG.loyaltyLevels].sort((a, b) => a.minPoints - b.minPoints);
  for (const level of sorted) {
    if (points < level.minPoints) {
      return { next: level.name as LoyaltyLevel, remaining: level.minPoints - points };
    }
  }
  return { next: null, remaining: 0 };
}

/**
 * Génère un code de parrainage à partir du prénom
 */
export function generateReferralCode(firstName: string): string {
  const year = new Date().getFullYear();
  return `${APP_CONFIG.referralPrefix}-${firstName.toUpperCase()}${year}`;
}

/**
 * Génère un QR Code factice (texte simulé)
 */
export function generateQRCode(prefix: string = 'KIRAAM'): string {
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
}

/**
 * Délai (utilitaire pour mocks asynchrones)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Génère un ID unique simple
 */
export function uid(prefix: string = ''): string {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}
