import React from 'react';
import useTheme from '../../hooks/useTheme';

/**
 * Renders a color circle for theme selection
 */
const ThemeColorCircle = ({ 
  color, 
  colorName,
  isSelected = false,
  onClick
}) => {
  const { isDarkMode } = useTheme();
  
  // Generate the theme ID based on the current mode and selected color
  const themeId = `${isDarkMode ? 'dark' : 'light'}-${color}`;
  
  return (
    <button
      className={`
        relative w-8 h-8 rounded-full 
        ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
        cursor-pointer transition-all duration-200
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
      style={{ backgroundColor: `var(--color-${color}-500)` }}
      onClick={() => onClick(themeId)}
      aria-label={`Switch to ${colorName} theme`}
      title={colorName}
    >
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-2 h-2 bg-white rounded-full"></span>
        </span>
      )}
    </button>
  );
};

export default ThemeColorCircle;
