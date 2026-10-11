import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Edit3, Shield, Heart, Gift, Award, Bell, Settings, Car as CarIcon,
  ChevronRight, HelpCircle, LogOut, Star,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { formatDate, formatRating } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ProfileScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { user, logout } = useAuth();
  const setRole = useAuthStore((s) => s.setRole);

  if (!user) return <SafeAreaView style={{ flex: 1 }} />;

  const isOwnerMode = user.role === 'owner' || user.role === 'both';

  const sections = [
    {
      title: 'Compte',
      items: [
        { icon: Edit3, label: t('profile.editProfile'), onPress: () => navigation.navigate('EditProfile') },
        { icon: Shield, label: t('profile.verification'), onPress: () => navigation.navigate('Verification') },
        { icon: Heart, label: t('profile.favorites'), onPress: () => navigation.navigate('Favorites') },
      ],
    },
    {
      title: 'KIRAAM',
      items: [
        { icon: Gift, label: t('profile.referral'), onPress: () => navigation.navigate('Referral'), badge: '+2 000 Fdj' },
        { icon: Award, label: t('profile.loyalty'), onPress: () => navigation.navigate('Loyalty'), badge: user.loyaltyLevel },
        { icon: Bell, label: t('profile.notifications'), onPress: () => navigation.navigate('Notifications') },
      ],
    },
    {
      title: 'Propriétaire',
      items: isOwnerMode ? [
        { icon: CarIcon, label: 'Tableau de bord', onPress: () => navigation.navigate('OwnerDashboard') },
        { icon: CarIcon, label: 'Mes véhicules', onPress: () => navigation.navigate('MyCars') },
      ] : [
        { icon: CarIcon, label: 'Devenir propriétaire', onPress: () => setRole('both') },
      ],
    },
    {
      title: 'Autre',
      items: [
        { icon: Settings, label: t('profile.settings'), onPress: () => navigation.navigate('Settings') },
        { icon: HelpCircle, label: 'Aide & support', onPress: () => navigation.navigate('Support') },
        { icon: LogOut, label: t('profile.logout'), onPress: logout, danger: true },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ alignItems: 'center', padding: 24 }}>
          <Avatar uri={user.avatar} firstName={user.firstName} lastName={user.lastName} size={92} />
          <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '800', marginTop: 12 }}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 4 }}>
            {t('profile.memberSince', { date: formatDate(user.memberSince, 'MMMM yyyy') })}
          </Text>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 10 }}>
            {user.verificationStatus === 'verified' ? <Badge label="Vérifié ✓" variant="success" size="sm" /> : null}
            {user.isSuperHost ? <Badge label="Super-Host" variant="gold" size="sm" /> : null}
            {user.isTopRenter ? <Badge label="Top-Locataire" variant="accent" size="sm" /> : null}
          </View>

          <View style={{ flexDirection: 'row', gap: 24, marginTop: 20 }}>
            <Stat value={String(user.totalBookings)} label="Locations" theme={theme} />
            <Stat value={`${formatRating(user.rating)} ★`} label={`${user.reviewsCount} avis`} theme={theme} />
            <Stat value={String(user.loyaltyPoints)} label="Points" theme={theme} />
          </View>
        </View>

        {sections.map((section) => (
          <View key={section.title} style={{ marginTop: 8 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 6 }}>
              {section.title}
            </Text>
            <View style={{ backgroundColor: theme.colors.card, marginHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border }}>
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Pressable
                    key={item.label}
                    onPress={item.onPress}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 14,
                      gap: 12,
                      borderBottomWidth: idx < section.items.length - 1 ? 1 : 0,
                      borderBottomColor: theme.colors.border,
                    }}
                  >
                    <Icon size={20} color={'danger' in item && item.danger ? theme.colors.error : theme.colors.primary} />
                    <Text style={{ flex: 1, color: 'danger' in item && item.danger ? theme.colors.error : theme.colors.text, fontWeight: '500', fontSize: 14 }}>
                      {item.label}
                    </Text>
                    {'badge' in item && item.badge ? (
                      <Badge label={item.badge} variant="gold" size="sm" />
                    ) : null}
                    <ChevronRight size={18} color={theme.colors.textSecondary} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <Text style={{ color: theme.colors.textSecondary, fontSize: 11, textAlign: 'center', marginTop: 24 }}>
          KIRAAM CARSHARE v1.0.0 • Made in Djibouti 🇩🇯
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ value, label, theme }: { value: string; label: string; theme: ReturnType<typeof useTheme> }): React.ReactElement {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '800' }}>{value}</Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 11, marginTop: 2 }}>{label}</Text>
    </View>
  );
}
