import { format, formatDistance, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

import { APP_CONFIG } from '../constants/config';

/**
 * Formate un prix en Franc Djiboutien (Fdj)
 * @example formatPrice(35000) // "35 000 Fdj"
 */
export function formatPrice(amount: number, withSymbol: boolean = true): string {
  const formatted = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
  return withSymbol ? `${formatted} ${APP_CONFIG.currencySymbol}` : formatted;
}

/**
 * Convertit Fdj → USD (taux indicatif 178)
 */
export function djfToUsd(djf: number): number {
  return djf / APP_CONFIG.exchangeRateUSD;
}

/**
 * Formate une date ISO en format court FR
 * @example formatDate('2026-05-23') // "23 mai 2026"
 */
export function formatDate(isoDate: string, formatStr: string = 'd MMM yyyy'): string {
  try {
    return format(parseISO(isoDate), formatStr, { locale: fr });
  } catch {
    return isoDate;
  }
}

/**
 * Date courte sans année — pour calendrier
 */
export function formatDateShort(isoDate: string): string {
  return formatDate(isoDate, 'd MMM');
}

/**
 * Date relative ("il y a 3 jours")
 */
export function formatRelativeDate(isoDate: string): string {
  try {
    return formatDistance(parseISO(isoDate), new Date(), { addSuffix: true, locale: fr });
  } catch {
    return isoDate;
  }
}

/**
 * Heure HH:mm depuis ISO
 */
export function formatTime(isoDate: string): string {
  try {
    return format(parseISO(isoDate), 'HH:mm', { locale: fr });
  } catch {
    return '';
  }
}

/**
 * Formate un numéro de téléphone djiboutien
 * @example formatPhone('77123456') // "+253 77 12 34 56"
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const withoutPrefix = cleaned.startsWith('253') ? cleaned.slice(3) : cleaned;
  if (withoutPrefix.length !== 8) return phone;
  return `+253 ${withoutPrefix.slice(0, 2)} ${withoutPrefix.slice(2, 4)} ${withoutPrefix.slice(4, 6)} ${withoutPrefix.slice(6, 8)}`;
}

/**
 * Formate une plaque djiboutienne XX-XXXX-XX
 */
export function formatLicensePlate(plate: string): string {
  return plate.toUpperCase();
}

/**
 * Tronque un texte
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

/**
 * Distance en km, formattée
 */
export function formatDistance_(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

/**
 * Renvoie les initiales d'un nom
 */
export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName?.charAt(0).toUpperCase() ?? '';
  return `${first}${last}`;
}

/**
 * Capitalise la première lettre
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Note formatée (4.85 → "4,9")
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}
