import React, { useState } from 'react';
import { View, Text, TextInput, type TextInputProps, type StyleProp, type ViewStyle, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  isPassword = false,
  ...rest
}: InputProps): React.ReactElement {
  const theme = useTheme();
  const [isFocused, setFocused] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(isPassword);

  const borderColor = error ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.border;

  return (
    <View style={[{ marginBottom: 12 }, containerStyle]}>
      {label ? (
        <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 6, fontWeight: '500' }}>
          {label}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.card,
          borderWidth: 1.5,
          borderColor,
          borderRadius: 12,
          paddingHorizontal: 12,
          minHeight: 50,
        }}
      >
        {leftIcon ? <View style={{ marginRight: 8 }}>{leftIcon}</View> : null}
        <TextInput
          {...rest}
          secureTextEntry={hidden}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          placeholderTextColor={theme.colors.textSecondary}
          style={{
            flex: 1,
            fontSize: 15,
            color: theme.colors.text,
            paddingVertical: 12,
          }}
        />
        {isPassword ? (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            {hidden ? (
              <EyeOff size={20} color={theme.colors.textSecondary} />
            ) : (
              <Eye size={20} color={theme.colors.textSecondary} />
            )}
          </Pressable>
        ) : rightIcon ? (
          <View style={{ marginLeft: 8 }}>{rightIcon}</View>
        ) : null}
      </View>
      {error ? (
        <Text style={{ fontSize: 12, color: theme.colors.error, marginTop: 4 }}>{error}</Text>
      ) : null}
    </View>
  );
}
