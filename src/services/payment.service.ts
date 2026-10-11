import { sleep, uid } from '../utils/helpers';
import { isValidDjiboutianPhone } from '../utils/validators';
import type { PaymentMethod } from '../types/booking.types';

export interface PaymentRequest {
  amount: number; // Fdj
  method: PaymentMethod;
  bookingId: string;
  // Détails spécifiques
  phone?: string; // pour D-Money / Waafi
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
  method: PaymentMethod;
}

/**
 * Service de paiement KIRAAM
 *
 * Mock fonctionnel — l'interface complète est prête.
 * En production, brancher l'API D-Money (Djibouti Telecom) et Waafi (Salaam African Bank).
 */
export class PaymentService {
  /**
   * Paiement via D-Money (Djibouti Telecom)
   * Numéro Djibouti Telecom commençant par 77 ou 21
   */
  async payWithDMoney(req: PaymentRequest): Promise<PaymentResult> {
    if (!req.phone || !isValidDjiboutianPhone(req.phone)) {
      return {
        success: false,
        message: 'Numéro D-Money invalide. Doit être un +253 valide.',
        method: 'dmoney',
      };
    }
    await sleep(1500); // simule appel API
    // Mock: succès systématique en démo
    return {
      success: true,
      transactionId: `DMONEY-${uid()}`,
      message: 'Paiement D-Money confirmé. Code de confirmation envoyé par SMS.',
      method: 'dmoney',
    };
  }

  /**
   * Paiement via Waafi (Salaam African Bank)
   */
  async payWithWaafi(req: PaymentRequest): Promise<PaymentResult> {
    if (!req.phone || !isValidDjiboutianPhone(req.phone)) {
      return {
        success: false,
        message: 'Numéro Waafi invalide. Doit être un +253 valide.',
        method: 'waafi',
      };
    }
    await sleep(1500);
    return {
      success: true,
      transactionId: `WAAFI-${uid()}`,
      message: 'Paiement Waafi confirmé via Salaam African Bank.',
      method: 'waafi',
    };
  }

  /**
   * Paiement par carte bancaire
   */
  async payWithCard(req: PaymentRequest): Promise<PaymentResult> {
    if (!req.cardNumber || req.cardNumber.replace(/\s/g, '').length < 13) {
      return {
        success: false,
        message: 'Numéro de carte invalide.',
        method: 'card',
      };
    }
    await sleep(1800);
    return {
      success: true,
      transactionId: `CARD-${uid()}`,
      message: 'Paiement par carte confirmé.',
      method: 'card',
    };
  }

  /**
   * Acompte 20% en cash, reste à la prise en charge
   */
  async payCash(req: PaymentRequest): Promise<PaymentResult> {
    await sleep(800);
    const depositAmount = Math.round(req.amount * 0.20);
    return {
      success: true,
      transactionId: `CASH-${uid()}`,
      message: `Acompte de ${depositAmount} Fdj enregistré. Solde à régler à la prise en charge.`,
      method: 'cash',
    };
  }

  /**
   * Dispatch principal
   */
  async pay(req: PaymentRequest): Promise<PaymentResult> {
    switch (req.method) {
      case 'dmoney':
        return this.payWithDMoney(req);
      case 'waafi':
        return this.payWithWaafi(req);
      case 'card':
        return this.payWithCard(req);
      case 'cash':
        return this.payCash(req);
      default:
        return { success: false, message: 'Méthode de paiement inconnue', method: req.method };
    }
  }
}

export const paymentService = new PaymentService();
