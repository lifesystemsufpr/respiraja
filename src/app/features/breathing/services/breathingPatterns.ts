import { BreathingExercise } from '../types';

export const breathingExercises: BreathingExercise[] = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    description: 'Equilibra o sistema nervoso e melhora o foco.',
    duration: 300, // 5 minutes default
    steps: [
      { phase: 'inhale', duration: 4 },
      { phase: 'hold', duration: 4 },
      { phase: 'exhale', duration: 4 },
      { phase: 'pause', duration: 4 },
    ],
  },
  {
    id: '4-7-8',
    name: 'Respiração 4-7-8',
    description: 'Ajuda a relaxar rapidamente e facilita o sono.',
    duration: 300,
    steps: [
      { phase: 'inhale', duration: 4 },
      { phase: 'hold', duration: 7 },
      { phase: 'exhale', duration: 8 },
    ],
  },
  {
    id: 'slow-breathing',
    name: 'Respiração Lenta',
    description: 'Acalma a mente e reduz a ansiedade.',
    duration: 300,
    steps: [
      { phase: 'inhale', duration: 4 },
      { phase: 'exhale', duration: 6 },
    ],
  },
  {
    id: 'diaphragmatic',
    name: 'Respiração Diafragmática',
    description: 'Fortalece o diafragma e diminui a frequência cardíaca.',
    duration: 300,
    steps: [
      { phase: 'inhale', duration: 4 },
      { phase: 'exhale', duration: 6 },
    ],
  },
];
