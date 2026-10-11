import React from 'react';

import { Badge } from '../ui/Badge';
import type { BookingStatus } from '../../types/booking.types';

interface Props {
  status: BookingStatus;
}

const MAP: Record<BookingStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'primary' | 'neutral' }> = {
  pending: { label: 'En attente', variant: 'warning' },
  confirmed: { label: 'Confirmée', variant: 'primary' },
  in_progress: { label: 'En cours', variant: 'success' },
  completed: { label: 'Terminée', variant: 'neutral' },
  cancelled: { label: 'Annulée', variant: 'error' },
  rejected: { label: 'Refusée', variant: 'error' },
};

export function BookingStatusBadge({ status }: Props): React.ReactElement {
  const { label, variant } = MAP[status];
  return <Badge label={label} variant={variant} size="sm" />;
}
