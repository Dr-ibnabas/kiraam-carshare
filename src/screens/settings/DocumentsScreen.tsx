import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Check } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function DocumentsScreen(): React.ReactElement {
  const theme = useTheme();
  const docs = [
    { name: 'CNI djiboutienne', verified: true },
    { name: 'Permis de conduire', verified: true },
    { name: 'Selfie', verified: true },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Mes documents" />
      <View style={{ padding: 16, gap: 10 }}>
        {docs.map((d, i) => (
          <Card key={i}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <FileText size={22} color={theme.colors.primary} />
              <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600' }}>{d.name}</Text>
              {d.verified ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Check size={16} color={theme.colors.success} />
                  <Text style={{ color: theme.colors.success, fontSize: 12, fontWeight: '600' }}>Vérifié</Text>
                </View>
              ) : null}
            </View>
          </Card>
        ))}
        <Button label="Mettre à jour mes documents" variant="outline" onPress={() => undefined} fullWidth style={{ marginTop: 16 }} />
      </View>
    </SafeAreaView>
  );
}
