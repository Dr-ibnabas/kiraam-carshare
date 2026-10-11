import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Smartphone } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function PaymentMethodsScreen(): React.ReactElement {
  const theme = useTheme();

  const methods = [
    { id: 1, icon: CreditCard, label: 'Visa •••• 4521', color: '#3B82F6' },
    { id: 2, icon: Smartphone, label: 'D-Money +253 77 12 34 56', color: '#6AB2E7' },
    { id: 3, icon: Smartphone, label: 'Waafi +253 77 98 76 54', color: '#12AD2B' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Moyens de paiement" />
      <View style={{ padding: 16, gap: 10 }}>
        {methods.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.id}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: `${m.color}22`, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={m.color} />
                </View>
                <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600' }}>{m.label}</Text>
              </View>
            </Card>
          );
        })}
        <Button label="+ Ajouter un moyen de paiement" variant="outline" onPress={() => undefined} fullWidth style={{ marginTop: 16 }} />
      </View>
    </SafeAreaView>
  );
}
