import React from 'react';
import { ScrollView, Pressable, Text } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { Colors } from '../../constants/colors';
import type { CarCategory } from '../../types/car.types';

interface CategoryChipsProps {
  selected: CarCategory[];
  onToggle: (category: CarCategory) => void;
}

const CATEGORIES: { id: CarCategory | 'all'; emoji: string; label: string }[] = [
  { id: 'all', emoji: '🚗', label: 'Toutes' },
  { id: 'suv', emoji: '🚙', label: 'SUV/4x4' },
  { id: 'city', emoji: '🏙️', label: 'Citadine' },
  { id: 'luxury', emoji: '✨', label: 'Luxe' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Familiale' },
  { id: 'sedan', emoji: '💼', label: 'Berline' },
  { id: 'hybrid', emoji: '⚡', label: 'Hybride' },
  { id: 'pickup', emoji: '🛻', label: 'Pick-up' },
];

/**
 * Chips de catégories alignées sur le design Claude Design handoff.
 * Premier chip "Toutes" pour reset. Actif = fond noir #0A0E1A.
 */
export function CategoryChips({ selected, onToggle }: CategoryChipsProps): React.ReactElement {
  const theme = useTheme();

  const isAllActive = selected.length === 0;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = cat.id === 'all' ? isAllActive : selected.includes(cat.id as CarCategory);
        return (
          <Pressable
            key={cat.id}
            onPress={() => {
              if (cat.id === 'all') {
                selected.forEach((s) => onToggle(s));
              } else {
                onToggle(cat.id as CarCategory);
              }
            }}
            style={{
              height: 36,
              paddingHorizontal: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: isSelected ? Colors.bgDark : theme.colors.card,
              borderWidth: 1,
              borderColor: isSelected ? Colors.bgDark : theme.colors.border,
              borderRadius: 100,
            }}
          >
            <Text style={{ fontSize: 14 }}>{cat.emoji}</Text>
            <Text
              style={{
                color: isSelected ? '#fff' : theme.colors.text,
                fontWeight: '600',
                fontSize: 13,
              }}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
