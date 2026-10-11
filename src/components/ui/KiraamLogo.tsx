import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import { Colors } from '../../constants/colors';

interface Props {
  size?: number;
  color?: string;
  showText?: boolean;
}

/**
 * Logo KIRAAM CARSHARE — fidèle au design handoff.
 * Volant + voiture stylisée dans un carré gradient bleu + texte "KIRAAM" + "CARSHARE".
 */
export function KiraamLogo({ size = 32, color = Colors.bgDark, showText = true }: Props): React.ReactElement {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: Colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
          <Path
            d="M3 18h2l1-3h12l1 3h2l-2.5-7.5C18 9.5 17 9 16 9H8c-1 0-2 .5-2.5 1.5L3 18z"
            fill="#fff"
          />
          <Circle cx="7.5" cy="17.5" r="1.8" fill={Colors.primaryDark} />
          <Circle cx="16.5" cy="17.5" r="1.8" fill={Colors.primaryDark} />
        </Svg>
      </View>
      {showText ? (
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: size * 0.55,
              fontWeight: '900',
              color,
              letterSpacing: -0.4,
              lineHeight: size * 0.6,
            }}
          >
            KIRAAM
          </Text>
          <Text
            style={{
              fontSize: size * 0.28,
              fontWeight: '600',
              color: Colors.primary,
              letterSpacing: size * 0.18,
              marginTop: 2,
            }}
          >
            CARSHARE
          </Text>
        </View>
      ) : null}
    </View>
  );
}
