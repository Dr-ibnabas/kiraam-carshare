import { useQuery } from '@tanstack/react-query';

import { fetchBookingById, fetchOwnerBookings, fetchUserBookings, fetchReviewsForCar } from '../api/bookings';

export function useUserBookings(userId: string | undefined) {
  return useQuery({
    queryKey: ['bookings', 'user', userId],
    queryFn: () => (userId ? fetchUserBookings(userId) : Promise.resolve([])),
    enabled: !!userId,
  });
}

export function useOwnerBookings(ownerId: string | undefined) {
  return useQuery({
    queryKey: ['bookings', 'owner', ownerId],
    queryFn: () => (ownerId ? fetchOwnerBookings(ownerId) : Promise.resolve([])),
    enabled: !!ownerId,
  });
}

export function useBooking(bookingId: string | undefined) {
  return useQuery({
    queryKey: ['bookings', 'byId', bookingId],
    queryFn: () => (bookingId ? fetchBookingById(bookingId) : Promise.resolve(null)),
    enabled: !!bookingId,
  });
}

export function useCarReviews(carId: string | undefined) {
  return useQuery({
    queryKey: ['reviews', 'car', carId],
    queryFn: () => (carId ? fetchReviewsForCar(carId) : Promise.resolve([])),
    enabled: !!carId,
  });
}
