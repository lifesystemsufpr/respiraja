import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface WeeklyData {
  day: string;
  count: number;
  isToday: boolean;
}

interface WeeklySessionsCardProps {
  data: WeeklyData[];
}

export const WeeklySessionsCard = ({ data }: WeeklySessionsCardProps) => {
  const maxCount = Math.max(...data.map(d => d.count), 4); // Min scale of 4

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Sessões da Semana</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Esta Semana</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {/* Linhas horizontais muito discretas */}
        <View style={styles.gridLines}>
          <View style={styles.gridLine} />
          <View style={styles.gridLine} />
          <View style={styles.gridLine} />
          <View style={styles.gridLine} />
        </View>

        <View style={styles.barsContainer}>
          {data.map((item, index) => {
            const heightPercent = (item.count / maxCount) * 100;
            return (
              <View key={index} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View 
                    style={[
                      styles.barFill, 
                      { height: `${heightPercent}%` },
                      item.isToday && styles.barFillToday
                    ]} 
                  />
                </View>
                <Text style={[styles.dayLabel, item.isToday && styles.dayLabelToday]}>
                  {item.day}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 230,
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171923',
  },
  badge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 9,
    color: '#6B6D78',
    fontWeight: '500',
  },
  chartContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingBottom: 24, // Espaço dos labels
  },
  gridLine: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  barCol: {
    alignItems: 'center',
    width: 24,
    height: '100%',
  },
  barTrack: {
    flex: 1,
    width: 8,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barFill: {
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  barFillToday: {
    backgroundColor: '#1557E8',
  },
  dayLabel: {
    fontSize: 9,
    color: '#A0AEC0',
  },
  dayLabelToday: {
    color: '#1557E8',
    fontWeight: '600',
  },
});
