import 'react-native-gesture-handler';
import './global.css';

import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { I18nextProvider } from 'react-i18next';
import { View, Text } from 'react-native';

import i18n from './src/i18n';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useThemeStore } from './src/store/themeStore';
import { ErrorBoundary } from './src/components/ui/ErrorBoundary';
import { useAuthStore } from './src/store/authStore';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore — peut échouer en mode web
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

export default function App(): React.ReactElement {
  const [appReady, setAppReady] = useState<boolean>(false);
  const { initializeTheme, isDark } = useThemeStore();
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    async function prepare(): Promise<void> {
      try {
        // Initialisation des stores
        await initializeTheme();
        await initializeAuth();
        // Petite pause pour laisser le splash s'afficher
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        // En production: logger via Sentry/Crashlytics
        console.warn('Erreur d\'initialisation:', error);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, [initializeTheme, initializeAuth]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [appReady]);

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6AB2E7' }}>
        <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold' }}>KIRAAM</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <SafeAreaProvider>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <StatusBar style={isDark ? 'light' : 'dark'} />
              <RootNavigator />
            </QueryClientProvider>
          </I18nextProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
