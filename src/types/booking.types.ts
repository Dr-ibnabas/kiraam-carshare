export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export type PaymentMethod = 'card' | 'dmoney' | 'waafi' | 'cash';
export type PaymentStatus = 'pending' | 'paid' | 'partial' | 'refunded' | 'failed';
export type DeliveryMode = 'pickup' | 'delivery' | 'airport';

export interface BookingPriceBreakdown {
  basePrice: number; // jours * prix/jour
  days: number;
  discount: number;
  discountPct: number;
  deliveryFee: number;
  airportFee: number;
  extraDriverFee: number;
  insuranceFee: number;
  serviceFee: number; // 10%
  deposit: number;
  total: number; // total à payer (avec caution)
  totalWithoutDeposit: number;
}

export interface Booking {
  id: string;
  carId: string;
  carBrand: string;
  carModel: string;
  carYear: number;
  carPhoto: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  ownerPhone: string;
  renterId: string;
  renterName: string;
  renterAvatar?: string;
  startDate: string; // ISO
  endDate: string; // ISO
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  deliveryMode: DeliveryMode;
  deliveryAddress?: string;
  hasExtraDriver: boolean;
  hasPremiumInsurance: boolean;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  priceBreakdown: BookingPriceBreakdown;
  qrCode: string;
  notes?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
  // État des lieux
  inspectionPhotosBefore?: string[];
  inspectionPhotosAfter?: string[];
}

export interface Review {
  id: string;
  bookingId: string;
  carId: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar?: string;
  toUserId: string;
  rating: number; // 1-5
  cleanliness: number;
  communication: number;
  punctuality: number;
  accuracy: number;
  value: number;
  comment: string;
  photos: string[];
  reply?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  location?: { lat: number; lng: number };
  type: 'text' | 'image' | 'location' | 'voice' | 'system';
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[]; // ids
  participantsInfo: { id: string; name: string; avatar?: string }[];
  lastMessage?: Message;
  unreadCount: number;
  carId?: string;
  bookingId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'booking' | 'message' | 'payment' | 'reminder' | 'promo' | 'system';
  read: boolean;
  data?: Record<string, string>;
  createdAt: string;
}
