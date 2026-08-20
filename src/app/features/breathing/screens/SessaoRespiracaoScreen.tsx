import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Button } from '../../../shared/components/Button';
import { BreathingCircle } from '../../../shared/components/BreathingCircle';
import { RootStackParamList } from '../../../shared/types/navigation';
import { breathingExercises } from '../services/breathingPatterns';
import { useBreathingSession } from '../hooks/useBreathingSession';
import { spacing } from '../../../shared/theme';

type SessaoRespiracaoRouteProp = RouteProp<RootStackParamList, 'SessaoRespiracao'>;

const phaseTranslations: Record<string, string> = {
  inhale: 'INSPIRAR',
  hold: 'SEGURAR',
  exhale: 'EXPIRAR',
  pause: 'PAUSA',
};

export const SessaoRespiracaoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<SessaoRespiracaoRouteProp>();
  const { exerciseId } = route.params;

  const exercise = useMemo(
    () => breathingExercises.find((e) => e.id === exerciseId) || breathingExercises[0],
    [exerciseId]
  );

  const { state, start, pause, resume, stop } = useBreathingSession(exercise);

  useEffect(() => {
    if (state.status === 'idle') {
      start();
    }
  }, [state.status, start]);

  useEffect(() => {
    if (state.status === 'completed') {
      // Save partial or complete? We go to Finalizacao.
      const sessionData = {
        exerciseId: exercise.id,
        duration: state.totalElapsedSeconds,
        startedAt: new Date(Date.now() - state.totalElapsedSeconds * 1000).toISOString(),
        finishedAt: new Date().toISOString(),
      };
      navigation.replace('FinalizacaoSessao', { sessionData });
    }
  }, [state.status, navigation, exercise.id, state.totalElapsedSeconds]);

  const handleStop = () => {
    stop();
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="h2" align="center">{exercise.name}</Typography>
        <Typography variant="caption" align="center">Ciclo {state.currentCycle}</Typography>
      </View>

      <View style={styles.content}>
        <BreathingCircle 
          phase={state.phase} 
          duration={exercise.steps[state.currentStepIndex].duration} 
          status={state.status} 
        />
        
        <View style={styles.textContainer}>
          <Typography variant="h1" align="center" style={styles.phaseText}>
            {phaseTranslations[state.phase]}
          </Typography>
          <Typography variant="h1" align="center">
            {state.remainingSeconds}
          </Typography>
        </View>
      </View>

      <View style={styles.footer}>
        {state.status === 'running' ? (
          <Button title="Pausar" variant="outline" onPress={pause} style={styles.actionButton} />
        ) : (
          <Button title="Continuar" variant="primary" onPress={resume} style={styles.actionButton} />
        )}
        <Button title="Encerrar" variant="ghost" onPress={handleStop} style={styles.actionButton} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  phaseText: {
    marginBottom: spacing.md,
  },
  footer: {
    paddingBottom: spacing.xxl,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
});
