import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';

import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { CarDetailScreen } from '../screens/car/CarDetailScreen';
import { GalleryScreen } from '../screens/car/GalleryScreen';
import { BookingFlowScreen } from '../screens/booking/BookingFlowScreen';
import { BookingConfirmationScreen } from '../screens/booking/BookingConfirmationScreen';
import { BookingDetailScreen } from '../screens/booking/BookingDetailScreen';
import { ChatScreen } from '../screens/messages/ChatScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { VerificationScreen } from '../screens/auth/VerificationScreen';
import { FavoritesScreen } from '../screens/profile/FavoritesScreen';
import { ReferralScreen } from '../screens/profile/ReferralScreen';
import { LoyaltyScreen } from '../screens/profile/LoyaltyScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { LanguageScreen } from '../screens/settings/LanguageScreen';
import { ThemeScreen } from '../screens/settings/ThemeScreen';
import { SecurityScreen } from '../screens/settings/SecurityScreen';
import { PaymentMethodsScreen } from '../screens/settings/PaymentMethodsScreen';
import { DocumentsScreen } from '../screens/settings/DocumentsScreen';
import { PrivacyScreen } from '../screens/settings/PrivacyScreen';
import { AboutScreen } from '../screens/settings/AboutScreen';
import { SupportScreen } from '../screens/support/SupportScreen';
import { FAQScreen } from '../screens/support/FAQScreen';
import { AddCarScreen } from '../screens/owner/AddCarScreen';
import { FiltersScreen } from '../screens/search/FiltersScreen';
import { MapScreen } from '../screens/search/MapScreen';
import { OwnerDashboardScreen } from '../screens/owner/OwnerDashboardScreen';
import { MyCarsScreen } from '../screens/owner/MyCarsScreen';
import { OwnerRequestsScreen } from '../screens/owner/OwnerRequestsScreen';
import { StatsScreen } from '../screens/owner/StatsScreen';
import { UserProfileScreen } from '../screens/profile/UserProfileScreen';
import type { RootStackParamList } from '../types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.ReactElement {
  const isDark = useThemeStore((s) => s.isDark);
  const theme = useThemeStore((s) => s.theme);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isOnboarded = useAuthStore((s) => s.isOnboarded);
  const initializeFavorites = useFavoritesStore((s) => s.initialize);

  useEffect(() => {
    initializeFavorites();
  }, [initializeFavorites]);

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          primary: theme.colors.primary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          primary: theme.colors.primary,
        },
      };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="CarDetail" component={CarDetailScreen} />
            <Stack.Screen name="Gallery" component={GalleryScreen} />
            <Stack.Screen name="BookingFlow" component={BookingFlowScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Referral" component={ReferralScreen} />
            <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="Theme" component={ThemeScreen} />
            <Stack.Screen name="Security" component={SecurityScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="Documents" component={DocumentsScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="FAQ" component={FAQScreen} />
            <Stack.Screen name="AddCar" component={AddCarScreen} />
            <Stack.Screen name="Filters" component={FiltersScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="OwnerDashboard" component={OwnerDashboardScreen} />
            <Stack.Screen name="MyCars" component={MyCarsScreen} />
            <Stack.Screen name="OwnerRequests" component={OwnerRequestsScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
