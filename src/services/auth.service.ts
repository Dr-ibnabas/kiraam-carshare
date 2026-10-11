import { sleep, generateReferralCode, uid } from '../utils/helpers';
import { MOCK_USERS, CURRENT_USER } from '../constants/mockData';
import type { User, AuthCredentials, RegisterPayload } from '../types/user.types';

/**
 * Service d'authentification KIRAAM
 *
 * Mock fonctionnel basé sur MOCK_USERS.
 * En production, brancher Firebase Auth.
 */
export class AuthService {
  async loginWithEmail(creds: AuthCredentials): Promise<User> {
    await sleep(800);
    // Recherche par email — sinon démo user
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === creds.email.toLowerCase());
    return found ?? CURRENT_USER;
  }

  async loginWithPhone(phone: string): Promise<{ otpSent: boolean }> {
    await sleep(500);
    // En mock: toujours OTP envoyé. Code de démo: 123456
    return { otpSent: true };
  }

  async verifyOtp(phone: string, code: string): Promise<User> {
    await sleep(500);
    if (code !== '123456') {
      throw new Error('Code OTP invalide. Pour la démo: 123456');
    }
    const found = MOCK_USERS.find((u) => u.phone.includes(phone.slice(-8)));
    return found ?? CURRENT_USER;
  }

  async register(payload: RegisterPayload): Promise<User> {
    await sleep(900);
    const user: User = {
      id: uid('u'),
      email: payload.email,
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
      verificationStatus: 'unverified',
      isSuperHost: false,
      isTopRenter: false,
      rating: 0,
      reviewsCount: 0,
      loyaltyPoints: 0,
      loyaltyLevel: 'Sable',
      memberSince: new Date().toISOString().slice(0, 10),
      language: 'fr',
      city: 'Djibouti-ville',
      totalBookings: 0,
      referralCode: generateReferralCode(payload.firstName),
      documents: {},
    };
    return user;
  }

  async sendPasswordReset(email: string): Promise<{ sent: boolean }> {
    await sleep(700);
    return { sent: true };
  }

  async loginWithGoogle(): Promise<User> {
    await sleep(900);
    return CURRENT_USER;
  }

  async logout(): Promise<void> {
    await sleep(200);
  }
}

export const authService = new AuthService();
