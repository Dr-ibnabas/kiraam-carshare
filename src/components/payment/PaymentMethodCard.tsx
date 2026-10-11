import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { CreditCard, Smartphone, Wallet, Check } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import type { PaymentMethod } from '../../types/booking.types';

interface Props {
  method: PaymentMethod;
  selected: boolean;
  onPress: () => void;
}

const META: Record<PaymentMethod, { label: string; desc: string; icon: React.FC<{ size?: number; color?: string }>; color: string }> = {
  card: { label: 'Carte bancaire', desc: 'Visa, Mastercard', icon: CreditCard, color: '#3B82F6' },
  dmoney: { label: 'D-Money', desc: 'Djibouti Telecom', icon: Smartphone, color: '#6AB2E7' },
  waafi: { label: 'Waafi', desc: 'Salaam African Bank', icon: Smartphone, color: '#12AD2B' },
  cash: { label: 'Espèces (acompte 20%)', desc: 'À la prise en charge', icon: Wallet, color: '#F5A623' },
};

export function PaymentMethodCard({ method, selected, onPress }: Props): React.ReactElement {
  const theme = useTheme();
  const meta = META[method];
  const Icon = meta.icon;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
        backgroundColor: selected ? `${theme.colors.primary}10` : theme.colors.card,
        marginBottom: 10,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: `${meta.color}22`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={22} color={meta.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: '700' }}>{meta.label}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>{meta.desc}</Text>
      </View>
      {selected ? (
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={14} color="#fff" />
        </View>
      ) : null}
    </Pressable>
  );
}
