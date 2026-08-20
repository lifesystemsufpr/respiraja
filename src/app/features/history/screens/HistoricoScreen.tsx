import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Wind } from 'lucide-react-native';

import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Card } from '../../../shared/components/Card';
import { useBreathingStore } from '../../breathing/store/breathingStore';
import { breathingExercises } from '../../breathing/services/breathingPatterns';
import { BreathingSession } from '../../breathing/types';
import { colors, spacing } from '../../../shared/theme';

export const HistoricoScreen = () => {
  const sessions = useBreathingStore((state) => state.sessions);

  // Sort sessions by date descending
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()
  );

  const renderItem = ({ item }: { item: BreathingSession }) => {
    const exercise = breathingExercises.find((e) => e.id === item.exerciseId);
    
    const date = new Date(item.finishedAt);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return (
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Wind color={colors.primary} size={24} />
          </View>
          <View style={styles.cardContent}>
            <Typography variant="h3">{exercise?.name || 'Sessão Desconhecida'}</Typography>
            <Typography variant="caption">{dateString}, {timeString}</Typography>
            <Typography variant="caption">{Math.floor(item.duration / 60)} minutos</Typography>
            {item.moodAfter && (
              <Typography variant="caption" style={styles.mood}>Humor: {item.moodAfter}/5</Typography>
            )}
          </View>
        </View>
      </Card>
    );
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="h2">Histórico</Typography>
        <Typography variant="body" color={colors.muted}>
          Suas sessões anteriores
        </Typography>
      </View>

      {sortedSessions.length > 0 ? (
        <FlatList
          data={sortedSessions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Typography variant="body" color={colors.muted} align="center">
            Você ainda não realizou nenhuma sessão.
          </Typography>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: spacing.lg,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F4FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  mood: {
    marginTop: spacing.xs,
    color: colors.primary,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
