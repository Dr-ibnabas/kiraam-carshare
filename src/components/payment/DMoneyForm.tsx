import React from 'react';
import { View, Text } from 'react-native';
import { Smartphone } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Input } from '../ui/Input';

interface Props {
  phone: string;
  onChangePhone: (v: string) => void;
}

export function DMoneyForm({ phone, onChangePhone }: Props): React.ReactElement {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: `${theme.colors.primary}10`,
        borderRadius: 12,
        padding: 14,
        marginTop: 12,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 13, marginBottom: 10 }}>
        Vous recevrez un SMS pour valider votre paiement D-Money.
      </Text>
      <Input
        value={phone}
        onChangeText={onChangePhone}
        placeholder="+253 77 12 34 56"
        keyboardType="phone-pad"
        leftIcon={<Smartphone size={18} color={theme.colors.primary} />}
        label="Numéro D-Money"
      />
    </View>
  );
}
