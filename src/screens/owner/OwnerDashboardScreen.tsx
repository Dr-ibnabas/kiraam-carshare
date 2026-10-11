import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, Car, ClipboardList, BarChart3, TrendingUp, Eye, Star, Percent } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/ui/Card';
import { useCarsByOwner } from '../../hooks/useCars';
import { useOwnerBookings } from '../../hooks/useBookings';
import { formatPrice, formatRating } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function OwnerDashboardScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();
  const { data: cars = [] } = useCarsByOwner(user?.id);
  const { data: bookings = [] } = useOwnerBookings(user?.id);

  const monthRevenue = bookings
    .filter((b) => b.status === 'completed' || b.status === 'in_progress')
    .reduce((sum, b) => sum + b.priceBreakdown.totalWithoutDeposit * 0.9, 0);

  const totalViews = cars.reduce((s, c) => s + c.totalBookings * 25, 0);
  const avgRating = cars.length > 0 ? cars.reduce((s, c) => s + c.rating, 0) / cars.length : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Tableau de bord" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <KPICard icon={<TrendingUp size={20} color={theme.colors.secondary} />} value={formatPrice(monthRevenue)} label="Revenus du mois" theme={theme} />
          <KPICard icon={<Percent size={20} color={theme.colors.primary} />} value="68%" label="Taux d'occupation" theme={theme} />
          <KPICard icon={<Eye size={20} color={theme.colors.accent} />} value={String(totalViews)} label="Vues" theme={theme} />
          <KPICard icon={<Star size={20} color="#F5A623" />} value={formatRating(avgRating)} label="Note moyenne" theme={theme} />
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
          <Pressable onPress={() => navigation.navigate('AddCar')} style={[actionBtn(theme), { backgroundColor: theme.colors.primary, flex: 1 }]}>
            <Plus size={20} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '700' }}>Ajouter</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('MyCars')} style={[actionBtn(theme), { flex: 1 }]}>
            <Car size={20} color={theme.colors.text} />
            <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Mes véhicules</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <Pressable onPress={() => navigation.navigate('OwnerRequests')} style={[actionBtn(theme), { flex: 1 }]}>
            <ClipboardList size={20} color={theme.colors.text} />
            <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Demandes</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Stats')} style={[actionBtn(theme), { flex: 1 }]}>
            <BarChart3 size={20} color={theme.colors.text} />
            <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Statistiques</Text>
          </Pressable>
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 24, marginBottom: 12 }}>
          Activité récente
        </Text>
        {bookings.slice(0, 3).map((b) => (
          <Card key={b.id} style={{ marginBottom: 10 }}>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{b.carBrand} {b.carModel}</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 }}>
              Loué à {b.renterName} · {formatPrice(b.priceBreakdown.totalWithoutDeposit)}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function KPICard({ icon, value, label, theme }: { icon: React.ReactNode; value: string; label: string; theme: ReturnType<typeof useTheme> }): React.ReactElement {
  return (
    <View
      style={{
        flex: 1,
        minWidth: '46%',
        backgroundColor: theme.colors.card,
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      {icon}
      <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '800', marginTop: 6 }}>{value}</Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 11, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

function actionBtn(theme: ReturnType<typeof useTheme>) {
  return {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    padding: 16,
    borderRadius: 14,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  };
}
