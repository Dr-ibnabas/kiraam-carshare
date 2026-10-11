import React from 'react';
import { View, Text } from 'react-native';
import { Check, Clock } from 'lucide-react-native';

import { useTheme } from '../../hooks/useTheme';
import type { BookingStatus } from '../../types/booking.types';

interface Step {
  label: string;
  done: boolean;
  current: boolean;
}

interface Props {
  status: BookingStatus;
}

export function BookingTimeline({ status }: Props): React.ReactElement {
  const theme = useTheme();

  const order: BookingStatus[] = ['pending', 'confirmed', 'in_progress', 'completed'];
  const currentIndex = order.indexOf(status);

  const labels: Record<BookingStatus, string> = {
    pending: 'Réservation reçue',
    confirmed: 'Confirmée',
    in_progress: 'En cours',
    completed: 'Terminée',
    cancelled: 'Annulée',
    rejected: 'Refusée',
  };

  const steps: Step[] = order.map((s, i) => ({
    label: labels[s],
    done: currentIndex > i,
    current: currentIndex === i,
  }));

  return (
    <View style={{ paddingVertical: 12 }}>
      {steps.map((step, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 12 }}>
          <View style={{ alignItems: 'center', width: 28 }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: step.done ? theme.colors.success : step.current ? theme.colors.primary : theme.colors.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {step.done ? <Check size={14} color="#fff" /> : <Clock size={12} color="#fff" />}
            </View>
            {i < steps.length - 1 ? (
              <View style={{ width: 2, flex: 1, backgroundColor: step.done ? theme.colors.success : theme.colors.border, marginTop: 4 }} />
            ) : null}
          </View>
          <Text
            style={{
              color: step.done || step.current ? theme.colors.text : theme.colors.textSecondary,
              fontSize: 14,
              fontWeight: step.current ? '700' : '500',
              marginLeft: 12,
              marginTop: 2,
            }}
          >
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
