import { MOCK_USERS } from '../constants/mockData';
import { sleep } from '../utils/helpers';
import type { User } from '../types/user.types';

export async function fetchUserById(userId: string): Promise<User | null> {
  await sleep(150);
  return MOCK_USERS.find((u) => u.id === userId) ?? null;
}

export async function fetchSuperHosts(): Promise<User[]> {
  await sleep(200);
  return MOCK_USERS.filter((u) => u.isSuperHost);
}

export async function updateUser(userId: string, patch: Partial<User>): Promise<User | null> {
  await sleep(250);
  const idx = MOCK_USERS.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  MOCK_USERS[idx] = { ...MOCK_USERS[idx], ...patch };
  return MOCK_USERS[idx];
}
