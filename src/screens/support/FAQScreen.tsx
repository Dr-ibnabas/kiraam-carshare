import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/common/Header';

interface FAQ {
  category: string;
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  { category: 'Locataire', question: 'Comment réserver une voiture ?', answer: 'Choisissez votre véhicule, sélectionnez les dates, ajoutez vos options et payez via D-Money, Waafi, carte ou cash.' },
  { category: 'Locataire', question: 'Puis-je annuler ma réservation ?', answer: 'Oui, selon la politique d\'annulation du propriétaire (flexible, modérée ou stricte).' },
  { category: 'Locataire', question: 'Que faire en cas de panne ?', answer: 'Contactez immédiatement le propriétaire puis le support 24/7 au +253 77 00 00 00.' },
  { category: 'Propriétaire', question: 'Comment mettre ma voiture en location ?', answer: 'Allez dans Profil > Devenir propriétaire, puis ajoutez votre véhicule en 6 étapes simples.' },
  { category: 'Propriétaire', question: 'Quand suis-je payé ?', answer: 'Le paiement est effectué 24h après la fin de la location, après validation par le locataire.' },
  { category: 'Paiement', question: 'Quels moyens de paiement sont acceptés ?', answer: 'D-Money (Djibouti Telecom), Waafi (Salaam African Bank), cartes bancaires et espèces avec acompte de 20%.' },
  { category: 'Paiement', question: 'Comment la caution est-elle gérée ?', answer: 'La caution est bloquée à la réservation et libérée 48h après la fin de la location sans incident.' },
  { category: 'Sécurité', question: 'Comment vérifiez-vous l\'identité ?', answer: 'CNI djiboutienne ou passeport + permis de conduire + selfie. Vérification sous 24-48h.' },
  { category: 'Assurance', question: 'Que couvre l\'assurance basique ?', answer: 'Responsabilité civile incluse. L\'assurance Premium couvre vol, bris de glace et franchise réduite.' },
];

export function FAQScreen(): React.ReactElement {
  const theme = useTheme();
  const [open, setOpen] = useState<number | null>(null);

  const categories = Array.from(new Set(FAQS.map((f) => f.category)));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <Header title="Questions fréquentes" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {categories.map((cat) => (
          <View key={cat} style={{ marginBottom: 20 }}>
            <Text style={{ color: theme.colors.primary, fontWeight: '700', fontSize: 14, marginBottom: 10, textTransform: 'uppercase' }}>
              {cat}
            </Text>
            {FAQS.filter((f) => f.category === cat).map((faq, i) => {
              const idx = FAQS.indexOf(faq);
              const isOpen = open === idx;
              return (
                <Pressable
                  key={i}
                  onPress={() => setOpen(isOpen ? null : idx)}
                  style={{ backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, padding: 14, marginBottom: 8 }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600', fontSize: 13, marginRight: 8 }}>
                      {faq.question}
                    </Text>
                    <ChevronDown
                      size={18}
                      color={theme.colors.textSecondary}
                      style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
                    />
                  </View>
                  {isOpen ? (
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 10 }}>
                      {faq.answer}
                    </Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
