import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Calendar } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useUserBookings } from '../../hooks/useBookings';
import { BookingCard } from '../../components/bookings/BookingCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import type { BookingStatus } from '../../types/booking.types';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Tab = 'upcoming' | 'current' | 'past' | 'cancelled';

export function MyBookingsScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();
  const { data: bookings = [], isLoading } = useUserBookings(user?.id);
  const [tab, setTab] = useState<Tab>('upcoming');

  const TABS: { id: Tab; labelKey: string }[] = [
    { id: 'upcoming', labelKey: 'bookings.upcoming' },
    { id: 'current', labelKey: 'bookings.current' },
    { id: 'past', labelKey: 'bookings.past' },
    { id: 'cancelled', labelKey: 'bookings.cancelled' },
  ];

  const filteredBookings = useMemo(() => {
    const statusMap: Record<Tab, BookingStatus[]> = {
      upcoming: ['pending', 'confirmed'],
      current: ['in_progress'],
      past: ['completed'],
      cancelled: ['cancelled', 'rejected'],
    };
    return bookings.filter((b) => statusMap[tab].includes(b.status));
  }, [bookings, tab]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '800' }}>{t('bookings.title')}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingVertical: 12 }}>
        {TABS.map((tabItem) => (
          <Pressable
            key={tabItem.id}
            onPress={() => setTab(tabItem.id)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: tab === tabItem.id ? theme.colors.primary : theme.colors.backgroundAlt,
            }}
          >
            <Text style={{ color: tab === tabItem.id ? '#fff' : theme.colors.text, fontWeight: '600', fontSize: 13 }}>
              {t(tabItem.labelKey)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {isLoading ? (
        <View style={{ paddingHorizontal: 16, gap: 12 }}>
          {[1, 2].map((i) => <Skeleton key={i} width="100%" height={110} borderRadius={14} />)}
        </View>
      ) : filteredBookings.length === 0 ? (
        <EmptyState
          icon={<Calendar size={48} color={theme.colors.textSecondary} />}
          title={t(`bookings.no${tab.charAt(0).toUpperCase()}${tab.slice(1)}`)}
          subtitle="Explorez le catalogue et trouvez le véhicule idéal"
          actionLabel="Rechercher"
          onAction={() => navigation.getParent()?.navigate('Main', { screen: 'Search' })}
        />
      ) : (
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <BookingCard booking={item} onPress={() => navigation.navigate('BookingDetail', { bookingId: item.id })} />
          )}
        />
      )}
    </SafeAreaView>
  );
}
