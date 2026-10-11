import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Mail } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/common/Header';
import { authService } from '../../services/auth.service';

export function ForgotPasswordScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async (): Promise<void> => {
    if (!email) {
      Alert.alert('Erreur', 'E-mail requis');
      return;
    }
    setLoading(true);
    try {
      await authService.sendPasswordReset(email);
      Alert.alert('Envoyé', 'Lien de réinitialisation envoyé', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title={t('auth.forgotTitle')} />
      <View style={{ padding: 24, flex: 1 }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>{t('auth.forgotTitle')}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginTop: 6, marginBottom: 24 }}>
          {t('auth.forgotSubtitle')}
        </Text>
        <Input
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          placeholder="vous@exemple.dj"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Mail size={18} color={theme.colors.textSecondary} />}
        />
        <Button label={t('auth.sendResetLink')} onPress={handleSend} loading={loading} fullWidth size="lg" />
      </View>
    </SafeAreaView>
  );
}
