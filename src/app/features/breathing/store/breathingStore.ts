import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BreathingSession } from '../types';

interface BreathingState {
  sessions: BreathingSession[];
  addSession: (session: BreathingSession) => void;
  clearSessions: () => void;
}

export const useBreathingStore = create<BreathingState>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (session) =>
        set((state) => ({ sessions: [...state.sessions, session] })),
      clearSessions: () => set({ sessions: [] }),
    }),
    {
      name: 'respiraja-breathing-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
