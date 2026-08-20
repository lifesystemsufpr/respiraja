import React, { useState } from 'react';
import { View, StyleSheet, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { useBreathingStore } from '../../breathing/store/breathingStore';
import { RootStackParamList } from '../../../shared/types/navigation';
import { colors, spacing } from '../../../shared/theme';

export const PerfilScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const clearSessions = useBreathingStore((state) => state.clearSessions);
  const [dailyGoal, setDailyGoal] = useState(15);
  const [notifications, setNotifications] = useState(false); // UI placeholder only, per user request

  const handleClearData = () => {
    Alert.alert(
      'Apagar todos os dados',
      'Tem certeza de que deseja apagar todo o histórico de sessões e configurações? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Apagar', 
          style: 'destructive',
          onPress: async () => {
            clearSessions();
            await AsyncStorage.removeItem('@respiraja_onboarding_completed');
            // Navigate to Onboarding
            navigation.replace('Onboarding');
          }
        }
      ]
    );
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="h2">Perfil</Typography>
        <Typography variant="body" color={colors.muted}>
          Suas configurações e dados
        </Typography>
      </View>

      <Card style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>Metas</Typography>
        <View style={styles.row}>
          <Typography variant="body">Meta diária (minutos)</Typography>
          <Typography variant="body" weight="bold" color={colors.primary}>{dailyGoal}</Typography>
        </View>
      </Card>

      <Card style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>Notificações</Typography>
        <View style={styles.row}>
          <Typography variant="body">Lembrete diário</Typography>
          <Switch 
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.muted, true: colors.primary }}
          />
        </View>
        <Typography variant="caption" color={colors.warning} style={styles.note}>
          Nota: Notificações não estão implementadas neste MVP.
        </Typography>
      </Card>

      <Card style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>Avançado</Typography>
        <Button 
          title="Apagar todos os dados" 
          variant="outline" 
          onPress={handleClearData} 
          style={styles.dangerButton}
        />
        <Typography variant="caption" align="center" style={styles.warningText}>
          Isto apagará seu histórico e reiniciará o aplicativo.
        </Typography>
      </Card>
      
      <Typography variant="caption" align="center" style={styles.version}>
        RespiraJá MVP v1.0.0
      </Typography>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: spacing.lg,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  note: {
    marginTop: spacing.sm,
  },
  dangerButton: {
    borderColor: colors.warning,
    marginBottom: spacing.sm,
  },
  warningText: {
    color: colors.warning,
  },
  version: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
});
