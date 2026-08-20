import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Timer } from 'lucide-react-native';

interface TotalTimeCardProps {
  totalHours: number; // For simplicity, could be a decimal
}

export const TotalTimeCard = ({ totalHours }: TotalTimeCardProps) => {
  const formattedHours = totalHours.toFixed(1);

  return (
    <View style={styles.card}>
      <View style={styles.glow} />
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Timer size={14} color="#1557E8" />
        </View>
        <Text style={styles.label}>TEMPO TOTAL</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.value}>{formattedHours}</Text>
        <Text style={styles.unit}>Horas</Text>
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
    marginBottom: 24,
  },
  glow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 60,
    backgroundColor: '#DDE8FF',
    opacity: 0.3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DDE8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B6D78',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  value: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1557E8',
    lineHeight: 46,
  },
  unit: {
    fontSize: 15,
    color: '#6B6D78',
    marginLeft: 8,
    marginBottom: 6,
  }
});
