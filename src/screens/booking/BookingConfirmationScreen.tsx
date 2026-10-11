import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Check, Download, Calendar as CalendarIcon } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useBooking } from '../../hooks/useBookings';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/common/Header';
import { formatDate, formatPrice } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function BookingConfirmationScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'BookingConfirmation'>>();
  const { data: booking } = useBooking(route.params.bookingId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="" showBack={false} />
      <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: theme.colors.success,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            marginTop: 12,
          }}
        >
          <Check size={56} color="#fff" strokeWidth={3} />
        </View>
        <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 8 }}>
          Réservation confirmée !
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 14, textAlign: 'center', marginBottom: 28 }}>
          Votre réservation a bien été enregistrée.{'\n'}Un e-mail de confirmation vous a été envoyé.
        </Text>

        {booking ? (
          <View
            style={{
              width: '100%',
              backgroundColor: theme.colors.card,
              padding: 20,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.colors.border,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginBottom: 6 }}>QR Code de prise en charge</Text>
            <View style={{ width: 180, height: 180, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', borderRadius: 12, marginBottom: 12 }}>
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>{booking.qrCode}</Text>
              <Text style={{ color: '#888', fontSize: 9, marginTop: 6 }}>QR factice (démo)</Text>
            </View>
            <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '700' }}>
              {booking.carBrand} {booking.carModel}
            </Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 4 }}>
              {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
            </Text>
            <Text style={{ color: theme.colors.primary, fontSize: 22, fontWeight: '800', marginTop: 12 }}>
              {formatPrice(booking.priceBreakdown.totalWithoutDeposit)}
            </Text>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 24, width: '100%' }}>
          <Button label="Télécharger" variant="outline" leftIcon={<Download size={16} color={theme.colors.primary} />} onPress={() => undefined} style={{ flex: 1 }} />
          <Button label="Calendrier" variant="outline" leftIcon={<CalendarIcon size={16} color={theme.colors.primary} />} onPress={() => undefined} style={{ flex: 1 }} />
        </View>

        <Button
          label="Voir ma réservation"
          onPress={() => {
            if (booking) navigation.replace('BookingDetail', { bookingId: booking.id });
          }}
          fullWidth
          size="lg"
          style={{ marginTop: 16 }}
        />
        <Button
          label="Retour à l'accueil"
          variant="ghost"
          onPress={() => navigation.popToTop()}
          fullWidth
          style={{ marginTop: 8 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
