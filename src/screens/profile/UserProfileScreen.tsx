import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Star, Calendar, MessageCircle } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CarCardHorizontal } from '../../components/cars/CarCardHorizontal';
import { MOCK_USERS, MOCK_CARS } from '../../constants/mockData';
import { formatDate, formatRating } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function UserProfileScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'UserProfile'>>();
  const user = MOCK_USERS.find((u) => u.id === route.params.userId);
  const userCars = MOCK_CARS.filter((c) => c.ownerId === route.params.userId);

  if (!user) return <SafeAreaView style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title={`${user.firstName} ${user.lastName}`} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Avatar uri={user.avatar} firstName={user.firstName} lastName={user.lastName} size={92} />
          <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '800', marginTop: 12 }}>
            {user.firstName} {user.lastName}
          </Text>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
            {user.verificationStatus === 'verified' ? <Badge label="Vérifié ✓" variant="success" size="sm" /> : null}
            {user.isSuperHost ? <Badge label="Super-Host" variant="gold" size="sm" /> : null}
          </View>
          {user.bio ? (
            <Text style={{ color: theme.colors.textSecondary, fontSize: 13, textAlign: 'center', marginTop: 12, lineHeight: 19 }}>
              {user.bio}
            </Text>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: theme.colors.card, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border }}>
          <Stat icon={<Star size={20} color="#F5A623" fill="#F5A623" />} value={formatRating(user.rating)} label={`${user.reviewsCount} avis`} theme={theme} />
          <Stat icon={<Calendar size={20} color={theme.colors.primary} />} value={String(user.totalBookings)} label="Locations" theme={theme} />
          <Stat icon={<Text style={{ fontSize: 20 }}>🏆</Text>} value={user.loyaltyLevel} label="Niveau" theme={theme} />
        </View>

        <Button
          label="Envoyer un message"
          variant="outline"
          leftIcon={<MessageCircle size={18} color={theme.colors.primary} />}
          onPress={() => undefined}
          fullWidth
          style={{ marginTop: 16 }}
        />

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 24, marginBottom: 12 }}>
          Membre depuis {formatDate(user.memberSince, 'MMMM yyyy')}
        </Text>

        {userCars.length > 0 ? (
          <>
            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 12, marginBottom: 12 }}>
              Véhicules ({userCars.length})
            </Text>
            <FlatList
              data={userCars}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <CarCardHorizontal car={item} onPress={() => navigation.navigate('CarDetail', { carId: item.id })} />
              )}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ icon, value, label, theme }: { icon: React.ReactNode; value: string; label: string; theme: ReturnType<typeof useTheme> }): React.ReactElement {
  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      {icon}
      <Text style={{ color: theme.colors.text, fontWeight: '800', fontSize: 16, marginTop: 4 }}>{value}</Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>{label}</Text>
    </View>
  );
}
