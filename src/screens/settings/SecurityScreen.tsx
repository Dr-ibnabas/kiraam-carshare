import React from 'react';
import { View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export function SecurityScreen(): React.ReactElement {
  const theme = useTheme();
  const [twoFA, setTwoFA] = React.useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Sécurité" />
      <View style={{ padding: 16, gap: 12 }}>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Authentification 2FA</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>Code par SMS à chaque connexion</Text>
            </View>
            <Switch value={twoFA} onValueChange={setTwoFA} trackColor={{ true: theme.colors.primary }} />
          </View>
        </Card>
        <Button label="Changer mon mot de passe" variant="outline" onPress={() => undefined} fullWidth />
        <Button label="Sessions actives" variant="outline" onPress={() => undefined} fullWidth />
      </View>
    </SafeAreaView>
  );
}
