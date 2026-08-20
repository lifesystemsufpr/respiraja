import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Wind } from 'lucide-react-native';

import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { RootStackParamList } from '../../../shared/types/navigation';
import { useBreathingStore } from '../../breathing/store/breathingStore';
import { breathingExercises } from '../../breathing/services/breathingPatterns';
import { colors, spacing } from '../../../shared/theme';

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const sessions = useBreathingStore((state) => state.sessions);

  const today = new Date().toDateString();
  const sessionsToday = sessions.filter(
    (s) => new Date(s.finishedAt).toDateString() === today
  );

  const minutesToday = Math.floor(
    sessionsToday.reduce((acc, curr) => acc + curr.duration, 0) / 60
  );

  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  const lastExercise = lastSession
    ? breathingExercises.find((e) => e.id === lastSession.exerciseId)
    : null;

  return (
    <Screen safeArea>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Typography variant="h1">Olá 👋</Typography>
          <Typography variant="body" color={colors.muted}>Como você está hoje?</Typography>
        </View>

        <Card style={styles.heroCard}>
          <Typography variant="h2" style={styles.heroTitle}>Pronto para relaxar?</Typography>
          <Button 
            title="Começar exercício" 
            onPress={() => navigation.navigate('Main', { screen: 'Exercicios' })}
          />
        </Card>

        <Typography variant="h3" style={styles.sectionTitle}>Seu Progresso Hoje</Typography>
        
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Typography variant="h2" color={colors.primary}>{sessionsToday.length}</Typography>
            <Typography variant="caption">Sessões hoje</Typography>
          </Card>
          <Card style={styles.statCard}>
            <Typography variant="h2" color={colors.primary}>{minutesToday}</Typography>
            <Typography variant="caption">Minutos respirados</Typography>
          </Card>
        </View>

        <Typography variant="h3" style={styles.sectionTitle}>Última sessão</Typography>
        
        {lastSession && lastExercise ? (
          <Card>
            <View style={styles.lastSessionHeader}>
              <View style={styles.iconContainer}>
                <Wind color={colors.primary} size={24} />
              </View>
              <View>
                <Typography variant="h3">{lastExercise.name}</Typography>
                <Typography variant="caption">
                  {Math.floor(lastSession.duration / 60)} min • Humor após: {lastSession.moodAfter}/5
                </Typography>
              </View>
            </View>
          </Card>
        ) : (
          <Card>
            <Typography variant="body" color={colors.muted} align="center">
              Você ainda não realizou nenhuma sessão.
            </Typography>
          </Card>
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
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  heroCard: {
    backgroundColor: '#E6F4FE',
    marginBottom: spacing.xl,
  },
  heroTitle: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
  },
  lastSessionHeader: {
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
});
