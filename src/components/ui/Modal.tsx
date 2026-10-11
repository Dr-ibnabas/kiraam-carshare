import React from 'react';
import { Modal as RNModal, View, Pressable, Text } from 'react-native';
import { X } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ visible, onClose, title, children }: ModalProps): React.ReactElement {
  const theme = useTheme();
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: theme.colors.overlay, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 20,
            padding: 20,
            width: '100%',
            maxWidth: 420,
            ...theme.shadows.lg,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            {title ? (
              <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>{title}</Text>
            ) : (
              <View />
            )}
            <Pressable onPress={onClose} hitSlop={10}>
              <X size={22} color={theme.colors.textSecondary} />
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  );
}
