import React from 'react';
import { Modal, View, Pressable, Text, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string | number;
}

export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  maxHeight = '85%',
}: BottomSheetProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: theme.colors.overlay }} onPress={onClose} />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.card,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          maxHeight: maxHeight as number,
          paddingBottom: 24,
          ...theme.shadows.lg,
        }}
      >
        <View style={{ alignItems: 'center', paddingTop: 12 }}>
          <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: theme.colors.border }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
          {title ? (
            <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>{title}</Text>
          ) : <View />}
          <Pressable onPress={onClose} hitSlop={10}>
            <X size={22} color={theme.colors.textSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
}
