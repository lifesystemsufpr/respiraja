import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { BreathingPhase } from '../../features/breathing/types';
import { colors } from '../theme';

interface BreathingCircleProps {
  phase: BreathingPhase;
  duration: number; // in seconds
  status: 'idle' | 'running' | 'paused' | 'completed';
}

export const BreathingCircle = ({ phase, duration, status }: BreathingCircleProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status !== 'running') {
      scale.stopAnimation();
      return;
    }

    const durationMs = duration * 1000;

    let toValue = 1;
    if (phase === 'inhale') toValue = 1.8;
    else if (phase === 'hold') toValue = 1.8;
    else if (phase === 'exhale') toValue = 1;
    else if (phase === 'pause') toValue = 1;

    Animated.timing(scale, {
      toValue,
      duration: durationMs,
      useNativeDriver: true,
    }).start();

  }, [phase, duration, status, scale]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: `${colors.primary}40`, // with some transparency
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
