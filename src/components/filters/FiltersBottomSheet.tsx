import React from 'react';
import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { Snowflake, Mountain } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { FilterChip } from './FilterChip';
import { PriceRangeSlider } from './PriceRangeSlider';
import { useFiltersStore } from '../../store/filtersStore';
import type { CarCategory, FuelType, Transmission } from '../../types/car.types';

const CATEGORIES: { id: CarCategory; label: string }[] = [
  { id: 'suv', label: 'SUV / 4x4' },
  { id: 'city', label: 'Citadine' },
  { id: 'luxury', label: 'Luxe' },
  { id: 'family', label: 'Familiale' },
  { id: 'sedan', label: 'Berline' },
  { id: 'hybrid', label: 'Hybride' },
  { id: 'pickup', label: 'Pick-up' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
}

export function FiltersBottomSheet({ visible, onClose, onApply }: Props): React.ReactElement {
  const theme = useTheme();
  const { filters, setFilters, toggleCategory, reset } = useFiltersStore();

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Filtres">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 8, marginBottom: 12 }}>
          Catégorie
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.id}
              label={c.label}
              active={filters.categories.includes(c.id)}
              onPress={() => toggleCategory(c.id)}
            />
          ))}
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 20, marginBottom: 12 }}>
          Prix maximum / jour
        </Text>
        <PriceRangeSlider
          min={3000}
          max={50000}
          value={filters.priceMax}
          onChange={(v) => setFilters({ priceMax: Math.round(v) })}
          label="Jusqu'à"
        />

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Snowflake size={18} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Climatisation</Text>
            </View>
            <Switch
              value={filters.hasAC}
              onValueChange={(v) => setFilters({ hasAC: v })}
              trackColor={{ true: theme.colors.primary }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Mountain size={18} color={theme.colors.secondary} />
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>4x4 (pour excursions)</Text>
            </View>
            <Switch
              value={filters.isFourWD}
              onValueChange={(v) => setFilters({ isFourWD: v })}
              trackColor={{ true: theme.colors.secondary }}
            />
          </View>
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 20, marginBottom: 12 }}>
          Transmission
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {(['automatic', 'manual'] as Transmission[]).map((t) => (
            <FilterChip
              key={t}
              label={t === 'automatic' ? 'Automatique' : 'Manuelle'}
              active={filters.transmission === t}
              onPress={() => setFilters({ transmission: filters.transmission === t ? undefined : t })}
            />
          ))}
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 20, marginBottom: 12 }}>
          Carburant
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {(['petrol', 'diesel', 'hybrid', 'electric'] as FuelType[]).map((f) => {
            const labels = { petrol: 'Essence', diesel: 'Diesel', hybrid: 'Hybride', electric: 'Électrique' } as const;
            return (
              <FilterChip
                key={f}
                label={labels[f]}
                active={filters.fuel === f}
                onPress={() => setFilters({ fuel: filters.fuel === f ? undefined : f })}
              />
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 28 }}>
          <Button label="Réinitialiser" variant="outline" onPress={reset} fullWidth style={{ flex: 1 }} />
          <Button
            label="Appliquer"
            onPress={() => {
              onApply();
              onClose();
            }}
            fullWidth
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
