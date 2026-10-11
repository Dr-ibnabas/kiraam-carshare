import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/common/Header';
import { authService } from '../../services/auth.service';
import type { AuthStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export function RegisterScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const login = useAuthStore((s) => s.login);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (): Promise<void> => {
    if (!firstName || !lastName || !email || !phone || password.length < 6) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    try {
      const user = await authService.register({
        firstName, lastName, email,
        phone: `+253${phone.replace(/\D/g, '')}`,
        password,
        role: 'renter',
      });
      await login(user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title={t('auth.createAccount')} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
          <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>
            {t('auth.registerTitle')}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginTop: 4, marginBottom: 24 }}>
            {t('auth.registerSubtitle')}
          </Text>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Input label={t('auth.firstName')} value={firstName} onChangeText={setFirstName} placeholder="Ahmed" />
            </View>
            <View style={{ flex: 1 }}>
              <Input label={t('auth.lastName')} value={lastName} onChangeText={setLastName} placeholder="Houssein" />
            </View>
          </View>

          <Input
            label={t('auth.email')}
            value={email}
            onChangeText={setEmail}
            placeholder="vous@exemple.dj"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label={t('auth.phone')}
            value={phone}
            onChangeText={setPhone}
            placeholder="77 12 34 56"
            keyboardType="phone-pad"
            leftIcon={<Text style={{ color: theme.colors.text, fontWeight: '600' }}>+253</Text>}
          />

          <Input
            label={t('auth.password')}
            value={password}
            onChangeText={setPassword}
            placeholder="6 caractères minimum"
            isPassword
          />

          <Input
            label={t('auth.confirmPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="•••••••"
            isPassword
          />

          <Text style={{ color: theme.colors.textSecondary, fontSize: 11, marginVertical: 16, lineHeight: 16 }}>
            {t('auth.termsAgree')}{' '}
            <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>{t('auth.terms')}</Text>{' '}
            {t('auth.and')}{' '}
            <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>{t('auth.privacy')}</Text>.
          </Text>

          <Button label={t('auth.register')} onPress={handleRegister} loading={loading} fullWidth size="lg" />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 6 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{t('auth.alreadyAccount')}</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{ color: theme.colors.primary, fontWeight: '700', fontSize: 14 }}>{t('auth.signIn')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
