import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { Calendar, MapPin, MessageCircle, Phone, AlertTriangle, X } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useBooking } from '../../hooks/useBookings';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { BookingStatusBadge } from '../../components/bookings/BookingStatusBadge';
import { BookingTimeline } from '../../components/bookings/BookingTimeline';
import { CarPriceBox } from '../../components/cars/CarPriceBox';
import { Avatar } from '../../components/ui/Avatar';
import { formatDate, formatPhone } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function BookingDetailScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'BookingDetail'>>();
  const { data: booking, isLoading } = useBooking(route.params.bookingId);

  if (isLoading || !booking) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Détails de la réservation" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
        <Card>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Image source={{ uri: booking.carPhoto }} style={{ width: 90, height: 90, borderRadius: 10 }} contentFit="cover" />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '700' }}>
                  {booking.carBrand} {booking.carModel}
                </Text>
                <BookingStatusBadge status={booking.status} />
              </View>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 }}>
                {booking.carYear}
              </Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 11, marginTop: 8 }}>Référence : {booking.qrCode}</Text>
            </View>
          </View>
        </Card>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 20, marginBottom: 12 }}>Période</Text>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Calendar size={16} color={theme.colors.primary} />
            <Text style={{ color: theme.colors.text, fontSize: 13 }}>
              {formatDate(booking.startDate)} ({booking.startTime})
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Calendar size={16} color={theme.colors.primary} />
            <Text style={{ color: theme.colors.text, fontSize: 13 }}>
              {formatDate(booking.endDate)} ({booking.endTime})
            </Text>
          </View>
          {booking.deliveryAddress ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <MapPin size={16} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.text, fontSize: 13 }}>{booking.deliveryAddress}</Text>
            </View>
          ) : null}
        </Card>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 20, marginBottom: 12 }}>Avancement</Text>
        <Card>
          <BookingTimeline status={booking.status} />
        </Card>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 20, marginBottom: 12 }}>Propriétaire</Text>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Avatar uri={booking.ownerAvatar} firstName={booking.ownerName.split(' ')[0]} lastName={booking.ownerName.split(' ')[1]} size={48} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14 }}>{booking.ownerName}</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{formatPhone(booking.ownerPhone)}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={iconBtn(theme)}>
                <Phone size={18} color={theme.colors.primary} />
              </View>
              <View style={iconBtn(theme)}>
                <MessageCircle size={18} color={theme.colors.primary} />
              </View>
            </View>
          </View>
        </Card>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 20, marginBottom: 12 }}>Récapitulatif</Text>
        <CarPriceBox breakdown={booking.priceBreakdown} />

        <View style={{ marginTop: 24, gap: 10 }}>
          <Button label="État des lieux" variant="outline" onPress={() => undefined} fullWidth />
          {booking.status === 'confirmed' || booking.status === 'in_progress' ? (
            <>
              <Button label="Signaler un problème" variant="outline" onPress={() => undefined} leftIcon={<AlertTriangle size={16} color={theme.colors.warning} />} fullWidth />
              <Button label="Annuler la réservation" variant="danger" leftIcon={<X size={16} color="#fff" />} onPress={() => undefined} fullWidth />
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function iconBtn(theme: ReturnType<typeof useTheme>) {
  return {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${theme.colors.primary}22`,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };
}
