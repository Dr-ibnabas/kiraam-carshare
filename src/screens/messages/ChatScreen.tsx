import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Send, MapPin, Image as ImageIcon, Mic } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { Avatar } from '../../components/ui/Avatar';
import { fetchMessages, sendMessage } from '../../api/messages';
import { formatTime } from '../../utils/formatters';
import type { Message } from '../../types/booking.types';
import type { RootStackParamList } from '../../types/navigation.types';

const TEMPLATES = [
  'Bonjour, est-ce toujours disponible ?',
  'Je confirme la prise en charge',
  'Merci !',
  'Je suis en chemin',
];

export function ChatScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const flatRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    fetchMessages(route.params.conversationId).then(setMessages);
  }, [route.params.conversationId]);

  const handleSend = async (): Promise<void> => {
    if (!text.trim() || !user) return;
    const msg = await sendMessage({
      conversationId: route.params.conversationId,
      senderId: user.id,
      receiverId: route.params.otherUserId,
      text: text.trim(),
      type: 'text',
    });
    setMessages((prev) => [...prev, msg]);
    setText('');
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header
        title={route.params.otherUserName}
        rightAction={
          <Avatar
            firstName={route.params.otherUserName.split(' ')[0]}
            lastName={route.params.otherUserName.split(' ')[1]}
            size={36}
            showBadge
          />
        }
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} keyboardVerticalOffset={80}>
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
          renderItem={({ item }) => {
            const isMine = item.senderId === user?.id;
            return (
              <View style={{ alignItems: isMine ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                <View
                  style={{
                    backgroundColor: isMine ? theme.colors.primary : theme.colors.backgroundAlt,
                    borderRadius: 16,
                    borderBottomRightRadius: isMine ? 4 : 16,
                    borderBottomLeftRadius: isMine ? 16 : 4,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    maxWidth: '80%',
                  }}
                >
                  <Text style={{ color: isMine ? '#fff' : theme.colors.text, fontSize: 14 }}>{item.text}</Text>
                </View>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 10, marginTop: 2, paddingHorizontal: 4 }}>
                  {formatTime(item.createdAt)} {isMine ? (item.read ? '✓✓' : '✓') : ''}
                </Text>
              </View>
            );
          }}
        />

        <View style={{ paddingHorizontal: 16, paddingVertical: 6 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={TEMPLATES}
            keyExtractor={(item) => item}
            contentContainerStyle={{ gap: 6 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setText(item)}
                style={{
                  backgroundColor: theme.colors.backgroundAlt,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 14,
                }}
              >
                <Text style={{ color: theme.colors.text, fontSize: 12 }}>{item}</Text>
              </Pressable>
            )}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8, backgroundColor: theme.colors.card, borderTopWidth: 1, borderTopColor: theme.colors.border }}>
          <Pressable hitSlop={8}>
            <ImageIcon size={22} color={theme.colors.textSecondary} />
          </Pressable>
          <Pressable hitSlop={8}>
            <MapPin size={22} color={theme.colors.textSecondary} />
          </Pressable>
          <View style={{ flex: 1, backgroundColor: theme.colors.backgroundAlt, borderRadius: 22, paddingHorizontal: 14 }}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Tapez un message…"
              placeholderTextColor={theme.colors.textSecondary}
              style={{ color: theme.colors.text, fontSize: 14, paddingVertical: 10 }}
              multiline
              maxLength={1000}
            />
          </View>
          {text ? (
            <Pressable onPress={handleSend} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} color="#fff" />
            </Pressable>
          ) : (
            <Pressable hitSlop={8}>
              <Mic size={22} color={theme.colors.primary} />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
