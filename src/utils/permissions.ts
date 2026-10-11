import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';

export type PermissionResult = 'granted' | 'denied' | 'undetermined';

export async function requestLocationPermission(): Promise<PermissionResult> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status;
  } catch {
    return 'denied';
  }
}

export async function requestCameraPermission(): Promise<PermissionResult> {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
  } catch {
    return 'denied';
  }
}

export async function requestMediaPermission(): Promise<PermissionResult> {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status;
  } catch {
    return 'denied';
  }
}

export async function requestNotificationPermission(): Promise<PermissionResult> {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    return status;
  } catch {
    return 'denied';
  }
}
