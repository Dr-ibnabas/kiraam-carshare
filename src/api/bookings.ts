import { MOCK_BOOKINGS, MOCK_REVIEWS } from '../constants/mockData';
import { sleep, uid, generateQRCode } from '../utils/helpers';
import type { Booking, BookingStatus, Review } from '../types/booking.types';

// État local pour permettre des "créations" pendant la session
const bookingsCache: Booking[] = [...MOCK_BOOKINGS];

export async function fetchUserBookings(userId: string): Promise<Booking[]> {
  await sleep(250);
  return bookingsCache.filter((b) => b.renterId === userId);
}

export async function fetchOwnerBookings(ownerId: string): Promise<Booking[]> {
  await sleep(250);
  return bookingsCache.filter((b) => b.ownerId === ownerId);
}

export async function fetchBookingById(bookingId: string): Promise<Booking | null> {
  await sleep(150);
  return bookingsCache.find((b) => b.id === bookingId) ?? null;
}

export async function createBooking(
  data: Omit<Booking, 'id' | 'qrCode' | 'createdAt' | 'updatedAt'>,
): Promise<Booking> {
  await sleep(400);
  const now = new Date().toISOString();
  const booking: Booking = {
    ...data,
    id: uid('b'),
    qrCode: generateQRCode(),
    createdAt: now,
    updatedAt: now,
  };
  bookingsCache.unshift(booking);
  return booking;
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  reason?: string,
): Promise<Booking | null> {
  await sleep(250);
  const idx = bookingsCache.findIndex((b) => b.id === bookingId);
  if (idx === -1) return null;
  bookingsCache[idx] = {
    ...bookingsCache[idx],
    status,
    cancellationReason: reason,
    updatedAt: new Date().toISOString(),
  };
  return bookingsCache[idx];
}

export async function fetchReviewsForCar(carId: string): Promise<Review[]> {
  await sleep(200);
  return MOCK_REVIEWS.filter((r) => r.carId === carId);
}

export async function fetchReviewsForUser(userId: string): Promise<Review[]> {
  await sleep(200);
  return MOCK_REVIEWS.filter((r) => r.toUserId === userId);
}

export async function createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  await sleep(300);
  const newReview: Review = {
    ...review,
    id: uid('r'),
    createdAt: new Date().toISOString(),
  };
  return newReview;
}
