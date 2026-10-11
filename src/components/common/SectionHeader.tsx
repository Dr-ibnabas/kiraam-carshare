import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps): React.ReactElement {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: '700' }}>{title}</Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }} hitSlop={10}>
          <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: '600' }}>{actionLabel}</Text>
          <ChevronRight size={16} color={theme.colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}
