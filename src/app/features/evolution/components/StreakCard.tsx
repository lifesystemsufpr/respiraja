import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';

interface StreakCardProps {
  streak: number;
}

export const StreakCard = ({ streak }: StreakCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.glow} />
      <View style={styles.topRow}>
        <Flame size={16} color="#E85D24" />
        <Text style={styles.label}>SEQUÊNCIA ATUAL</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.value}>{streak}</Text>
        <Text style={styles.unit}>Dias</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 110,
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  glow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE0D5',
    opacity: 0.6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B6D78',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E85D24',
    lineHeight: 46, // Aligns better with text
  },
  unit: {
    fontSize: 15,
    color: '#6B6D78',
    marginLeft: 8,
    marginBottom: 6,
  }
});
