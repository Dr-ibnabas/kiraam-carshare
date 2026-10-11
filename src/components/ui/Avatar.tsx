import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';

import { useTheme } from '../../hooks/useTheme';
import { getInitials } from '../../utils/formatters';

interface AvatarProps {
  uri?: string;
  firstName: string;
  lastName?: string;
  size?: number;
  showBadge?: boolean;
  badgeColor?: string;
}

export function Avatar({
  uri,
  firstName,
  lastName,
  size = 48,
  showBadge = false,
  badgeColor,
}: AvatarProps): React.ReactElement {
  const theme = useTheme();

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: size / 2.5 }}>
            {getInitials(firstName, lastName)}
          </Text>
        </View>
      )}
      {showBadge ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: size / 4,
            height: size / 4,
            borderRadius: size / 8,
            backgroundColor: badgeColor ?? theme.colors.success,
            borderWidth: 2,
            borderColor: theme.colors.background,
          }}
        />
      ) : null}
    </View>
  );
}
