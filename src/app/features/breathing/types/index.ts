export type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

export interface BreathingStep {
  phase: BreathingPhase;
  duration: number; // in seconds
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds (approximate default duration)
  steps: BreathingStep[];
}

export interface BreathingSession {
  id: string;
  exerciseId: string;
  startedAt: string;
  finishedAt: string;
  duration: number; // in seconds
  moodBefore?: number; // 1 to 5
  moodAfter?: number; // 1 to 5
}
