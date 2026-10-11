import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Calendar, Clock } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { formatDateShort, formatPrice } from '../../utils/formatters';
import { BookingStatusBadge } from './BookingStatusBadge';
import type { Booking } from '../../types/booking.types';

interface Props {
  booking: Booking;
  onPress: () => void;
}

export function BookingCard({ booking, onPress }: Props): React.ReactElement {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 12,
        ...theme.shadows.sm,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Image source={{ uri: booking.carPhoto }} style={{ width: 88, height: 88, borderRadius: 10 }} contentFit="cover" />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '700' }} numberOfLines={1}>
                {booking.carBrand} {booking.carModel}
              </Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                {booking.carYear} · {booking.ownerName}
              </Text>
            </View>
            <BookingStatusBadge status={booking.status} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
            <Calendar size={12} color={theme.colors.textSecondary} />
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>
              {formatDateShort(booking.startDate)} → {formatDateShort(booking.endDate)}
            </Text>
            <Clock size={12} color={theme.colors.textSecondary} style={{ marginLeft: 8 }} />
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>
              {booking.startTime}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>
              {booking.priceBreakdown.days} jour{booking.priceBreakdown.days > 1 ? 's' : ''}
            </Text>
            <Text style={{ color: theme.colors.primary, fontSize: 14, fontWeight: '700' }}>
              {formatPrice(booking.priceBreakdown.totalWithoutDeposit)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
