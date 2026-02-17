import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore, getResolvedTheme, applyTheme } from './themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ mode: 'system' });
    document.documentElement.classList.remove('dark');
  });

  describe('setMode', () => {
    it('should set mode to light', () => {
      const { setMode } = useThemeStore.getState();
      
      setMode('light');
      
      expect(useThemeStore.getState().mode).toBe('light');
    });

    it('should set mode to dark', () => {
      const { setMode } = useThemeStore.getState();
      
      setMode('dark');
      
      expect(useThemeStore.getState().mode).toBe('dark');
    });

    it('should set mode to system', () => {
      useThemeStore.setState({ mode: 'dark' });
      const { setMode } = useThemeStore.getState();
      
      setMode('system');
      
      expect(useThemeStore.getState().mode).toBe('system');
    });
  });

  describe('getResolvedTheme', () => {
    it('should return light when mode is light', () => {
      expect(getResolvedTheme('light')).toBe('light');
    });

    it('should return dark when mode is dark', () => {
      expect(getResolvedTheme('dark')).toBe('dark');
    });

    it('should return based on system preference when mode is system', () => {
      // Default mock returns false for prefers-color-scheme: dark
      expect(getResolvedTheme('system')).toBe('light');
    });
  });

  describe('applyTheme', () => {
    it('should add dark class when theme is dark', () => {
      applyTheme('dark');
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class when theme is light', () => {
      document.documentElement.classList.add('dark');
      
      applyTheme('light');
      
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });
});
