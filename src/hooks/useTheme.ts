import { useEffect } from 'react';
import { useThemeStore, applyTheme, getResolvedTheme } from '@/store/themeStore';

export function useTheme() {
  const { mode, setMode } = useThemeStore();

  useEffect(() => {
    // Apply theme on mount and when mode changes
    applyTheme(mode);

    // Listen for system theme changes when in 'system' mode
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        applyTheme('system');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);

  const resolvedTheme = getResolvedTheme(mode);

  const toggleTheme = () => {
    // Cycle through: system -> light -> dark -> system
    if (mode === 'system') {
      setMode('light');
    } else if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('system');
    }
  };

  return {
    mode,
    resolvedTheme,
    setMode,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
  };
}
