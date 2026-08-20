import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Star } from 'lucide-react-native';

import { Screen } from '../../../shared/components/Screen';
import { Button } from '../../../shared/components/Button';
import { RootStackParamList } from '../../../shared/types/navigation';
import { useBreathingStore } from '../store/breathingStore';

type FinalizacaoSessaoRouteProp = RouteProp<RootStackParamList, 'FinalizacaoSessao'>;

const THEME = {
  colors: {
    primary: '#1557E8',
    textMain: '#171923',
    textSecondary: '#6B6D78',
    background: '#FAF8FF',
    cardNeutral: '#F4F4F7', // Ligeiramente mais escuro que F8F8FA para destacar os botões brancos
    white: '#FFFFFF',
  }
};

const MOODS = [
  { score: 5, emoji: '🤩', label: 'Muito\nmelhor' },
  { score: 4, emoji: '🙂', label: 'Melhor' },
  { score: 3, emoji: '😐', label: 'Igual' },
  { score: 2, emoji: '🙁', label: 'Pior' },
  { score: 1, emoji: '😫', label: 'Muito\npior' },
];

export const FinalizacaoSessaoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<FinalizacaoSessaoRouteProp>();
  const { sessionData } = route.params;
  
  const [moodAfter, setMoodAfter] = useState<number>(3);
  const addSession = useBreathingStore((state) => state.addSession);

  const handleSave = () => {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    addSession({
      ...sessionData,
      id,
      moodAfter,
    });

    // Voltando para Dashboard de forma segura (ignorando tipagem rigorosa do React Navigation pra simplificar)
    navigation.replace('Main', { screen: 'Dashboard' } as any);
  };

  return (
    <Screen safeArea style={styles.screen}>
      <View style={styles.content}>
        
        {/* Ícone de Sucesso */}
        <View style={styles.iconContainer}>
          <View style={styles.iconInner}>
            <Star size={36} color={THEME.colors.white} fill={THEME.colors.white} />
          </View>
        </View>

        {/* Textos de Parabéns */}
        <Text style={styles.title}>Parabéns!</Text>
        <Text style={styles.subtitle}>Você concluiu sua sessão.</Text>

        {/* Card de Humor */}
        <View style={styles.moodCard}>
          <Text style={styles.moodTitle}>Como você está se sentindo agora?</Text>
          
          <View style={styles.moodOptionsContainer}>
            {MOODS.map((mood) => {
              const isSelected = moodAfter === mood.score;
              return (
                <TouchableOpacity
                  key={mood.score}
                  style={[
                    styles.moodButton,
                    isSelected && styles.moodButtonSelected
                  ]}
                  onPress={() => setMoodAfter(mood.score)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.emojiText}>{mood.emoji}</Text>
                  <Text 
                    style={[
                      styles.moodLabel,
                      isSelected && styles.moodLabelSelected
                    ]}
                    numberOfLines={2}
                    textAlign="center"
                  >
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Salvar sessão" onPress={handleSave} style={styles.saveButton} />
        <Button 
          title="Descartar e Voltar" 
          variant="ghost" 
          onPress={() => navigation.replace('Main', { screen: 'Dashboard' } as any)} 
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: THEME.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.colors.textSecondary,
    marginBottom: 40,
  },
  moodCard: {
    width: '100%',
    backgroundColor: THEME.colors.cardNeutral,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textMain,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  moodOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  moodButton: {
    backgroundColor: THEME.colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: '#F0F4FF',
  },
  emojiText: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 10,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  moodLabelSelected: {
    color: THEME.colors.primary,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  saveButton: {
    marginBottom: 12,
  },
});
