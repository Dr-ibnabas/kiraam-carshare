import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award, Check } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/ui/Card';
import { pointsToNextLevel } from '../../utils/helpers';
import { APP_CONFIG } from '../../constants/config';

export function LoyaltyScreen(): React.ReactElement {
  const theme = useTheme();
  const { user } = useAuth();
  if (!user) return <SafeAreaView style={{ flex: 1 }} />;

  const { next, remaining } = pointsToNextLevel(user.loyaltyPoints);
  const benefits = ['Support prioritaire', 'Annulation flexible', 'Réductions exclusives', 'Surclassement gratuit'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="KIRAAM Rewards" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginVertical: 24 }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#F5A62322', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={48} color="#F5A623" />
          </View>
          <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '800', marginTop: 12 }}>{user.loyaltyLevel}</Text>
          <Text style={{ color: '#F5A623', fontSize: 32, fontWeight: '900', marginTop: 8 }}>
            {user.loyaltyPoints.toLocaleString('fr-FR')} pts
          </Text>
          {next ? (
            <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 8 }}>
              {remaining.toLocaleString('fr-FR')} pts pour atteindre {next}
            </Text>
          ) : (
            <Text style={{ color: theme.colors.success, fontSize: 13, marginTop: 8, fontWeight: '600' }}>
              Niveau maximum atteint !
            </Text>
          )}
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginBottom: 12 }}>Niveaux</Text>
        {APP_CONFIG.loyaltyLevels.map((lvl) => {
          const unlocked = user.loyaltyPoints >= lvl.minPoints;
          return (
            <Card key={lvl.name} style={{ marginBottom: 8, opacity: unlocked ? 1 : 0.55 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: unlocked ? `${theme.colors.success}22` : theme.colors.backgroundAlt, alignItems: 'center', justifyContent: 'center' }}>
                  {unlocked ? <Check size={18} color={theme.colors.success} /> : <Award size={18} color={theme.colors.textSecondary} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.text, fontWeight: '700' }}>{lvl.name}</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{lvl.minPoints.toLocaleString('fr-FR')} pts</Text>
                </View>
                {lvl.discount > 0 ? (
                  <Text style={{ color: '#F5A623', fontWeight: '700' }}>-{(lvl.discount * 100).toFixed(0)}%</Text>
                ) : null}
              </View>
            </Card>
          );
        })}

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 24, marginBottom: 12 }}>Avantages</Text>
        {benefits.map((b, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Check size={16} color={theme.colors.success} />
            <Text style={{ color: theme.colors.text, fontSize: 14 }}>{b}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
