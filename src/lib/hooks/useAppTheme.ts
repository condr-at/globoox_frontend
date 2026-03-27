'use client';

import { useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AppPalette = 'globoox' | 'default';
export type AppMode = 'light' | 'dark' | 'system';
export type AppThemeClass = 'light' | 'dark' | 'forest-light' | 'forest-dark';

const THEME_CLASSES: AppThemeClass[] = ['light', 'dark', 'forest-light', 'forest-dark'];

function resolveClass(mode: AppMode, palette: AppPalette): AppThemeClass {
  const dark =
    mode === 'dark' ||
    (mode === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  return palette === 'globoox' ? (dark ? 'forest-dark' : 'forest-light') : (dark ? 'dark' : 'light');
}

function applyClass(cls: AppThemeClass) {
  const el = document.documentElement;
  el.classList.remove(...THEME_CLASSES);
  el.classList.add(cls);
}

type AppThemeState = {
  mode: AppMode;
  palette: AppPalette;
  setAppTheme: (mode: AppMode, palette: AppPalette) => void;
};

const useAppThemeStore = create<AppThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      palette: 'globoox',
      setAppTheme: (mode, palette) => set({ mode, palette }),
    }),
    {
      name: 'globoox-app-theme',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mode: state.mode,
        palette: state.palette,
      }),
    },
  ),
);

export function useAppTheme() {
  const mode = useAppThemeStore((state) => state.mode);
  const palette = useAppThemeStore((state) => state.palette);
  const setThemeState = useAppThemeStore((state) => state.setAppTheme);

  useEffect(() => {
    applyClass(resolveClass(mode, palette));
  }, [mode, palette]);

  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyClass(resolveClass('system', palette));
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode, palette]);

  const setAppTheme = (newMode: AppMode, newPalette: AppPalette) => {
    setThemeState(newMode, newPalette);
    applyClass(resolveClass(newMode, newPalette));
  };

  return {
    mode,
    palette,
    theme: resolveClass(mode, palette) as AppThemeClass,
    setAppTheme,
  };
}
