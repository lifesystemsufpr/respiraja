import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Activity, Clock, Smile, Calendar } from 'lucide-react-native';

import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Card } from '../../../shared/components/Card';
import { useBreathingStore } from '../../breathing/store/breathingStore';
import { colors, spacing } from '../../../shared/theme';

export const EvolucaoScreen = () => {
  const sessions = useBreathingStore((state) => state.sessions);

  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const totalMinutes = Math.floor(
      sessions.reduce((acc, curr) => acc + curr.duration, 0) / 60
    );
    
    const sessionsWithMood = sessions.filter(s => s.moodAfter !== undefined);
    const avgMood = sessionsWithMood.length > 0
      ? (sessionsWithMood.reduce((acc, curr) => acc + (curr.moodAfter || 0), 0) / sessionsWithMood.length).toFixed(1)
      : '-';

    // Simple streak calculation (just unique days for MVP)
    const uniqueDays = new Set(
      sessions.map(s => new Date(s.finishedAt).toDateString())
    ).size;

    return { totalSessions, totalMinutes, avgMood, uniqueDays };
  }, [sessions]);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Typography variant="h2">Evolução</Typography>
          <Typography variant="body" color={colors.muted}>
            Acompanhe seu progresso ao longo do tempo
          </Typography>
        </View>

        {sessions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Typography variant="body" color={colors.muted} align="center">
              Continue praticando para visualizar sua evolução.
            </Typography>
          </View>
        ) : (
          <View style={styles.grid}>
            <Card style={styles.statCard}>
              <View style={styles.iconContainer}>
                <Activity color={colors.primary} size={24} />
              </View>
              <Typography variant="h2">{stats.totalSessions}</Typography>
              <Typography variant="caption" align="center">Sessões totais</Typography>
            </Card>

            <Card style={styles.statCard}>
              <View style={styles.iconContainer}>
                <Clock color={colors.primary} size={24} />
              </View>
              <Typography variant="h2">{stats.totalMinutes}m</Typography>
              <Typography variant="caption" align="center">Tempo total</Typography>
            </Card>

            <Card style={styles.statCard}>
              <View style={styles.iconContainer}>
                <Smile color={colors.primary} size={24} />
              </View>
              <Typography variant="h2">{stats.avgMood}</Typography>
              <Typography variant="caption" align="center">Humor médio</Typography>
            </Card>

            <Card style={styles.statCard}>
              <View style={styles.iconContainer}>
                <Calendar color={colors.primary} size={24} />
              </View>
              <Typography variant="h2">{stats.uniqueDays}</Typography>
              <Typography variant="caption" align="center">Dias de prática</Typography>
            </Card>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: spacing.xxl,
  },
  header: {
    marginVertical: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F4FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emptyContainer: {
    marginTop: spacing.xxl,
    alignItems: 'center',
  },
});
