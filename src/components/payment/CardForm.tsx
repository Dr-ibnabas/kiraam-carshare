import React from 'react';
import { View } from 'react-native';
import { CreditCard } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Input } from '../ui/Input';

interface Props {
  number: string;
  expiry: string;
  cvv: string;
  onChangeNumber: (v: string) => void;
  onChangeExpiry: (v: string) => void;
  onChangeCvv: (v: string) => void;
}

export function CardForm({ number, expiry, cvv, onChangeNumber, onChangeExpiry, onChangeCvv }: Props): React.ReactElement {
  const theme = useTheme();
  return (
    <View style={{ marginTop: 12 }}>
      <Input
        label="Numéro de carte"
        value={number}
        onChangeText={onChangeNumber}
        placeholder="1234 5678 9012 3456"
        keyboardType="number-pad"
        maxLength={19}
        leftIcon={<CreditCard size={18} color={theme.colors.primary} />}
      />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Input label="Expiration" value={expiry} onChangeText={onChangeExpiry} placeholder="MM/AA" maxLength={5} />
        </View>
        <View style={{ flex: 1 }}>
          <Input label="CVV" value={cvv} onChangeText={onChangeCvv} placeholder="123" keyboardType="number-pad" maxLength={4} secureTextEntry />
        </View>
      </View>
    </View>
  );
}
