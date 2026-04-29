import { create } from 'zustand';

// ============================================================
// Client-side state management with Zustand
// ============================================================

interface ProgressState {
  /** Per-chapter progress overrides (persisted to localStorage) */
  progress: Record<string, number>;
  /** Per-chapter unlock overrides */
  unlocked: Record<string, boolean>;
  /** Update progress for a chapter */
  setProgress: (chapterId: string, value: number) => void;
  /** Unlock a chapter */
  unlock: (chapterId: string) => void;
  /** Get effective progress (override or default) */
  getProgress: (chapterId: string, defaultProgress: number) => number;
  /** Get effective unlock state */
  isUnlocked: (chapterId: string, defaultUnlocked: boolean) => boolean;
}

const STORAGE_KEY = 'mathmosaic-progress';

function loadPersistedState(): { progress: Record<string, number>; unlocked: Record<string, boolean> } {
  if (typeof window === 'undefined') return { progress: {}, unlocked: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted localStorage, ignore
  }
  return { progress: {}, unlocked: {} };
}

function persistState(state: { progress: Record<string, number>; unlocked: Record<string, boolean> }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable
  }
}

export const useProgressStore = create<ProgressState>((set, get) => {
  const persisted = loadPersistedState();

  return {
    progress: persisted.progress,
    unlocked: persisted.unlocked,

    setProgress: (chapterId, value) => {
      set(state => {
        const next = { ...state.progress, [chapterId]: Math.max(0, Math.min(100, value)) };
        persistState({ progress: next, unlocked: state.unlocked });
        return { progress: next };
      });
    },

    unlock: (chapterId) => {
      set(state => {
        const next = { ...state.unlocked, [chapterId]: true };
        persistState({ progress: state.progress, unlocked: next });
        return { unlocked: next };
      });
    },

    getProgress: (chapterId, defaultProgress) => {
      const override = get().progress[chapterId];
      return override !== undefined ? override : defaultProgress;
    },

    isUnlocked: (chapterId, defaultUnlocked) => {
      const override = get().unlocked[chapterId];
      return override !== undefined ? override : defaultUnlocked;
    },
  };
});
