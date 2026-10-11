/**
 * Configuration Firebase
 *
 * En production, importer firebase/app, firebase/auth, etc. ici.
 * Pour démarrer sans dépendance Firebase native (build Expo Go), on expose
 * uniquement la configuration. Les services consommateurs utilisent les mocks
 * locaux (voir cars.ts, bookings.ts, etc.).
 */

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? 'demo-api-key',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? 'kiraam.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID ?? 'kiraam-carshare',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? 'kiraam.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '0000000',
  appId: process.env.FIREBASE_APP_ID ?? '1:000:web:000',
};

export const isFirebaseConfigured = (): boolean => firebaseConfig.apiKey !== 'demo-api-key';
