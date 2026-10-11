import React from 'react';
import { View, Text } from 'react-native';
import {
  Wind, Map as MapIcon, Bluetooth, Usb, Baby, Snowflake, Circle, Sun, Armchair,
  Radar, Video, Gauge, Package, Disc, Check,
} from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { CAR_FEATURES } from '../../constants/mockData';

const ICONS: Record<string, React.FC<{ size?: number; color?: string }>> = {
  wind: Wind, map: MapIcon, bluetooth: Bluetooth, usb: Usb, baby: Baby,
  snowflake: Snowflake, circle: Circle, sun: Sun, armchair: Armchair,
  radar: Radar, video: Video, gauge: Gauge, package: Package, disc: Disc,
};

interface CarFeaturesProps {
  featureIds: string[];
}

export function CarFeatures({ featureIds }: CarFeaturesProps): React.ReactElement {
  const theme = useTheme();
  const features = CAR_FEATURES.filter((f) => featureIds.includes(f.id));

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {features.map((f) => {
        const Icon = ICONS[f.icon] ?? Check;
        return (
          <View
            key={f.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: theme.colors.backgroundAlt,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
            }}
          >
            <Icon size={16} color={theme.colors.primary} />
            <Text style={{ color: theme.colors.text, fontSize: 12, fontWeight: '500' }}>{f.label}</Text>
          </View>
        );
      })}
    </View>
  );
}
