import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, subtitle, actionLabel, onAction }: EmptyStateProps): React.ReactElement {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      {icon ? <View style={{ marginBottom: 16, opacity: 0.6 }}>{icon}</View> : null}
      <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: '700', textAlign: 'center', marginBottom: 6 }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ color: theme.colors.textSecondary, fontSize: 14, textAlign: 'center', marginBottom: 16, lineHeight: 20 }}>
          {subtitle}
        </Text>
      ) : null}
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} variant="primary" /> : null}
    </View>
  );
}
