import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wind } from 'lucide-react-native';

import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Button } from '../../../shared/components/Button';
import { colors, spacing } from '../../../shared/theme';
import { RootStackParamList } from '../../../shared/types/navigation';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleStart = async () => {
    await AsyncStorage.setItem('@respiraja_onboarding_completed', 'true');
    navigation.replace('Main', { screen: 'Dashboard' });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Wind size={80} color={colors.primary} />
        </View>
        <Typography variant="h1" align="center" style={styles.title}>
          RespiraJá
        </Typography>
        <Typography variant="body" align="center" color={colors.muted} style={styles.description}>
          Respiração guiada para momentos de ansiedade e estresse.
          {'\n\n'}
          Escolha um exercício e comece em poucos segundos.
        </Typography>
        <Typography variant="caption" align="center" style={styles.disclaimer}>
          O RespiraJá é uma ferramenta de bem-estar e não substitui acompanhamento profissional.
        </Typography>
      </View>
      
      <View style={styles.footer}>
        <Button title="Começar" onPress={handleStart} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 100,
  },
  title: {
    marginBottom: spacing.lg,
  },
  description: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  disclaimer: {
    marginTop: spacing.xxl,
    fontStyle: 'italic',
  },
  footer: {
    paddingBottom: spacing.lg,
  },
});
