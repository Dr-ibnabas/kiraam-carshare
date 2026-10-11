import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Map as MapIcon, List } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../hooks/useTheme';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearchCars } from '../../hooks/useCars';
import { useLocation } from '../../hooks/useLocation';
import { SearchBar } from '../../components/common/SearchBar';
import { CarCardHorizontal } from '../../components/cars/CarCardHorizontal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { FiltersBottomSheet } from '../../components/filters/FiltersBottomSheet';
import { useFiltersStore } from '../../store/filtersStore';
import type { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function SearchScreen(): React.ReactElement {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { coords } = useLocation();
  const filters = useFiltersStore((s) => s.filters);
  const setQuery = useFiltersStore((s) => s.setQuery);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [query, setLocalQuery] = useState<string>(filters.query ?? '');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery, setQuery]);

  const { data: results = [], isLoading, refetch } = useSearchCars(filters, coords);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 }}>
        <SearchBar
          value={query}
          onChangeText={setLocalQuery}
          placeholder={t('search.placeholder')}
          onFilterPress={() => setFiltersOpen(true)}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13, fontWeight: '600' }}>
          {t('search.results', { count: results.length })}
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Map')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 999,
          }}
        >
          <MapIcon size={14} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>{t('search.mapView')}</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View style={{ paddingHorizontal: 16, gap: 12 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} width="100%" height={120} borderRadius={14} />
          ))}
        </View>
      ) : results.length === 0 ? (
        <EmptyState
          icon={<List size={48} color={theme.colors.textSecondary} />}
          title={t('search.noResults')}
          subtitle={t('search.tryDifferent')}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <CarCardHorizontal car={item} onPress={() => navigation.navigate('CarDetail', { carId: item.id })} />
          )}
        />
      )}

      <FiltersBottomSheet visible={filtersOpen} onClose={() => setFiltersOpen(false)} onApply={() => refetch()} />
    </SafeAreaView>
  );
}
