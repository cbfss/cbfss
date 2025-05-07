// src/hooks/useTheme.js
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  initializeTheme, 
  changeTheme, 
  toggleDarkMode, 
  setSystemColorScheme,
  selectCurrentThemeId,
  selectThemeStatus,
  selectThemeError,
  selectSystemPrefersDark
} from '../store/slices/themeSlice';
import { getThemeById, getThemeCategories } from '../themes';
import themeService from '../services/themeService';

/**
 * Custom hook for theme management
 * @returns {Object} Theme-related state and methods
 */
const useTheme = () => {
  const dispatch = useDispatch();
  
  // Select theme-related state from Redux
  const currentThemeId = useSelector(selectCurrentThemeId);
  const status = useSelector(selectThemeStatus);
  const error = useSelector(selectThemeError);
  const systemPrefersDark = useSelector(selectSystemPrefersDark);
  
  // Get the current theme object based on the ID
  const currentTheme = getThemeById(currentThemeId);
  
  // Get all theme categories for UI
  const themeCategories = getThemeCategories();
  
  // Initialize theme on component mount
  useEffect(() => {
    dispatch(initializeTheme());
    
    // Set the initial system color scheme preference
    dispatch(setSystemColorScheme(themeService.systemPrefersDarkMode()));
    
    // Watch for system color scheme changes
    const unwatch = themeService.watchSystemColorScheme((prefersDark) => {
      dispatch(setSystemColorScheme(prefersDark));
    });
    
    // Clean up the watcher on component unmount
    return () => {
      unwatch();
    };
  }, [dispatch]);
  
  // Theme changing handler
  const handleThemeChange = useCallback((themeId) => {
    dispatch(changeTheme(themeId));
  }, [dispatch]);
  
  // Dark mode toggle handler
  const handleToggleDarkMode = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);
  
  // Check if the current theme is dark mode
  const isDarkMode = currentTheme?.isDark || false;
  
  // Check if the current theme uses a specific color family
  const getCurrentColorFamily = useCallback(() => {
    if (!currentThemeId) return null;
    
    // Extract color from theme ID (format: "mode-color")
    const [_, color] = currentThemeId.split('-');
    return color || null;
  }, [currentThemeId]);
  
  // Get the name of the current color family
  const getCurrentColorFamilyName = useCallback(() => {
    const colorFamily = getCurrentColorFamily();
    if (!colorFamily) return null;
    
    // Find the category that contains this color family
    const category = themeCategories.find(cat => 
      cat.themes.some(theme => theme.id.includes(`-${colorFamily}`))
    );
    
    return category?.name || null;
  }, [getCurrentColorFamily, themeCategories]);
  
  // Change only the color family while preserving light/dark mode
  const changeColorFamily = useCallback((colorFamily) => {
    if (!colorFamily || !currentThemeId) return;
    
    // Extract current mode
    const [mode, _] = currentThemeId.split('-');
    
    // Create new theme ID
    const newThemeId = `${mode}-${colorFamily}`;
    
    // Verify the theme exists before changing
    const newTheme = getThemeById(newThemeId);
    if (newTheme) {
      dispatch(changeTheme(newThemeId));
    }
  }, [dispatch, currentThemeId]);
  
  return {
    currentThemeId,
    currentTheme,
    status,
    error,
    systemPrefersDark,
    themeCategories,
    isDarkMode,
    changeTheme: handleThemeChange,
    toggleDarkMode: handleToggleDarkMode,
    getCurrentColorFamily,
    getCurrentColorFamilyName,
    changeColorFamily
  };
};

export default useTheme;