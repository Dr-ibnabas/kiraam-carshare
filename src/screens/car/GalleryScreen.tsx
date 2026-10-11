import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { X } from 'lucide-react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';

import type { RootStackParamList } from '../../types/navigation.types';

const { width, height } = Dimensions.get('window');

export function GalleryScreen(): React.ReactElement {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Gallery'>>();
  const [index, setIndex] = useState<number>(route.params.initialIndex ?? 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
          {index + 1} / {route.params.photos.length}
        </Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <X size={26} color="#fff" />
        </Pressable>
      </View>
      <FlatList
        data={route.params.photos}
        horizontal
        pagingEnabled
        initialScrollIndex={route.params.initialIndex ?? 0}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        keyExtractor={(item, i) => `${item}-${i}`}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, height: height * 0.75 }} contentFit="contain" />
        )}
      />
    </SafeAreaView>
  );
}
