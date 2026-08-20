import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Pressable, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Wind, Play, List, CheckCircle, Timer, Flame } from 'lucide-react-native';

import { Screen } from '../../../shared/components/Screen';
import { RootStackParamList } from '../../../shared/types/navigation';
import { useBreathingStore } from '../../breathing/store/breathingStore';
import { breathingExercises } from '../../breathing/services/breathingPatterns';

const THEME = {
  colors: {
    primary: '#1557E8',
    secondary: '#2F6ED8',
    textMain: '#171923',
    textSecondary: '#6B6D78',
    background: '#FAF8FF',
    cardNeutral: '#F8F8FA',
    iconLightBlue: '#DDE8FF',
    iconPeach: '#FFE0D5',
    iconPink: '#FFDCDD',
    white: '#FFFFFF',
  }
};

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

  const calculateStreak = () => {
    if (!sessions || sessions.length === 0) return 0;

    const toDateString = (dateInput: string | Date) => {
      const d = new Date(dateInput);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const uniqueDatesStr = [...new Set(sessions.map(s => toDateString(s.finishedAt)))];
    // Ordena as datas de forma decrescente (mais recente primeiro)
    uniqueDatesStr.sort((a, b) => b.localeCompare(a));

    const today = new Date();
    const todayStr = toDateString(today);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = toDateString(yesterday);

    const mostRecentStr = uniqueDatesStr[0];

    // Se a última sessão não foi nem hoje nem ontem, a sequência zerou
    if (mostRecentStr !== todayStr && mostRecentStr !== yesterdayStr) {
      return 0;
    }

    let streak = 1;
    let dateTracker = new Date(today);
    
    if (mostRecentStr === yesterdayStr) {
        dateTracker = new Date(yesterday);
    }
    
    for (let i = 1; i < uniqueDatesStr.length; i++) {
      dateTracker.setDate(dateTracker.getDate() - 1);
      const expectedPrevStr = toDateString(dateTracker);

      if (uniqueDatesStr[i] === expectedPrevStr) {
        streak++;
      } else {
        break; // Quebrou a sequência
      }
    }

    return streak;
  };
  
  const streak = calculateStreak();
  const availableExercises = breathingExercises.length || 12;

  // Exercício a ser exibido no card
  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  const displayExerciseId = lastSession?.exerciseId || breathingExercises[0].id;
  const displayExercise = breathingExercises.find(e => e.id === displayExerciseId) || breathingExercises[0];

  const cardLabel = lastSession ? 'Último Exercício' : 'Exercício Principal';
  const cardTitle = lastSession ? displayExercise.name : 'Iniciar Exercício';
  const cardSubtitle = `${Math.floor(displayExercise.duration / 60)} minutos • ${displayExercise.name}`;

  const navigateToExercise = () => {
    navigation.navigate('SessaoRespiracao' as any, { exerciseId: displayExercise.id } as any);
  };

  return (
    <Screen safeArea style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>RespiraJá</Text>
        </View>

        {/* Saudação */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>Olá! Como você está hoje?</Text>
          <Text style={styles.greetingSubtitle}>Pronto para encontrar seu momento de calma.</Text>
        </View>

        {/* Card Exercício Principal */}
        <Pressable 
          style={({ pressed }) => [
            styles.exerciseCard,
            pressed && { opacity: 0.9 }
          ]}
          onPress={navigateToExercise}
        >
          <View style={styles.exerciseCardTop}>
            <View style={styles.exerciseCardTopLeft}>
              <Wind color={THEME.colors.white} size={20} />
              <Text style={styles.exerciseCardLabel}>{cardLabel}</Text>
            </View>
            <View style={styles.playButton}>
              <Play color={THEME.colors.primary} size={16} fill={THEME.colors.primary} />
            </View>
          </View>
          <View style={styles.exerciseCardBottom}>
            <Text style={styles.exerciseCardTitle}>{cardTitle}</Text>
            <Text style={styles.exerciseCardDuration}>{cardSubtitle}</Text>
          </View>
        </Pressable>

        {/* Seu Progresso */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Seu Progresso</Text>
          
          <View style={styles.progressGrid}>
            
            {/* Card 1: Exercícios Disponíveis */}
            <View style={styles.progressCard}>
              <View style={[styles.progressIconContainer, { backgroundColor: THEME.colors.iconLightBlue }]}>
                <List color={THEME.colors.primary} size={20} />
              </View>
              <Text style={styles.progressValue}>{availableExercises}</Text>
              <Text style={styles.progressLabel}>EXERCÍCIOS{'\n'}DISPONÍVEIS</Text>
            </View>

            {/* Card 2: Sessões Realizadas */}
            <View style={styles.progressCard}>
              <View style={[styles.progressIconContainer, { backgroundColor: THEME.colors.iconLightBlue }]}>
                <CheckCircle color={THEME.colors.primary} size={20} />
              </View>
              <Text style={styles.progressValue}>{sessionsToday.length}</Text>
              <Text style={styles.progressLabel}>SESSÕES{'\n'}REALIZADAS HOJE</Text>
            </View>

            {/* Card 3: Tempo Total */}
            <View style={styles.progressCard}>
              <View style={[styles.progressIconContainer, { backgroundColor: THEME.colors.iconPeach }]}>
                <Timer color="#D45B3E" size={20} />
              </View>
              <Text style={styles.progressValue}>{minutesToday}m</Text>
              <Text style={styles.progressLabel}>TEMPO TOTAL{'\n'}RESPIRANDO</Text>
            </View>

            {/* Card 4: Sequência */}
            <View style={styles.progressCard}>
              <View style={[styles.progressIconContainer, { backgroundColor: THEME.colors.iconPink }]}>
                <Flame color="#E34045" size={20} />
              </View>
              <Text style={styles.progressValue}>{streak}</Text>
              <Text style={styles.progressLabel}>SEQUÊNCIA DE{'\n'}DIAS</Text>
            </View>

          </View>
        </View>

      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: THEME.colors.background,
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  greetingContainer: {
    marginTop: '6%',
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.textMain,
    lineHeight: 32,
    paddingRight: 40,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    marginTop: 4,
  },
  exerciseCard: {
    marginTop: '8%',
    minHeight: 200,
    backgroundColor: THEME.colors.primary,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: THEME.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  exerciseCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  exerciseCardTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseCardLabel: {
    color: THEME.colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseCardBottom: {
    marginBottom: 4,
  },
  exerciseCardTitle: {
    color: THEME.colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  exerciseCardDuration: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
  },
  progressSection: {
    marginTop: '8%',
    flex: 1,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME.colors.textMain,
    marginBottom: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    alignContent: 'space-between',
  },
  progressCard: {
    width: '48%',
    backgroundColor: THEME.colors.cardNeutral,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    minHeight: 130,
    justifyContent: 'center',
  },
  progressIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.textMain,
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: THEME.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 14,
  },
});
