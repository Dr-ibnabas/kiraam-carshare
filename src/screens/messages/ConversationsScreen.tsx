import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MessageCircle } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { fetchConversations } from '../../api/messages';
import { Avatar } from '../../components/ui/Avatar';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatRelativeDate, truncate } from '../../utils/formatters';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ConversationsScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();
  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: () => (user ? fetchConversations(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 }}>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '800' }}>{t('messages.title')}</Text>
      </View>

      {conversations.length === 0 ? (
        <EmptyState
          icon={<MessageCircle size={48} color={theme.colors.textSecondary} />}
          title={t('messages.noConversations')}
          subtitle={t('messages.startChatting')}
        />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.border, marginVertical: 4 }} />}
          renderItem={({ item }) => {
            const otherUser = item.participantsInfo.find((p) => p.id !== user?.id) ?? item.participantsInfo[0];
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate('Chat', {
                    conversationId: item.id,
                    otherUserId: otherUser.id,
                    otherUserName: otherUser.name,
                  })
                }
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 }}
              >
                <Avatar uri={otherUser.avatar} firstName={otherUser.name.split(' ')[0]} lastName={otherUser.name.split(' ')[1]} size={50} showBadge />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 15 }}>{otherUser.name}</Text>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>
                      {item.lastMessage ? formatRelativeDate(item.lastMessage.createdAt) : ''}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 13, flex: 1 }} numberOfLines={1}>
                      {item.lastMessage ? truncate(item.lastMessage.text ?? '', 50) : ''}
                    </Text>
                    {item.unreadCount > 0 ? (
                      <View style={{ backgroundColor: theme.colors.primary, minWidth: 20, height: 20, paddingHorizontal: 6, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{item.unreadCount}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
