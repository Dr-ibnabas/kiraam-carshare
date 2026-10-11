import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { Avatar } from '../../components/ui/Avatar';
import { useOwnerBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';
import { formatDate, formatPrice } from '../../utils/formatters';
import { MOCK_BOOKINGS } from '../../constants/mockData';

export function OwnerRequestsScreen(): React.ReactElement {
  const theme = useTheme();
  const { user } = useAuth();
  // Démo: si l'utilisateur n'a pas de demandes, on montre celles de Hassan Idriss
  const ownerId = (user?.role === 'owner' || user?.role === 'both') ? user.id : 'u3';
  const { data } = useOwnerBookings(ownerId);
  const bookings = (data && data.length > 0) ? data : MOCK_BOOKINGS.filter((b) => b.status === 'pending' || b.status === 'confirmed');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Demandes" />
      {bookings.length === 0 ? (
        <EmptyState icon={<ClipboardList size={48} color={theme.colors.textSecondary} />} title="Aucune demande" />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Avatar uri={item.renterAvatar} firstName={item.renterName.split(' ')[0]} lastName={item.renterName.split(' ')[1]} size={44} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.text, fontWeight: '700' }}>{item.renterName}</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                    {item.carBrand} {item.carModel}
                  </Text>
                </View>
              </View>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                {formatDate(item.startDate)} → {formatDate(item.endDate)}
              </Text>
              <Text style={{ color: theme.colors.primary, fontWeight: '700', fontSize: 15, marginTop: 6 }}>
                {formatPrice(item.priceBreakdown.totalWithoutDeposit)}
              </Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <Button label="Refuser" variant="outline" onPress={() => undefined} style={{ flex: 1 }} />
                <Button label="Accepter" onPress={() => undefined} style={{ flex: 1 }} />
              </View>
            </Card>
          )}
        />
      )}
    </SafeAreaView>
  );
}
