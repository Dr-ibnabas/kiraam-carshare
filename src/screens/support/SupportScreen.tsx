import React from 'react';
import { View, Text, ScrollView, Pressable, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Phone, MessageCircle, HelpCircle, AlertTriangle, Mail } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/ui/Card';
import { APP_CONFIG } from '../../constants/config';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function SupportScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Aide & Support" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginBottom: 20 }}>
          Comment pouvons-nous vous aider ?
        </Text>

        <Pressable onPress={() => Linking.openURL(`tel:${APP_CONFIG.emergencyPhone.replace(/\s/g, '')}`).catch(() => undefined)}>
          <Card style={{ backgroundColor: `${theme.colors.error}10`, borderColor: theme.colors.error }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: theme.colors.error, alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={20} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Urgence 24/7</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{APP_CONFIG.emergencyPhone}</Text>
              </View>
            </View>
          </Card>
        </Pressable>

        <View style={{ marginTop: 16, gap: 10 }}>
          <Pressable onPress={() => navigation.navigate('FAQ')}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <HelpCircle size={22} color={theme.colors.primary} />
                <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600' }}>Questions fréquentes (FAQ)</Text>
              </View>
            </Card>
          </Pressable>
          <Pressable onPress={() => Alert.alert('Chat', 'Le chat support sera disponible bientôt')}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <MessageCircle size={22} color={theme.colors.primary} />
                <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600' }}>Chat avec le support</Text>
              </View>
            </Card>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`mailto:${APP_CONFIG.supportEmail}`).catch(() => undefined)}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Mail size={22} color={theme.colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.text, fontWeight: '600' }}>E-mail support</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{APP_CONFIG.supportEmail}</Text>
                </View>
              </View>
            </Card>
          </Pressable>
          <Pressable onPress={() => Alert.alert('Signaler', 'Décrivez le problème par e-mail')}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <AlertTriangle size={22} color={theme.colors.warning} />
                <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600' }}>Signaler un incident / litige</Text>
              </View>
            </Card>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
