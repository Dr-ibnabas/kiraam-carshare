import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇩🇯' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
] as const;

export function LanguageScreen(): React.ReactElement {
  const theme = useTheme();
  const { i18n } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Langue" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {LANGUAGES.map((lang) => {
          const active = i18n.language === lang.code;
          return (
            <Pressable
              key={lang.code}
              onPress={() => i18n.changeLanguage(lang.code)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: active ? theme.colors.primary : theme.colors.border,
                backgroundColor: theme.colors.card,
                marginBottom: 8,
                gap: 12,
              }}
            >
              <Text style={{ fontSize: 28 }}>{lang.flag}</Text>
              <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600', fontSize: 15 }}>{lang.name}</Text>
              {active ? <Check size={20} color={theme.colors.primary} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
