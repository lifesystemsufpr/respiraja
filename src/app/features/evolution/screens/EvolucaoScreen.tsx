import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Screen } from '../../../shared/components/Screen';
import { ProgressHeader } from '../components/ProgressHeader';
import { StreakCard } from '../components/StreakCard';
import { TotalTimeCard } from '../components/TotalTimeCard';
import { WeeklySessionsCard, WeeklyData } from '../components/WeeklySessionsCard';
import { FavoriteExercisesCard, ExerciseStat } from '../components/FavoriteExercisesCard';

import { useBreathingStore } from '../../breathing/store/breathingStore';
import { breathingExercises } from '../../breathing/services/breathingPatterns';

export const EvolucaoScreen = () => {
  const sessions = useBreathingStore((state) => state.sessions);

  // Helper date formatter
  const toDateString = (dateInput: string | Date | number) => {
    const d = new Date(dateInput);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // 1. Calculate Streak
  const streakDays = useMemo(() => {
    if (!sessions || sessions.length === 0) return 0;

    const uniqueDatesStr = [...new Set(sessions.map(s => toDateString(s.finishedAt)))];
    uniqueDatesStr.sort((a, b) => b.localeCompare(a));

    const today = new Date();
    const todayStr = toDateString(today);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = toDateString(yesterday);

    const mostRecentStr = uniqueDatesStr[0];

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
        break;
      }
    }
    return streak;
  }, [sessions]);

  // 2. Calculate Total Time (hours)
  const totalTimeHours = useMemo(() => {
    const totalSeconds = sessions.reduce((acc, curr) => acc + curr.duration, 0);
    return totalSeconds / 3600;
  }, [sessions]);

  // 3. Weekly Data (Mon - Sun)
  const weeklyData = useMemo<WeeklyData[]>(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - diffToMonday);
    
    const daysLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    
    return daysLabels.map((label, index) => {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + index);
      const currentDayStr = toDateString(currentDay);
      
      const count = sessions.filter(s => toDateString(s.finishedAt) === currentDayStr).length;
      
      return {
        day: label,
        count,
        isToday: currentDayStr === toDateString(today)
      };
    });
  }, [sessions]);

  // 4. Favorite Exercises
  const favoriteExercisesData = useMemo<ExerciseStat[]>(() => {
    if (sessions.length === 0) return [];
    
    const exerciseCounts: Record<string, number> = {};
    sessions.forEach(s => {
      exerciseCounts[s.exerciseId] = (exerciseCounts[s.exerciseId] || 0) + 1;
    });
    
    const totalSessions = sessions.length;
    const favoriteStats = Object.keys(exerciseCounts).map(id => {
      const ex = breathingExercises.find(e => e.id === id);
      return {
        id,
        name: ex ? ex.name : id,
        percentage: (exerciseCounts[id] / totalSessions) * 100,
        count: exerciseCounts[id]
      };
    }).sort((a, b) => b.count - a.count);

    const colorsList = ['#1557E8', '#2F6ED8', '#E85D24', '#F6AD55'];
    
    return favoriteStats.slice(0, 3).map((stat, idx) => ({
      ...stat,
      color: colorsList[idx] || colorsList[0]
    }));
  }, [sessions]);

  return (
    <Screen safeArea style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ProgressHeader />
        
        <StreakCard streak={streakDays} />
        <TotalTimeCard totalHours={totalTimeHours} />

        <WeeklySessionsCard data={weeklyData} />
        
        {favoriteExercisesData.length > 0 && (
          <FavoriteExercisesCard data={favoriteExercisesData} />
        )}

      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FAF8FF',
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});
