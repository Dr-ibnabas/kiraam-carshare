import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, MessageCircle, CreditCard, Gift, Info } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_NOTIFICATIONS } from '../../constants/mockData';
import { formatRelativeDate } from '../../utils/formatters';
import type { AppNotification } from '../../types/booking.types';

type FilterType = 'all' | 'booking' | 'message' | 'promo';

const ICONS: Record<AppNotification['type'], React.FC<{ size?: number; color?: string }>> = {
  booking: Calendar,
  message: MessageCircle,
  payment: CreditCard,
  promo: Gift,
  reminder: Bell,
  system: Info,
};

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'booking', label: 'Réservations' },
  { id: 'message', label: 'Messages' },
  { id: 'promo', label: 'Promos' },
];

export function NotificationsScreen(): React.ReactElement {
  const theme = useTheme();
  const [filter, setFilter] = useState<FilterType>('all');
  const filtered = filter === 'all' ? MOCK_NOTIFICATIONS : MOCK_NOTIFICATIONS.filter((n) => n.type === filter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Notifications" rightAction={<Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Tout lu</Text>} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingVertical: 12 }}>
        {FILTERS.map((f) => (
          <Pressable
            key={f.id}
            onPress={() => setFilter(f.id)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: filter === f.id ? theme.colors.primary : theme.colors.backgroundAlt,
            }}
          >
            <Text style={{ color: filter === f.id ? '#fff' : theme.colors.text, fontWeight: '600', fontSize: 12 }}>{f.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {filtered.length === 0 ? (
        <EmptyState icon={<Bell size={48} color={theme.colors.textSecondary} />} title="Pas de notifications" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.border, marginVertical: 4 }} />}
          renderItem={({ item }) => {
            const Icon = ICONS[item.type];
            return (
              <View style={{ flexDirection: 'row', gap: 12, paddingVertical: 14, alignItems: 'center', opacity: item.read ? 0.7 : 1 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: `${theme.colors.primary}22`, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={theme.colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14 }}>{item.title}</Text>
                    {!item.read ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.accent }} /> : null}
                  </View>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 }}>{item.body}</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 10, marginTop: 4 }}>{formatRelativeDate(item.createdAt)}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
