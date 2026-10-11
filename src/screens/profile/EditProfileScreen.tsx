import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export function EditProfileScreen(): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState<string>(user?.firstName ?? '');
  const [lastName, setLastName] = useState<string>(user?.lastName ?? '');
  const [bio, setBio] = useState<string>(user?.bio ?? '');
  const [city, setCity] = useState<string>(user?.city ?? '');

  const save = (): void => {
    updateUser({ firstName, lastName, bio, city });
    Alert.alert('Profil', 'Modifications enregistrées', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Modifier le profil" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Avatar uri={user?.avatar} firstName={firstName} lastName={lastName} size={88} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}><Input label="Prénom" value={firstName} onChangeText={setFirstName} /></View>
          <View style={{ flex: 1 }}><Input label="Nom" value={lastName} onChangeText={setLastName} /></View>
        </View>
        <Input label="Bio" value={bio} onChangeText={setBio} multiline numberOfLines={4} placeholder="Présentez-vous en quelques mots…" />
        <Input label="Ville" value={city} onChangeText={setCity} />
        <Button label="Enregistrer" onPress={save} fullWidth size="lg" style={{ marginTop: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
