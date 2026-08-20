import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ExerciseStat {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

interface FavoriteExercisesCardProps {
  data: ExerciseStat[];
}

export const FavoriteExercisesCard = ({ data }: FavoriteExercisesCardProps) => {
  // Sort data by percentage descending just in case
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);
  const topExercise = sortedData[0];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Exercícios Favoritos</Text>
      
      <View style={styles.chartContainer}>
        {/* Minimalist Donut Approximation */}
        <View style={styles.circleTrack}>
          {/* Subtle colored border representing the main stat visually */}
          <View style={[styles.circleInner, { borderColor: topExercise?.color || '#DDE8FF' }]}>
            <Text style={styles.percentageText}>
              {topExercise ? `${Math.round(topExercise.percentage)}%` : '0%'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.legendContainer}>
        {sortedData.map((item, idx) => (
          <View key={item.id} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171923',
    marginBottom: 24,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  circleTrack: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F4F4F7', // Very light background for the track
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: '#FFFFFF',
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    // The top exercise color will be applied inline to the border
  },
  percentageText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1557E8',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12, // React Native 0.71+ support gap in flex
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    marginBottom: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#6B6D78',
    fontWeight: '500',
  }
});
