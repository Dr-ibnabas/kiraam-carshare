import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Wrapper typé autour d'AsyncStorage
 */
export class StorageService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
}

export const storageService = new StorageService();
