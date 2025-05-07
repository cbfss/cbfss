// src/components/theme/ThemeSelector.jsx
import React from 'react';
import useTheme from '../../hooks/useTheme';
import ThemeColorCircle from './ThemeColorCircle';
import ThemeToggle from './ThemeToggle';
import { Palette } from 'lucide-react';

/**
 * Theme selector component with color options and dark mode toggle
 */
const ThemeSelector = ({ className = '' }) => {
  const { 
    currentThemeId, 
    themeCategories, 
    changeTheme, 
    getCurrentColorFamily 
  } = useTheme();
  
  const currentColorFamily = getCurrentColorFamily();
  
  // Flatten theme options for simplified display
  const colorOptions = [
    { id: 'blue', name: 'Blue' },
    { id: 'green', name: 'Green' },
    { id: 'purple', name: 'Purple' }
  ];
  
  const handleColorChange = (themeId) => {
    changeTheme(themeId);
  };
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
        <Palette size={18} className="text-gray-500 dark:text-gray-400" />
        
        <div className="flex space-x-1">
          {colorOptions.map((option) => (
            <ThemeColorCircle
              key={option.id}
              color={option.id}
              colorName={option.name}
              isSelected={currentColorFamily === option.id}
              onClick={handleColorChange}
            />
          ))}
        </div>
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
        
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ThemeSelector;