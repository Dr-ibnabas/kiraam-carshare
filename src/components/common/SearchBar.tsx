import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Search, Mic, SlidersHorizontal, X } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';

interface SearchBarProps {
  value: string;
  onChangeText: (v: string) => void;
  onSubmit?: () => void;
  onFilterPress?: () => void;
  onMicPress?: () => void;
  placeholder?: string;
  editable?: boolean;
  onPress?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onFilterPress,
  onMicPress,
  placeholder = 'Rechercher…',
  editable = true,
  onPress,
}: SearchBarProps): React.ReactElement {
  const theme = useTheme();

  const inner = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundAlt,
        borderRadius: 999,
        paddingHorizontal: 14,
        height: 46,
        gap: 8,
      }}
    >
      <Search size={20} color={theme.colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        editable={editable}
        placeholderTextColor={theme.colors.textSecondary}
        style={{ flex: 1, color: theme.colors.text, fontSize: 15 }}
      />
      {value ? (
        <Pressable hitSlop={10} onPress={() => onChangeText('')}>
          <X size={18} color={theme.colors.textSecondary} />
        </Pressable>
      ) : onMicPress ? (
        <Pressable hitSlop={10} onPress={onMicPress}>
          <Mic size={20} color={theme.colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        {onPress && !editable ? (
          <Pressable onPress={onPress}>{inner}</Pressable>
        ) : (
          inner
        )}
      </View>
      {onFilterPress ? (
        <Pressable
          onPress={onFilterPress}
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SlidersHorizontal size={20} color="#fff" />
        </Pressable>
      ) : null}
    </View>
  );
}
