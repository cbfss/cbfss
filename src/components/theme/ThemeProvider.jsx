import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentThemeId } from '../../store/slices/themeSlice';
import { getThemeById, applyTheme } from '../../themes';

/**
 * ThemeProvider component
 * Applies the current theme to the document root
 */
const ThemeProvider = ({ children }) => {
  // Get current theme ID from Redux
  const currentThemeId = useSelector(selectCurrentThemeId);
  
  // Apply theme whenever the ID changes
  useEffect(() => {
    if (!currentThemeId) return;
    
    const theme = getThemeById(currentThemeId);
    if (theme) {
      applyTheme(theme);
      
      // Update meta theme-color for mobile devices
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.content = theme.colors.primary[500];
      }
    }
  }, [currentThemeId]);
  
  return <>{children}</>;
};

export default ThemeProvider;
