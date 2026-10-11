import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/common/Header';
import { authService } from '../../services/auth.service';
import { formatPhone } from '../../utils/formatters';
import type { AuthStackParamList } from '../../types/navigation.types';

export function OTPScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AuthStackParamList, 'OTP'>>();
  const login = useAuthStore((s) => s.login);
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState<boolean>(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, idx: number): void => {
    const newCode = [...code];
    newCode[idx] = text.slice(-1);
    setCode(newCode);
    if (text && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleVerify = async (): Promise<void> => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Alert.alert('Erreur', 'Code à 6 chiffres requis');
      return;
    }
    setLoading(true);
    try {
      const user = await authService.verifyOtp(route.params.phone, fullCode);
      await login(user);
    } catch (e) {
      Alert.alert('Erreur', e instanceof Error ? e.message : 'Code invalide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title={t('auth.otpTitle')} />
      <View style={{ padding: 24, flex: 1 }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>{t('auth.otpTitle')}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginTop: 6, marginBottom: 32, lineHeight: 20 }}>
          {t('auth.otpSubtitle')} {formatPhone(route.params.phone)}
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 11, marginBottom: 16 }}>
          💡 Code de démo : <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>123456</Text>
        </Text>

        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(r) => {
                inputs.current[idx] = r;
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, idx)}
              keyboardType="number-pad"
              maxLength={1}
              style={{
                width: 48,
                height: 56,
                borderWidth: 1.5,
                borderColor: digit ? theme.colors.primary : theme.colors.border,
                borderRadius: 12,
                textAlign: 'center',
                fontSize: 22,
                fontWeight: '700',
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
              }}
            />
          ))}
        </View>

        <Button label={t('auth.verifyCode')} onPress={handleVerify} loading={loading} fullWidth size="lg" />

        <Pressable style={{ alignSelf: 'center', marginTop: 20 }}>
          <Text style={{ color: theme.colors.primary, fontSize: 14, fontWeight: '600' }}>
            {t('auth.resendCode')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
