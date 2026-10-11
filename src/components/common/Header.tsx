import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  showBack?: boolean;
  transparent?: boolean;
}

export function Header({ title, rightAction, showBack = true, transparent = false }: HeaderProps): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: transparent ? 'transparent' : theme.colors.background,
        borderBottomWidth: transparent ? 0 : 1,
        borderBottomColor: theme.colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {showBack && navigation.canGoBack() ? (
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={{ marginRight: 8, width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: theme.colors.backgroundAlt }}
          >
            <ChevronLeft size={22} color={theme.colors.text} />
          </Pressable>
        ) : null}
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {rightAction ? <View>{rightAction}</View> : null}
    </View>
  );
}
