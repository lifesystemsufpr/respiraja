import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Button } from '../../../shared/components/Button';
import { RootStackParamList } from '../../../shared/types/navigation';
import { useBreathingStore } from '../store/breathingStore';
import { colors, spacing, radius } from '../../../shared/theme';

type FinalizacaoSessaoRouteProp = RouteProp<RootStackParamList, 'FinalizacaoSessao'>;

export const FinalizacaoSessaoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<FinalizacaoSessaoRouteProp>();
  const { sessionData } = route.params;
  
  const [moodAfter, setMoodAfter] = useState<number>(3);
  const addSession = useBreathingStore((state) => state.addSession);

  const handleSave = () => {
    // Math.random().toString(36).substring(7) is simple enough for MVP if uuid isn't there
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    addSession({
      ...sessionData,
      id,
      moodAfter,
    });

    navigation.replace('Main', { screen: 'Dashboard' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Typography variant="h1" align="center" style={styles.title}>
          Sessão concluída!
        </Typography>
        
        <Typography variant="body" align="center" color={colors.muted}>
          Você completou:
        </Typography>
        <Typography variant="h2" align="center" color={colors.primary} style={styles.duration}>
          {formatDuration(sessionData.duration)}
        </Typography>

        <View style={styles.moodSection}>
          <Typography variant="h3" align="center" style={styles.moodTitle}>
            Como você está se sentindo agora?
          </Typography>
          
          <View style={styles.moodSelector}>
            {[1, 2, 3, 4, 5].map((score) => (
              <TouchableOpacity
                key={score}
                style={[
                  styles.moodButton,
                  moodAfter === score && styles.moodButtonActive
                ]}
                onPress={() => setMoodAfter(score)}
              >
                <Typography 
                  variant="h3" 
                  color={moodAfter === score ? '#FFFFFF' : colors.primary}
                >
                  {score}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.moodLabels}>
            <Typography variant="caption">Muito mal</Typography>
            <Typography variant="caption">Muito bem</Typography>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Salvar sessão" onPress={handleSave} style={styles.button} />
        <Button 
          title="Descartar e Voltar" 
          variant="ghost" 
          onPress={() => navigation.replace('Main', { screen: 'Dashboard' })} 
        />
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
  title: {
    marginBottom: spacing.xl,
  },
  duration: {
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  moodSection: {
    width: '100%',
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  moodTitle: {
    marginBottom: spacing.lg,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  moodButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodButtonActive: {
    backgroundColor: colors.primary,
  },
  moodLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  footer: {
    paddingBottom: spacing.lg,
  },
  button: {
    marginBottom: spacing.md,
  },
});
