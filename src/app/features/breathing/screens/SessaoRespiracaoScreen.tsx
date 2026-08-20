import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Play, Pause, X, RotateCcw } from 'lucide-react-native';

import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Button } from '../../../shared/components/Button';
import { BreathingCircle } from '../../../shared/components/BreathingCircle';
import { RootStackParamList } from '../../../shared/types/navigation';
import { breathingExercises } from '../services/breathingPatterns';
import { useBreathingSession } from '../hooks/useBreathingSession';
import { spacing, colors } from '../../../shared/theme';

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

  const { state, start, pause, resume, stop, reset, sessionKey } = useBreathingSession(exercise);

  const remainingExerciseSeconds = Math.max(0, exercise.duration - state.totalElapsedSeconds);
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

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
        <Typography variant="h2" align="center" color={colors.muted} style={styles.mainTimer}>
          {formatTime(remainingExerciseSeconds)}
        </Typography>
      </View>

      <View style={styles.content}>
        <BreathingCircle 
          key={sessionKey}
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

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={reset}>
          <RotateCcw size={24} color="#171923" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={state.status === 'running' ? pause : resume}
        >
          {state.status === 'running' ? (
            <Pause size={32} color="#FFF" fill="#FFF" />
          ) : (
            <Play size={32} color="#FFF" fill="#FFF" style={{ marginLeft: 4 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleStop}>
          <X size={24} color="#E34045" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  mainTimer: {
    marginTop: spacing.xs,
    fontSize: 20, 
    fontWeight: '500',
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
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
    gap: 24, // Requires RN 0.71+, since it's 0.73, gap works
  },
  primaryButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1557E8', // Azul primário da home
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1557E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F4F4F6', // Cinza claro
    justifyContent: 'center',
    alignItems: 'center',
  },
});
