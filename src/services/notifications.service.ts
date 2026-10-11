import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationsService {
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  }

  async scheduleLocalNotification(args: {
    title: string;
    body: string;
    seconds?: number;
    data?: Record<string, string>;
  }): Promise<string | null> {
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: { title: args.title, body: args.body, data: args.data ?? {} },
        trigger: args.seconds
          ? ({ type: 'timeInterval', seconds: args.seconds, repeats: false } as Notifications.TimeIntervalTriggerInput)
          : null,
      });
      return id;
    } catch {
      return null;
    }
  }

  async cancelAll(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch {
      // Silencieux
    }
  }

  async getDeviceToken(): Promise<string | null> {
    if (Platform.OS === 'web') return null;
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      return token.data;
    } catch {
      return null;
    }
  }
}

export const notificationsService = new NotificationsService();
