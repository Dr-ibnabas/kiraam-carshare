import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { formatPrice } from '../../utils/formatters';
import type { BookingPriceBreakdown } from '../../types/booking.types';

interface Props {
  breakdown: BookingPriceBreakdown;
}

export function CarPriceBox({ breakdown }: Props): React.ReactElement {
  const theme = useTheme();

  const Line = ({ label, value, bold = false, accent = false }: { label: string; value: string; bold?: boolean; accent?: boolean }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
      <Text style={{ color: accent ? theme.colors.text : theme.colors.textSecondary, fontSize: bold ? 15 : 13, fontWeight: bold ? '700' : '400' }}>
        {label}
      </Text>
      <Text style={{ color: accent ? theme.colors.primary : theme.colors.text, fontSize: bold ? 15 : 13, fontWeight: bold ? '700' : '500' }}>
        {value}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: theme.colors.backgroundAlt,
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <Line label={`${formatPrice(breakdown.basePrice / breakdown.days)} × ${breakdown.days} jour${breakdown.days > 1 ? 's' : ''}`} value={formatPrice(breakdown.basePrice)} />
      {breakdown.discount > 0 ? (
        <Line label={`Réduction (-${breakdown.discountPct}%)`} value={`- ${formatPrice(breakdown.discount)}`} />
      ) : null}
      {breakdown.deliveryFee > 0 ? <Line label="Livraison" value={formatPrice(breakdown.deliveryFee)} /> : null}
      {breakdown.airportFee > 0 ? <Line label="Frais aéroport" value={formatPrice(breakdown.airportFee)} /> : null}
      {breakdown.extraDriverFee > 0 ? <Line label="Conducteur sup." value={formatPrice(breakdown.extraDriverFee)} /> : null}
      {breakdown.insuranceFee > 0 ? <Line label="Assurance Premium" value={formatPrice(breakdown.insuranceFee)} /> : null}
      <Line label="Frais de service (10%)" value={formatPrice(breakdown.serviceFee)} />
      <View style={{ height: 1, backgroundColor: theme.colors.border, marginVertical: 6 }} />
      <Line label="Sous-total" value={formatPrice(breakdown.totalWithoutDeposit)} bold accent />
      <Line label="Caution (remboursable)" value={formatPrice(breakdown.deposit)} />
      <View style={{ height: 1, backgroundColor: theme.colors.border, marginVertical: 6 }} />
      <Line label="Total à payer" value={formatPrice(breakdown.total)} bold accent />
    </View>
  );
}
