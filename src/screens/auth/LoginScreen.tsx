import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Mail, Lock, Phone } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { authService } from '../../services/auth.service';
import type { AuthStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState<string>('aicha.farah@kiraam.dj');
  const [password, setPassword] = useState<string>('demo1234');
  const [phone, setPhone] = useState<string>('');
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const user = await authService.loginWithEmail({ email, password });
      await login(user);
    } catch {
      Alert.alert('Erreur', 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (): Promise<void> => {
    if (phone.length < 8) {
      Alert.alert('Erreur', 'Numéro invalide');
      return;
    }
    setLoading(true);
    try {
      await authService.loginWithPhone(phone);
      navigation.navigate('OTP', { phone });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      const user = await authService.loginWithGoogle();
      await login(user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 24 }} keyboardShouldPersistTaps="handled">
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: theme.colors.primary, fontSize: 38, fontWeight: '900', letterSpacing: -1 }}>
              KIRAAM
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '700', marginTop: 24 }}>
              {t('auth.loginTitle')}
            </Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginTop: 4 }}>
              {t('auth.loginSubtitle')}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', backgroundColor: theme.colors.backgroundAlt, borderRadius: 12, padding: 4, marginBottom: 20 }}>
            {(['email', 'phone'] as const).map((m) => (
              <Pressable
                key={m}
                onPress={() => setMode(m)}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: mode === m ? theme.colors.card : 'transparent',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: mode === m ? theme.colors.text : theme.colors.textSecondary, fontWeight: '600', fontSize: 13 }}>
                  {m === 'email' ? t('auth.loginWithEmail') : t('auth.loginWithPhone')}
                </Text>
              </Pressable>
            ))}
          </View>

          {mode === 'email' ? (
            <>
              <Input
                label={t('auth.email')}
                value={email}
                onChangeText={setEmail}
                placeholder="vous@exemple.dj"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Mail size={18} color={theme.colors.textSecondary} />}
              />
              <Input
                label={t('auth.password')}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                isPassword
                leftIcon={<Lock size={18} color={theme.colors.textSecondary} />}
              />
              <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-end', marginBottom: 16 }}>
                <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: '600' }}>
                  {t('auth.forgotPassword')}
                </Text>
              </Pressable>
              <Button label={t('auth.login')} onPress={handleEmailLogin} loading={loading} fullWidth size="lg" />
            </>
          ) : (
            <>
              <Input
                label={t('auth.phone')}
                value={phone}
                onChangeText={setPhone}
                placeholder="77 12 34 56"
                keyboardType="phone-pad"
                leftIcon={
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Phone size={18} color={theme.colors.textSecondary} />
                    <Text style={{ color: theme.colors.text, fontWeight: '600' }}>+253</Text>
                  </View>
                }
              />
              <Button label={t('auth.verifyCode')} onPress={handlePhoneLogin} loading={loading} fullWidth size="lg" />
            </>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginHorizontal: 12 }}>OU</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
          </View>

          <Button
            label={t('auth.loginWithGoogle')}
            variant="outline"
            onPress={handleGoogle}
            loading={loading}
            fullWidth
            size="lg"
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 6 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{t('auth.noAccount')}</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: theme.colors.primary, fontWeight: '700', fontSize: 14 }}>
                {t('auth.createAccount')}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
