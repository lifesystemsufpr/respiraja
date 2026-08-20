import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { colors, spacing } from '../../../shared/theme';
import { RootStackParamList } from '../../../shared/types/navigation';

export const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]).start(() => {
      // In a real app we might navigate to Onboarding or Main depending on logic,
      // but the RootNavigator already handles the initial route. This screen is just a manual splash 
      // if we want an animated entry before the logic finishes, or if we force it as initial.
      // Assuming RootNavigator handles logic and only shows Splash while `isReady` is false.
    });
  }, []);

  return (
    <Screen safeArea={false} padding={false} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Typography variant="h1" color="#FFFFFF" style={styles.title}>RespiraJá</Typography>
        <Typography variant="h3" color="#FFFFFF" style={styles.subtitle}>Respire.</Typography>
        <Typography variant="h3" color="#FFFFFF" style={styles.subtitle}>Pause.</Typography>
        <Typography variant="h3" color="#FFFFFF" style={styles.subtitle}>Continue.</Typography>
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    marginBottom: spacing.sm,
    fontWeight: 'normal',
  },
});
