import React, { useState, useRef } from 'react';
import { View, FlatList, Pressable, Dimensions, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import { Image } from 'expo-image';

import { useTheme } from '../../hooks/useTheme';

interface CarGalleryProps {
  photos: string[];
  height?: number;
  onPhotoPress?: (index: number) => void;
}

export function CarGallery({ photos, height = 280, onPhotoPress }: CarGalleryProps): React.ReactElement {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(idx);
  };

  return (
    <View style={{ height }}>
      <FlatList
        ref={flatListRef}
        data={photos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, idx) => `${item}-${idx}`}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => onPhotoPress?.(index)}>
            <Image
              source={{ uri: item }}
              style={{ width: screenWidth, height }}
              contentFit="cover"
              transition={200}
            />
          </Pressable>
        )}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          alignSelf: 'center',
          flexDirection: 'row',
          gap: 6,
          backgroundColor: 'rgba(0,0,0,0.45)',
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 999,
        }}
      >
        {photos.map((_, idx) => (
          <View
            key={idx}
            style={{
              width: idx === activeIndex ? 18 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: idx === activeIndex ? theme.colors.primary : '#fff',
            }}
          />
        ))}
      </View>
    </View>
  );
}
