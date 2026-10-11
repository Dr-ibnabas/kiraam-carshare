import React from 'react';
import { View, Text, ScrollView, Share, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gift, Copy, Share2 } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { formatPrice } from '../../utils/formatters';

export function ReferralScreen(): React.ReactElement {
  const theme = useTheme();
  const { user } = useAuth();

  const handleShare = async (): Promise<void> => {
    try {
      await Share.share({
        message: `Découvre KIRAAM ! Utilise mon code ${user?.referralCode} pour gagner 2 000 Fdj sur ta 1ère location.`,
      });
    } catch {
      // Silencieux
    }
  };

  const handleCopy = (): void => {
    Alert.alert('Copié', `Code ${user?.referralCode} copié`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Parrainage" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginVertical: 24 }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: `${theme.colors.primary}22`, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Gift size={48} color={theme.colors.primary} />
          </View>
          <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '800', textAlign: 'center' }}>Invitez vos amis</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 14, textAlign: 'center', marginTop: 6 }}>
            Gagnez {formatPrice(2000)} à chaque parrainage validé
          </Text>
        </View>

        <Card>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12, textAlign: 'center', marginBottom: 8 }}>Votre code</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
            <Text style={{ color: theme.colors.primary, fontSize: 22, fontWeight: '800', letterSpacing: 1 }}>
              {user?.referralCode}
            </Text>
            <Pressable onPress={handleCopy} hitSlop={10}>
              <Copy size={20} color={theme.colors.primary} />
            </Pressable>
          </View>
        </Card>

        <Button label="Partager mon code" onPress={handleShare} fullWidth size="lg" leftIcon={<Share2 size={18} color="#fff" />} style={{ marginTop: 16 }} />

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 32, marginBottom: 12 }}>
          Comment ça marche ?
        </Text>
        {[
          '1. Partagez votre code unique',
          '2. Votre ami s\'inscrit avec votre code',
          '3. À sa 1ère location, vous gagnez 2 000 Fdj chacun',
        ].map((step, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 12, marginBottom: 10, alignItems: 'center' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>{i + 1}</Text>
            </View>
            <Text style={{ color: theme.colors.text, fontSize: 14, flex: 1 }}>{step.replace(/^\d+\.\s*/, '')}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
