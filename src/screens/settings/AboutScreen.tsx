import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Car } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/ui/Button';
import { APP_CONFIG } from '../../constants/config';

export function AboutScreen(): React.ReactElement {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="À propos" />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={{ alignItems: 'center', marginVertical: 24 }}>
          <View style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: `${theme.colors.primary}22`, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Car size={42} color={theme.colors.primary} />
          </View>
          <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '800' }}>{APP_CONFIG.name}</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 4 }}>v{APP_CONFIG.version}</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 12, textAlign: 'center' }}>
            « {APP_CONFIG.slogan} »
          </Text>
        </View>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center', marginBottom: 24 }}>
          KIRAAM CARSHARE est la 1ʳᵉ plateforme de location de voitures entre particuliers à Djibouti.
          Fait avec ❤️ depuis Djibouti-ville 🇩🇯
        </Text>
        <Button label="Conditions Générales" variant="outline" onPress={() => undefined} fullWidth style={{ marginBottom: 8 }} />
        <Button label="Politique de confidentialité" variant="outline" onPress={() => undefined} fullWidth style={{ marginBottom: 8 }} />
        <Button label="Mentions légales" variant="outline" onPress={() => undefined} fullWidth />

        <Text style={{ color: theme.colors.textSecondary, fontSize: 11, textAlign: 'center', marginTop: 32 }}>
          © 2026 KIRAAM CARSHARE. Tous droits réservés.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
