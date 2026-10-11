import React, { useState } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Snowflake, Mountain } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/ui/Button';
import { FilterChip } from '../../components/filters/FilterChip';
import { PriceRangeSlider } from '../../components/filters/PriceRangeSlider';
import { useFiltersStore } from '../../store/filtersStore';
import { CAR_FEATURES } from '../../constants/mockData';
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

const SORT_OPTIONS = [
  { id: 'popularity', label: 'Popularité' },
  { id: 'price', label: 'Prix' },
  { id: 'distance', label: 'Distance' },
  { id: 'rating', label: 'Note' },
] as const;

export function FiltersScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { filters, setFilters, toggleCategory, reset } = useFiltersStore();
  const [localFeatures, setLocalFeatures] = useState<string[]>(filters.features);

  const toggleFeature = (id: string): void => {
    setLocalFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const apply = (): void => {
    setFilters({ features: localFeatures });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title={t('filters.title')} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginBottom: 12 }}>{t('filters.type')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORIES.map((c) => (
            <FilterChip key={c.id} label={c.label} active={filters.categories.includes(c.id)} onPress={() => toggleCategory(c.id)} />
          ))}
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 24, marginBottom: 12 }}>
          {t('filters.price')}
        </Text>
        <PriceRangeSlider min={3000} max={50000} value={filters.priceMax} onChange={(v) => setFilters({ priceMax: Math.round(v) })} label="Jusqu'à" />

        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Snowflake size={18} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{t('filters.ac')}</Text>
            </View>
            <Switch value={filters.hasAC} onValueChange={(v) => setFilters({ hasAC: v })} trackColor={{ true: theme.colors.primary }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Mountain size={18} color={theme.colors.secondary} />
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{t('filters.fourWD')}</Text>
            </View>
            <Switch value={filters.isFourWD} onValueChange={(v) => setFilters({ isFourWD: v })} trackColor={{ true: theme.colors.secondary }} />
          </View>
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 24, marginBottom: 12 }}>{t('filters.transmission')}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {(['automatic', 'manual'] as Transmission[]).map((tr) => (
            <FilterChip key={tr} label={tr === 'automatic' ? t('filters.automatic') : t('filters.manual')}
              active={filters.transmission === tr}
              onPress={() => setFilters({ transmission: filters.transmission === tr ? undefined : tr })} />
          ))}
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 24, marginBottom: 12 }}>{t('filters.fuel')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {(['petrol', 'diesel', 'hybrid', 'electric'] as FuelType[]).map((f) => {
            const labels = { petrol: t('filters.petrol'), diesel: t('filters.diesel'), hybrid: t('filters.hybrid'), electric: t('filters.electric') };
            return (
              <FilterChip key={f} label={labels[f]} active={filters.fuel === f}
                onPress={() => setFilters({ fuel: filters.fuel === f ? undefined : f })} />
            );
          })}
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 24, marginBottom: 12 }}>{t('filters.features')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {CAR_FEATURES.map((f) => (
            <FilterChip key={f.id} label={f.label} active={localFeatures.includes(f.id)} onPress={() => toggleFeature(f.id)} />
          ))}
        </View>

        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14, marginTop: 24, marginBottom: 12 }}>{t('filters.sortBy')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {SORT_OPTIONS.map((s) => (
            <FilterChip key={s.id} label={s.label} active={filters.sortBy === s.id} onPress={() => setFilters({ sortBy: s.id })} />
          ))}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: theme.colors.background, borderTopWidth: 1, borderTopColor: theme.colors.border, flexDirection: 'row', gap: 10 }}>
        <Button label={t('filters.clearAll')} variant="outline" onPress={reset} style={{ flex: 1 }} />
        <Button label={t('filters.applyFilters')} onPress={apply} style={{ flex: 2 }} />
      </View>
    </SafeAreaView>
  );
}
