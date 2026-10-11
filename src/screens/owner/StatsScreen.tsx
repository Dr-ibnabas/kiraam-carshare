import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Calendar, Eye, Star } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/ui/Card';

export function StatsScreen(): React.ReactElement {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Statistiques" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TrendingUp size={28} color={theme.colors.secondary} />
            <View>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>Revenus 30 derniers jours</Text>
              <Text style={{ color: theme.colors.text, fontWeight: '800', fontSize: 22 }}>485 000 Fdj</Text>
              <Text style={{ color: theme.colors.success, fontSize: 12, fontWeight: '600' }}>+12% vs mois précédent</Text>
            </View>
          </View>
        </Card>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
          <Card style={{ flex: 1 }}>
            <Calendar size={20} color={theme.colors.primary} />
            <Text style={{ color: theme.colors.text, fontWeight: '800', fontSize: 18, marginTop: 6 }}>23</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>Locations</Text>
          </Card>
          <Card style={{ flex: 1 }}>
            <Eye size={20} color={theme.colors.accent} />
            <Text style={{ color: theme.colors.text, fontWeight: '800', fontSize: 18, marginTop: 6 }}>1 245</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>Vues</Text>
          </Card>
          <Card style={{ flex: 1 }}>
            <Star size={20} color="#F5A623" />
            <Text style={{ color: theme.colors.text, fontWeight: '800', fontSize: 18, marginTop: 6 }}>4,9</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>Note</Text>
          </Card>
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 24, marginBottom: 12 }}>
          Évolution mensuelle
        </Text>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 140 }}>
            {[40, 60, 55, 80, 75, 95].map((h, i) => (
              <View key={i} style={{ alignItems: 'center', gap: 6 }}>
                <View style={{ width: 24, height: h, backgroundColor: theme.colors.primary, borderRadius: 4 }} />
                <Text style={{ color: theme.colors.textSecondary, fontSize: 10 }}>{['Déc', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai'][i]}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 24, marginBottom: 12 }}>
          Historique des virements (mock)
        </Text>
        {[
          { date: '2026-05-15', amount: 125000 },
          { date: '2026-04-15', amount: 98000 },
          { date: '2026-03-15', amount: 112000 },
        ].map((tr, i) => (
          <Card key={i} style={{ marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.text }}>{tr.date}</Text>
              <Text style={{ color: theme.colors.secondary, fontWeight: '700' }}>{tr.amount.toLocaleString('fr-FR')} Fdj</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
