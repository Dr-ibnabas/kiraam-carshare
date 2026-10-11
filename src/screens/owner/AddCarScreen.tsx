import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Image as ImageIcon, Check, MapPin } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { FilterChip } from '../../components/filters/FilterChip';
import { CAR_FEATURES } from '../../constants/mockData';
import { DJIBOUTI_DISTRICTS } from '../../constants/djibouti';
import { APP_CONFIG } from '../../constants/config';
import type { CarCategory, FuelType, Transmission } from '../../types/car.types';

const STEPS = ['Photos', 'Identification', 'Caractéristiques', 'Tarification', 'Localisation', 'Disponibilités'];

export function AddCarScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();
  const [step, setStep] = useState<number>(0);

  // Form state
  const [photos, setPhotos] = useState<string[]>([]);
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [plate, setPlate] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [category, setCategory] = useState<CarCategory>('city');
  const [transmission, setTransmission] = useState<Transmission>('automatic');
  const [fuel, setFuel] = useState<FuelType>('petrol');
  const [seats, setSeats] = useState<string>('5');
  const [features, setFeatures] = useState<string[]>(['ac']);
  const [hasAC, setHasAC] = useState<boolean>(true);
  const [is4x4, setIs4x4] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [deposit, setDeposit] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const toggleFeature = (id: string): void => {
    setFeatures((p) => (p.includes(id) ? p.filter((f) => f !== id) : [...p, id]));
  };

  const next = (): void => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      Alert.alert('Annonce publiée', 'Votre véhicule a été enregistré (démo)', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  const back = (): void => {
    if (step > 0) setStep(step - 1);
    else navigation.goBack();
  };

  const renderStep = (): React.ReactElement => {
    switch (step) {
      case 0:
        return (
          <View>
            <Text style={titleStyle(theme)}>Photos du véhicule</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginBottom: 16 }}>
              Min 5 photos, max 15. Première = photo de couverture.
            </Text>
            <Pressable
              onPress={() => setPhotos((p) => [...p, `https://images.unsplash.com/photo-${1606664515524 + p.length}-ed2f786a0bd6?w=400`])}
              style={{
                height: 160,
                borderRadius: 12,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: theme.colors.border,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <ImageIcon size={36} color={theme.colors.textSecondary} />
              <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>+ Ajouter une photo</Text>
            </Pressable>
            <Text style={{ color: theme.colors.text, marginTop: 12, fontSize: 13 }}>
              {photos.length} / {APP_CONFIG.maxCarPhotos} photo{photos.length > 1 ? 's' : ''}
            </Text>
          </View>
        );

      case 1:
        return (
          <View>
            <Text style={titleStyle(theme)}>Identification</Text>
            <Input label="Marque" value={brand} onChangeText={setBrand} placeholder="Toyota" />
            <Input label="Modèle" value={model} onChangeText={setModel} placeholder="Land Cruiser 200" />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}><Input label="Année" value={year} onChangeText={setYear} placeholder="2022" keyboardType="number-pad" /></View>
              <View style={{ flex: 1 }}><Input label="Couleur" value={color} onChangeText={setColor} placeholder="Blanc" /></View>
            </View>
            <Input label="Plaque (XX-XXXX-XX)" value={plate} onChangeText={setPlate} placeholder="DJ-1234-AB" autoCapitalize="characters" />
          </View>
        );

      case 2:
        return (
          <ScrollView>
            <Text style={titleStyle(theme)}>Caractéristiques</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginBottom: 8 }}>Catégorie</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {(['suv', 'city', 'luxury', 'family', 'sedan', 'hybrid', 'pickup'] as CarCategory[]).map((c) => (
                <FilterChip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
              ))}
            </View>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginBottom: 8 }}>Transmission / Carburant</Text>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {(['automatic', 'manual'] as Transmission[]).map((t) => (
                <FilterChip key={t} label={t === 'automatic' ? 'Auto' : 'Manuelle'} active={transmission === t} onPress={() => setTransmission(t)} />
              ))}
              {(['petrol', 'diesel', 'hybrid'] as FuelType[]).map((f) => (
                <FilterChip key={f} label={f} active={fuel === f} onPress={() => setFuel(f)} />
              ))}
            </View>
            <Input label="Nb de places" value={seats} onChangeText={setSeats} keyboardType="number-pad" />
            <Card style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Climatisation</Text>
                <Switch value={hasAC} onValueChange={setHasAC} trackColor={{ true: theme.colors.primary }} />
              </View>
            </Card>
            <Card style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.colors.text, fontWeight: '600' }}>4x4</Text>
                <Switch value={is4x4} onValueChange={setIs4x4} trackColor={{ true: theme.colors.secondary }} />
              </View>
            </Card>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginBottom: 8 }}>Équipements</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {CAR_FEATURES.map((f) => (
                <FilterChip key={f.id} label={f.label} active={features.includes(f.id)} onPress={() => toggleFeature(f.id)} />
              ))}
            </View>
          </ScrollView>
        );

      case 3:
        return (
          <View>
            <Text style={titleStyle(theme)}>Tarification</Text>
            <Input label="Prix par jour (Fdj)" value={price} onChangeText={setPrice} placeholder="15000" keyboardType="number-pad" />
            <Input label="Caution (Fdj)" value={deposit} onChangeText={setDeposit} placeholder="100000" keyboardType="number-pad" />
            <Card>
              <Text style={{ color: theme.colors.text, fontWeight: '600', marginBottom: 8 }}>Réductions automatiques</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>3+ jours : -10%</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>7+ jours : -15%</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>30+ jours : -25%</Text>
            </Card>
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={titleStyle(theme)}>Localisation</Text>
            <View style={{ height: 180, borderRadius: 12, backgroundColor: theme.colors.backgroundAlt, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <MapPin size={40} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>Carte interactive</Text>
            </View>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginBottom: 8 }}>Quartier de Djibouti-ville</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {DJIBOUTI_DISTRICTS.map((d) => (
                <FilterChip key={d.id} label={d.name} active={district === d.id} onPress={() => setDistrict(d.id)} />
              ))}
            </View>
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={titleStyle(theme)}>Disponibilités & règles</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginBottom: 16 }}>
              Votre véhicule sera disponible par défaut tous les jours. Bloquez les dates indésirables depuis votre dashboard.
            </Text>
            <Card>
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Politique d'annulation</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
                <FilterChip label="Flexible" active onPress={() => undefined} />
                <FilterChip label="Modérée" active={false} onPress={() => undefined} />
                <FilterChip label="Stricte" active={false} onPress={() => undefined} />
              </View>
            </Card>
          </View>
        );

      default:
        return <View />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title={`Étape ${step + 1}/6`} />
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8 }}>
        {STEPS.map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              marginHorizontal: 2,
              backgroundColor: i <= step ? theme.colors.primary : theme.colors.border,
            }}
          />
        ))}
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {renderStep()}
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: theme.colors.card, borderTopWidth: 1, borderTopColor: theme.colors.border }}>
        <View style={{ flexDirection: 'row', padding: 16, gap: 10 }}>
          <Button label={step === 0 ? 'Annuler' : 'Précédent'} variant="outline" onPress={back} style={{ flex: 1 }} />
          <Button
            label={step === STEPS.length - 1 ? 'Publier l\'annonce' : 'Suivant'}
            onPress={next}
            leftIcon={step === STEPS.length - 1 ? <Check size={16} color="#fff" /> : undefined}
            style={{ flex: 1 }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

function titleStyle(theme: ReturnType<typeof useTheme>) {
  return {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700' as const,
    marginBottom: 16,
  };
}
