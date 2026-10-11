import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Car as CarIcon, Camera, Check, Upload } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/common/Header';
import { useAuthStore } from '../../store/authStore';

interface DocItem {
  id: 'idCard' | 'drivingLicense' | 'selfie';
  titleKey: string;
  descKey: string;
  icon: React.FC<{ size?: number; color?: string }>;
}

const DOCS: DocItem[] = [
  { id: 'idCard', titleKey: 'verification.idCard', descKey: 'verification.idCardDesc', icon: CreditCard },
  { id: 'drivingLicense', titleKey: 'verification.drivingLicense', descKey: 'verification.drivingLicenseDesc', icon: CarIcon },
  { id: 'selfie', titleKey: 'verification.selfie', descKey: 'verification.selfieDesc', icon: Camera },
];

export function VerificationScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const updateUser = useAuthStore((s) => s.updateUser);
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});

  const handleUpload = (id: string): void => {
    // Mock: simule un upload
    setUploaded((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = (): void => {
    if (Object.keys(uploaded).length < 3) {
      Alert.alert('Documents requis', 'Veuillez téléverser tous les documents');
      return;
    }
    updateUser({ verificationStatus: 'verified' });
    Alert.alert('Vérification', 'Documents envoyés. Vérification en cours.');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title={t('verification.title')} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginBottom: 24, lineHeight: 20 }}>
          {t('verification.subtitle')}
        </Text>

        {DOCS.map((doc) => {
          const Icon = doc.icon;
          const done = uploaded[doc.id];
          return (
            <Pressable
              key={doc.id}
              onPress={() => handleUpload(doc.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 14,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: done ? theme.colors.success : theme.colors.border,
                backgroundColor: theme.colors.card,
                marginBottom: 12,
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: done ? `${theme.colors.success}22` : `${theme.colors.primary}22`,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {done ? <Check size={20} color={theme.colors.success} /> : <Icon size={20} color={theme.colors.primary} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14 }}>{t(doc.titleKey)}</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{t(doc.descKey)}</Text>
              </View>
              <Upload size={20} color={done ? theme.colors.success : theme.colors.textSecondary} />
            </Pressable>
          );
        })}

        <Button label={t('verification.submit')} onPress={handleSubmit} fullWidth size="lg" style={{ marginTop: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
