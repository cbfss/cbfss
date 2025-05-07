// src/components/theme/ThemeToggle.jsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import useTheme from '../../hooks/useTheme';

/**
 * Simple toggle button for switching between light and dark mode
 */
const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
