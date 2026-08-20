import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Wind } from 'lucide-react-native';

import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { RootStackParamList } from '../../../shared/types/navigation';
import { breathingExercises } from '../services/breathingPatterns';
import { BreathingExercise } from '../types';
import { colors, spacing } from '../../../shared/theme';

export const ExerciciosScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelect = (exercise: BreathingExercise) => {
    navigation.navigate('SessaoRespiracao', { exerciseId: exercise.id });
  };

  const renderItem = ({ item }: { item: BreathingExercise }) => (
    <Card style={styles.card} onPress={() => handleSelect(item)}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Wind color={colors.primary} size={24} />
        </View>
        <View style={styles.cardTitleContainer}>
          <Typography variant="h3">{item.name}</Typography>
          <Typography variant="caption">{Math.floor(item.duration / 60)} min aprox.</Typography>
        </View>
      </View>
      <Typography variant="body" color={colors.muted} style={styles.description}>
        {item.description}
      </Typography>
      <Button 
        title="Iniciar sessão" 
        variant="outline" 
        onPress={() => handleSelect(item)} 
        style={styles.button}
      />
    </Card>
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="h2">Exercícios</Typography>
        <Typography variant="body" color={colors.muted}>
          Escolha um padrão para praticar agora
        </Typography>
      </View>
      
      <FlatList
        data={breathingExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: spacing.lg,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F4FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardTitleContainer: {
    flex: 1,
  },
  description: {
    marginBottom: spacing.lg,
  },
  button: {
    height: 48,
  },
});
