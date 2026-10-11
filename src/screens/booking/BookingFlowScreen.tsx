import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Switch, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDays } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useCar } from '../../hooks/useCars';
import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../store/cartStore';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { FilterChip } from '../../components/filters/FilterChip';
import { CarPriceBox } from '../../components/cars/CarPriceBox';
import { PaymentMethodCard } from '../../components/payment/PaymentMethodCard';
import { DMoneyForm } from '../../components/payment/DMoneyForm';
import { WaafiForm } from '../../components/payment/WaafiForm';
import { CardForm } from '../../components/payment/CardForm';
import { calculateBookingPrice } from '../../utils/helpers';
import { paymentService } from '../../services/payment.service';
import { createBooking } from '../../api/bookings';
import { formatDate } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';
import type { PaymentMethod, DeliveryMode } from '../../types/booking.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function BookingFlowScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'BookingFlow'>>();
  const { user } = useAuth();
  const { data: car } = useCar(route.params.carId);

  const cart = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paying, setPaying] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);
  const [dmoneyPhone, setDmoneyPhone] = useState<string>(user?.phone ?? '');
  const [waafiPhone, setWaafiPhone] = useState<string>(user?.phone ?? '');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 2);
  const start = cart.startDate ?? today.toISOString().slice(0, 10);
  const end = cart.endDate ?? tomorrow.toISOString().slice(0, 10);

  React.useEffect(() => {
    if (!cart.startDate) cart.setDates(start, end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breakdown = useMemo(() => {
    if (!car) return null;
    return calculateBookingPrice({
      car,
      startDate: start,
      endDate: end,
      deliveryMode: cart.deliveryMode,
      hasExtraDriver: cart.hasExtraDriver,
      hasPremiumInsurance: cart.hasPremiumInsurance,
    });
  }, [car, start, end, cart.deliveryMode, cart.hasExtraDriver, cart.hasPremiumInsurance]);

  if (!car || !breakdown || !user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Header title="Réservation" />
      </SafeAreaView>
    );
  }

  const handleDateChange = (type: 'start' | 'end', event: { type?: string }, date?: Date): void => {
    if (Platform.OS === 'android') setShowPicker(null);
    if (event.type === 'dismissed' || !date) return;
    const iso = date.toISOString().slice(0, 10);
    if (type === 'start') cart.setDates(iso, end);
    else cart.setDates(start, iso);
  };

  const handlePay = async (): Promise<void> => {
    if (!cart.paymentMethod) {
      Alert.alert('Erreur', 'Veuillez choisir un mode de paiement');
      return;
    }
    setPaying(true);
    try {
      const result = await paymentService.pay({
        amount: breakdown.totalWithoutDeposit,
        method: cart.paymentMethod,
        bookingId: 'pending',
        phone: cart.paymentMethod === 'dmoney' ? dmoneyPhone : cart.paymentMethod === 'waafi' ? waafiPhone : undefined,
        cardNumber: cart.paymentMethod === 'card' ? cardNumber : undefined,
        cardExpiry: cart.paymentMethod === 'card' ? cardExpiry : undefined,
        cardCVV: cart.paymentMethod === 'card' ? cardCvv : undefined,
      });

      if (!result.success) {
        Alert.alert('Échec du paiement', result.message);
        return;
      }

      const booking = await createBooking({
        carId: car.id, carBrand: car.brand, carModel: car.model, carYear: car.year,
        carPhoto: car.photos[0], ownerId: car.ownerId, ownerName: car.ownerName,
        ownerAvatar: car.ownerAvatar, ownerPhone: '+25377000000',
        renterId: user.id, renterName: `${user.firstName} ${user.lastName}`, renterAvatar: user.avatar,
        startDate: start, endDate: end, startTime: cart.startTime, endTime: cart.endTime,
        deliveryMode: cart.deliveryMode, deliveryAddress: cart.deliveryAddress,
        hasExtraDriver: cart.hasExtraDriver, hasPremiumInsurance: cart.hasPremiumInsurance,
        paymentMethod: cart.paymentMethod, paymentStatus: 'paid',
        status: 'confirmed', priceBreakdown: breakdown,
      });

      cart.reset();
      navigation.replace('BookingConfirmation', { bookingId: booking.id });
    } finally {
      setPaying(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title={`Réserver — étape ${step}/3`} />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {step === 1 ? (
          <>
            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginBottom: 12 }}>Dates de location</Text>
            <Card>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <CalendarDays size={18} color={theme.colors.primary} />
                  <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Prise en charge</Text>
                </View>
                <Text style={{ color: theme.colors.primary, fontWeight: '700' }} onPress={() => setShowPicker('start')}>
                  {formatDate(start)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <CalendarDays size={18} color={theme.colors.primary} />
                  <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Retour</Text>
                </View>
                <Text style={{ color: theme.colors.primary, fontWeight: '700' }} onPress={() => setShowPicker('end')}>
                  {formatDate(end)}
                </Text>
              </View>
            </Card>

            {showPicker ? (
              <DateTimePicker
                value={new Date(showPicker === 'start' ? start : end)}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(e, d) => handleDateChange(showPicker, e, d)}
                minimumDate={new Date()}
              />
            ) : null}

            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 24, marginBottom: 12 }}>Mode de prise en charge</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {(['pickup', 'delivery', 'airport'] as DeliveryMode[]).map((m) => (
                <FilterChip
                  key={m}
                  label={m === 'pickup' ? 'Chez le proprio' : m === 'delivery' ? 'Livraison' : 'Aéroport'}
                  active={cart.deliveryMode === m}
                  onPress={() => cart.setDeliveryMode(m)}
                />
              ))}
            </View>
            {cart.deliveryMode === 'delivery' ? (
              <Input
                label="Adresse de livraison"
                value={cart.deliveryAddress}
                onChangeText={cart.setDeliveryAddress}
                placeholder="Hôtel, quartier, rue…"
                containerStyle={{ marginTop: 12 }}
              />
            ) : null}

            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 24, marginBottom: 12 }}>Options</Text>
            <Card>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 14 }}>Conducteur supplémentaire</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>+1 500 Fdj/jour</Text>
                </View>
                <Switch value={cart.hasExtraDriver} onValueChange={cart.setExtraDriver} trackColor={{ true: theme.colors.primary }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 14 }}>Assurance Premium</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>+2 000 Fdj/j — franchise réduite, vol</Text>
                </View>
                <Switch value={cart.hasPremiumInsurance} onValueChange={cart.setPremiumInsurance} trackColor={{ true: theme.colors.primary }} />
              </View>
            </Card>
          </>
        ) : step === 2 ? (
          <>
            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginBottom: 12 }}>Récapitulatif</Text>
            <CarPriceBox breakdown={breakdown} />
          </>
        ) : (
          <>
            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginBottom: 12 }}>Mode de paiement</Text>
            {(['dmoney', 'waafi', 'card', 'cash'] as PaymentMethod[]).map((m) => (
              <PaymentMethodCard
                key={m}
                method={m}
                selected={cart.paymentMethod === m}
                onPress={() => cart.setPaymentMethod(m)}
              />
            ))}
            {cart.paymentMethod === 'dmoney' ? <DMoneyForm phone={dmoneyPhone} onChangePhone={setDmoneyPhone} /> : null}
            {cart.paymentMethod === 'waafi' ? <WaafiForm phone={waafiPhone} onChangePhone={setWaafiPhone} /> : null}
            {cart.paymentMethod === 'card' ? (
              <CardForm
                number={cardNumber}
                expiry={cardExpiry}
                cvv={cardCvv}
                onChangeNumber={setCardNumber}
                onChangeExpiry={setCardExpiry}
                onChangeCvv={setCardCvv}
              />
            ) : null}
          </>
        )}
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={{ backgroundColor: theme.colors.card, borderTopWidth: 1, borderTopColor: theme.colors.border }}>
        <View style={{ flexDirection: 'row', padding: 16, gap: 10, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>Total estimé</Text>
            <Text style={{ color: theme.colors.primary, fontSize: 18, fontWeight: '800' }}>
              {breakdown.totalWithoutDeposit.toLocaleString('fr-FR')} Fdj
            </Text>
          </View>
          {step > 1 ? <Button label="Précédent" variant="outline" onPress={() => setStep((s) => (s === 3 ? 2 : 1) as 1 | 2 | 3)} /> : null}
          {step < 3 ? (
            <Button label="Suivant" onPress={() => setStep((s) => (s + 1) as 2 | 3)} />
          ) : (
            <Button label="Payer" onPress={handlePay} loading={paying} />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}
