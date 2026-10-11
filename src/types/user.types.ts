export type UserRole = 'renter' | 'owner' | 'both';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type LoyaltyLevel = 'Sable' | 'Coraille' | 'Or' | 'Étoile';

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
  isSuperHost: boolean;
  isTopRenter: boolean;
  rating: number;
  reviewsCount: number;
  loyaltyPoints: number;
  loyaltyLevel: LoyaltyLevel;
  memberSince: string; // ISO date
  language: 'fr' | 'ar' | 'en';
  city: string;
  district?: string;
  totalBookings: number;
  totalEarnings?: number; // pour propriétaires (Fdj)
  referralCode: string;
  documents: {
    idCard?: { url: string; status: VerificationStatus };
    drivingLicense?: { url: string; status: VerificationStatus };
    selfie?: { url: string; status: VerificationStatus };
  };
}

export interface UserSession {
  token: string;
  userId: string;
  expiresAt: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}
