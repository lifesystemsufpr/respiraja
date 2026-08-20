import { useState, useEffect, useRef } from 'react';
import { BreathingExercise, BreathingPhase } from '../types';

interface BreathingSessionState {
  status: 'idle' | 'running' | 'paused' | 'completed';
  phase: BreathingPhase;
  remainingSeconds: number;
  currentStepIndex: number;
  currentCycle: number;
  totalElapsedSeconds: number;
}

export const useBreathingSession = (exercise: BreathingExercise) => {
  const [state, setState] = useState<BreathingSessionState>({
    status: 'idle',
    phase: exercise.steps[0].phase,
    remainingSeconds: exercise.steps[0].duration,
    currentStepIndex: 0,
    currentCycle: 1,
    totalElapsedSeconds: 0,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.status === 'running') {
      timerRef.current = setInterval(() => {
        setState((prev) => {
          let {
            remainingSeconds,
            currentStepIndex,
            currentCycle,
            phase,
            totalElapsedSeconds,
          } = prev;

          remainingSeconds -= 1;
          totalElapsedSeconds += 1;

          if (remainingSeconds <= 0) {
            currentStepIndex += 1;
            
            if (currentStepIndex >= exercise.steps.length) {
              currentStepIndex = 0;
              currentCycle += 1;
            }
            
            phase = exercise.steps[currentStepIndex].phase;
            remainingSeconds = exercise.steps[currentStepIndex].duration;
          }

          if (totalElapsedSeconds >= exercise.duration) {
            return {
              ...prev,
              status: 'completed',
              totalElapsedSeconds,
            };
          }

          return {
            ...prev,
            remainingSeconds,
            currentStepIndex,
            currentCycle,
            phase,
            totalElapsedSeconds,
          };
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.status, exercise]);

  const start = () => setState((s) => ({ ...s, status: 'running' }));
  const pause = () => setState((s) => ({ ...s, status: 'paused' }));
  const resume = () => setState((s) => ({ ...s, status: 'running' }));
  const stop = () => setState((s) => ({ ...s, status: 'completed' }));

  return {
    state,
    start,
    pause,
    resume,
    stop,
  };
};
