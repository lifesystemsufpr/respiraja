import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const THEME = {
  colors: {
    textMain: '#171923',
    textSecondary: '#6B6D78',
  }
};

export const ProgressHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua Jornada</Text>
      <Text style={styles.subtitle}>Aqui está um resumo do seu progresso.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: THEME.colors.textMain,
  },
  subtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 4,
  }
});
