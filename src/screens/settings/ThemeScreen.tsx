import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sun, Moon, Smartphone, Check } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useThemeMode } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import type { ThemeMode } from '../../store/themeStore';

const MODES: { id: ThemeMode; label: string; icon: React.FC<{ size?: number; color?: string }> }[] = [
  { id: 'light', label: 'Clair', icon: Sun },
  { id: 'dark', label: 'Sombre', icon: Moon },
  { id: 'auto', label: 'Automatique', icon: Smartphone },
];

export function ThemeScreen(): React.ReactElement {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Thème" />
      <View style={{ padding: 16 }}>
        {MODES.map((m) => {
          const Icon = m.icon;
          const active = mode === m.id;
          return (
            <Pressable
              key={m.id}
              onPress={() => setMode(m.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: active ? theme.colors.primary : theme.colors.border,
                backgroundColor: theme.colors.card,
                marginBottom: 8,
                gap: 12,
              }}
            >
              <Icon size={22} color={active ? theme.colors.primary : theme.colors.text} />
              <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600', fontSize: 15 }}>{m.label}</Text>
              {active ? <Check size={20} color={theme.colors.primary} /> : null}
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
