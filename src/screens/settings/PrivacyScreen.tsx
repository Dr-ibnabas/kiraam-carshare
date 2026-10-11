import React from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/ui/Button';

export function PrivacyScreen(): React.ReactElement {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Confidentialité" />
      <View style={{ padding: 16, gap: 10 }}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginBottom: 12, lineHeight: 20 }}>
          Vos données sont protégées par la loi djiboutienne sur la protection des données personnelles.
        </Text>
        <Button label="Exporter mes données" variant="outline" onPress={() => undefined} fullWidth />
        <Button label="Politique de confidentialité" variant="outline" onPress={() => undefined} fullWidth />
        <Button
          label="Supprimer mon compte"
          variant="danger"
          onPress={() => Alert.alert('Supprimer', 'Êtes-vous sûr ? Action irréversible.')}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}
