import { create } from 'zustand';

import type { DeliveryMode, PaymentMethod } from '../types/booking.types';

/**
 * Store temporaire de la réservation en cours
 * (cart au sens "panier de réservation")
 */
interface CartState {
  carId: string | null;
  startDate: string | null;
  endDate: string | null;
  startTime: string;
  endTime: string;
  deliveryMode: DeliveryMode;
  deliveryAddress: string;
  hasExtraDriver: boolean;
  hasPremiumInsurance: boolean;
  paymentMethod: PaymentMethod | null;
  setCarId: (id: string) => void;
  setDates: (start: string, end: string) => void;
  setTimes: (start: string, end: string) => void;
  setDeliveryMode: (m: DeliveryMode) => void;
  setDeliveryAddress: (addr: string) => void;
  setExtraDriver: (v: boolean) => void;
  setPremiumInsurance: (v: boolean) => void;
  setPaymentMethod: (m: PaymentMethod) => void;
  reset: () => void;
}

const initial = {
  carId: null,
  startDate: null,
  endDate: null,
  startTime: '09:00',
  endTime: '18:00',
  deliveryMode: 'pickup' as DeliveryMode,
  deliveryAddress: '',
  hasExtraDriver: false,
  hasPremiumInsurance: false,
  paymentMethod: null,
};

export const useCartStore = create<CartState>((set) => ({
  ...initial,
  setCarId: (id) => set({ carId: id }),
  setDates: (startDate, endDate) => set({ startDate, endDate }),
  setTimes: (startTime, endTime) => set({ startTime, endTime }),
  setDeliveryMode: (deliveryMode) => set({ deliveryMode }),
  setDeliveryAddress: (deliveryAddress) => set({ deliveryAddress }),
  setExtraDriver: (hasExtraDriver) => set({ hasExtraDriver }),
  setPremiumInsurance: (hasPremiumInsurance) => set({ hasPremiumInsurance }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  reset: () => set(initial),
}));
