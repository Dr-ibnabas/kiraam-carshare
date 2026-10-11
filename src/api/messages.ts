import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../constants/mockData';
import { sleep, uid } from '../utils/helpers';
import type { Conversation, Message } from '../types/booking.types';

const conversationsCache: Conversation[] = [...MOCK_CONVERSATIONS];
const messagesCache: Message[] = [...MOCK_MESSAGES];

export async function fetchConversations(userId: string): Promise<Conversation[]> {
  await sleep(200);
  return conversationsCache.filter((c) => c.participants.includes(userId));
}

export async function fetchMessages(conversationId: string): Promise<Message[]> {
  await sleep(150);
  return messagesCache
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export async function sendMessage(
  data: Omit<Message, 'id' | 'createdAt' | 'read'>,
): Promise<Message> {
  await sleep(150);
  const message: Message = {
    ...data,
    id: uid('m'),
    read: false,
    createdAt: new Date().toISOString(),
  };
  messagesCache.push(message);
  // Mettre à jour le lastMessage de la conversation
  const idx = conversationsCache.findIndex((c) => c.id === data.conversationId);
  if (idx >= 0) {
    conversationsCache[idx] = {
      ...conversationsCache[idx],
      lastMessage: message,
      updatedAt: message.createdAt,
    };
  }
  return message;
}

export async function markConversationRead(conversationId: string): Promise<void> {
  await sleep(50);
  const idx = conversationsCache.findIndex((c) => c.id === conversationId);
  if (idx >= 0) {
    conversationsCache[idx] = { ...conversationsCache[idx], unreadCount: 0 };
  }
}
