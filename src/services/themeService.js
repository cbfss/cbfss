// src/services/themeService.js
import { getThemeById, getDefaultThemeId } from '../themes';

const THEME_STORAGE_KEY = 'app_theme_preference';


const themeService = {
  /**
   * Get the user's saved theme ID from local storage
   * @returns {string|null} Theme ID or null if not found
   */
  getSavedThemeId: () => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
      console.error('Error accessing local storage:', error);
      return null;
    }
  },

  /**
   * Save the user's theme preference to local storage
   * @param {string} themeId - The theme ID to save
   * @returns {boolean} Success status
   */
  saveThemePreference: (themeId) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
      return true;
    } catch (error) {
      console.error('Error saving theme preference:', error);
      return false;
    }
  },

  /**
   * Get the user's preferred theme
   * Checks local storage first, then system preference, then falls back to default
   * @returns {Object} Theme object
   */
  getUserPreferredTheme: () => {
    // Check local storage first
    const savedThemeId = themeService.getSavedThemeId();
    if (savedThemeId) {
      const savedTheme = getThemeById(savedThemeId);
      if (savedTheme) return savedTheme;
    }

    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // User prefers dark theme
      return getThemeById('dark-blue');
    }

    // Fall back to default theme
    return getThemeById(getDefaultThemeId());
  },
  
  /**
   * Initialize theme based on user preferences
   * @returns {Object} The applied theme
   */
  initializeTheme: () => {
    const theme = themeService.getUserPreferredTheme();
    // Note: actual theme application happens in ThemeProvider component
    return theme;
  },
  
  /**
   * Check if system prefers dark color scheme
   * @returns {boolean} True if system prefers dark mode
   */
  systemPrefersDarkMode: () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  },
  
  /**
   * Watch for system color scheme changes
   * @param {Function} callback - Function to call when preference changes
   * @returns {Function} Function to remove the listener
   */
  watchSystemColorScheme: (callback) => {
    if (!window.matchMedia) return () => {};
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e) => {
      callback(e.matches);
    };
    
    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
    }
    
    // Return function to remove listener
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }
};

export default themeService;