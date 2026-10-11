import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../ui/Avatar';
import { RatingStars } from './RatingStars';
import { formatRelativeDate } from '../../utils/formatters';
import type { Review } from '../../types/booking.types';

interface Props {
  review: Review;
}

export function ReviewCard({ review }: Props): React.ReactElement {
  const theme = useTheme();
  const [first, last] = review.fromUserName.split(' ');

  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <Avatar uri={review.fromUserAvatar} firstName={first} lastName={last} size={36} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 14 }}>{review.fromUserName}</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>{formatRelativeDate(review.createdAt)}</Text>
        </View>
        <RatingStars rating={review.rating} size={14} />
      </View>
      <Text style={{ color: theme.colors.text, fontSize: 13, lineHeight: 19 }}>{review.comment}</Text>
      {review.reply ? (
        <View style={{ marginTop: 10, padding: 10, backgroundColor: theme.colors.backgroundAlt, borderRadius: 8 }}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 11, fontWeight: '600', marginBottom: 4 }}>
            Réponse du propriétaire
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: 12, lineHeight: 17 }}>{review.reply}</Text>
        </View>
      ) : null}
    </View>
  );
}
