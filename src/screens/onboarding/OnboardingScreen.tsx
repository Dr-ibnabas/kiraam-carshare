import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, Pressable, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Car, Key, Compass } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';

const { width } = Dimensions.get('window');

interface Slide {
  key: string;
  titleKey: string;
  subtitleKey: string;
  icon: React.FC<{ size?: number; color?: string }>;
  color: string;
}

const SLIDES: Slide[] = [
  { key: '1', titleKey: 'onboarding.slide1Title', subtitleKey: 'onboarding.slide1Subtitle', icon: Car, color: '#6AB2E7' },
  { key: '2', titleKey: 'onboarding.slide2Title', subtitleKey: 'onboarding.slide2Subtitle', icon: Key, color: '#12AD2B' },
  { key: '3', titleKey: 'onboarding.slide3Title', subtitleKey: 'onboarding.slide3Subtitle', icon: Compass, color: '#F5A623' },
];

export function OnboardingScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const flatRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState<number>(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const next = (): void => {
    if (index < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      completeOnboarding();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ alignItems: 'flex-end', paddingHorizontal: 20, paddingTop: 8 }}>
        <Pressable onPress={completeOnboarding} hitSlop={10}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 14, fontWeight: '600' }}>{t('onboarding.skip')}</Text>
        </Pressable>
      </View>

      <FlatList
        ref={flatRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <View style={{ width, padding: 32, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 90,
                  backgroundColor: `${item.color}22`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 40,
                }}
              >
                <Icon size={88} color={item.color} />
              </View>
              <Text style={{ color: theme.colors.text, fontSize: 26, fontWeight: '800', textAlign: 'center', marginBottom: 16 }}>
                {t(item.titleKey)}
              </Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 16, textAlign: 'center', lineHeight: 24 }}>
                {t(item.subtitleKey)}
              </Text>
            </View>
          );
        }}
      />

      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === index ? theme.colors.primary : theme.colors.border,
              }}
            />
          ))}
        </View>
        <Button
          label={index === SLIDES.length - 1 ? t('onboarding.start') : t('onboarding.next')}
          onPress={next}
          fullWidth
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}
