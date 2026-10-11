import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Car, Key, Users, Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/common/Header';
import type { UserRole } from '../../types/user.types';

export function RoleSelectionScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const setRole = useAuthStore((s) => s.setRole);
  const [selected, setSelected] = useState<UserRole>('renter');

  const ROLES: { id: UserRole; titleKey: string; descKey: string; icon: React.FC<{ size?: number; color?: string }>; color: string }[] = [
    { id: 'renter', titleKey: 'auth.roleRenter', descKey: 'auth.roleRenterDesc', icon: Key, color: '#6AB2E7' },
    { id: 'owner', titleKey: 'auth.roleOwner', descKey: 'auth.roleOwnerDesc', icon: Car, color: '#12AD2B' },
    { id: 'both', titleKey: 'auth.roleBoth', descKey: 'auth.roleBothDesc', icon: Users, color: '#F5A623' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title="" />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '700', marginBottom: 24, textAlign: 'center' }}>
          {t('auth.roleSelection')}
        </Text>
        <View style={{ gap: 12 }}>
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selected === role.id;
            return (
              <Pressable
                key={role.id}
                onPress={() => setSelected(role.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                  backgroundColor: isSelected ? `${theme.colors.primary}10` : theme.colors.card,
                  gap: 14,
                }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: `${role.color}22`,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={26} color={role.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '700' }}>{t(role.titleKey)}</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 2 }}>{t(role.descKey)}</Text>
                </View>
                {isSelected ? (
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} color="#fff" />
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
        <View style={{ marginTop: 32 }}>
          <Button label={t('common.continue')} onPress={() => setRole(selected)} fullWidth size="lg" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
