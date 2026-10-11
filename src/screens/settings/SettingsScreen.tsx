import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Globe, Moon, Bell, Lock, CreditCard, FileText, MapPin, Shield,
  HelpCircle, Info, ChevronRight,
} from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function SettingsScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  const sections = [
    {
      title: 'Préférences',
      items: [
        { icon: Globe, label: 'Langue', screen: 'Language' as const },
        { icon: Moon, label: 'Thème', screen: 'Theme' as const },
        { icon: Bell, label: 'Notifications', screen: 'Notifications' as const },
      ],
    },
    {
      title: 'Sécurité',
      items: [
        { icon: Lock, label: 'Sécurité du compte', screen: 'Security' as const },
        { icon: CreditCard, label: 'Moyens de paiement', screen: 'PaymentMethods' as const },
        { icon: FileText, label: 'Mes documents', screen: 'Documents' as const },
      ],
    },
    {
      title: 'Confidentialité',
      items: [
        { icon: Shield, label: 'Confidentialité', screen: 'Privacy' as const },
      ],
    },
    {
      title: 'Aide & info',
      items: [
        { icon: HelpCircle, label: 'Aide & support', screen: 'Support' as const },
        { icon: Info, label: 'À propos', screen: 'About' as const },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Paramètres" />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {sections.map((section) => (
          <View key={section.title} style={{ marginTop: 16 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 6 }}>
              {section.title}
            </Text>
            <View style={{ backgroundColor: theme.colors.card, marginHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border }}>
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Pressable
                    key={item.label}
                    onPress={() => navigation.navigate(item.screen)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 14,
                      gap: 12,
                      borderBottomWidth: idx < section.items.length - 1 ? 1 : 0,
                      borderBottomColor: theme.colors.border,
                    }}
                  >
                    <Icon size={20} color={theme.colors.primary} />
                    <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '500', fontSize: 14 }}>{item.label}</Text>
                    <ChevronRight size={18} color={theme.colors.textSecondary} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
