import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, Calendar, MessageCircle, User } from 'lucide-react-native';

import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { MyBookingsScreen } from '../screens/booking/MyBookingsScreen';
import { ConversationsScreen } from '../screens/messages/ConversationsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { useTheme } from '../hooks/useTheme';
import type { MainTabParamList } from '../types/navigation.types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator(): React.ReactElement {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          const props = { size: size ?? 22, color };
          switch (route.name) {
            case 'Home': return <Home {...props} />;
            case 'Search': return <Search {...props} />;
            case 'Bookings': return <Calendar {...props} />;
            case 'Messages': return <MessageCircle {...props} />;
            case 'Profile': return <User {...props} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Accueil' }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Recherche' }} />
      <Tab.Screen name="Bookings" component={MyBookingsScreen} options={{ tabBarLabel: 'Locations' }} />
      <Tab.Screen name="Messages" component={ConversationsScreen} options={{ tabBarLabel: 'Messages' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
}
