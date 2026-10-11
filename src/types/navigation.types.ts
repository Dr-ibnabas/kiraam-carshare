import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  CarDetail: { carId: string };
  Gallery: { photos: string[]; initialIndex?: number };
  BookingFlow: { carId: string };
  BookingConfirmation: { bookingId: string };
  BookingDetail: { bookingId: string };
  Chat: { conversationId: string; otherUserId: string; otherUserName: string };
  EditProfile: undefined;
  Verification: undefined;
  Favorites: undefined;
  Referral: undefined;
  Loyalty: undefined;
  Notifications: undefined;
  Settings: undefined;
  Language: undefined;
  Theme: undefined;
  Security: undefined;
  PaymentMethods: undefined;
  Documents: undefined;
  Privacy: undefined;
  About: undefined;
  Support: undefined;
  FAQ: undefined;
  AddCar: undefined;
  Filters: undefined;
  Map: undefined;
  OwnerDashboard: undefined;
  MyCars: undefined;
  OwnerRequests: undefined;
  Stats: undefined;
  UserProfile: { userId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
  RoleSelection: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Bookings: undefined;
  Messages: undefined;
  Profile: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
