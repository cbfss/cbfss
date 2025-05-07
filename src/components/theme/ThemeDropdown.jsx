import React, { useState, useRef, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import { Palette, ChevronDown, Moon, Sun } from 'lucide-react';

/**
 * Theme selector dropdown for header/sidebar use
 */
const ThemeDropdown = ({ className = '' }) => {
  const { 
    currentThemeId, 
    themeCategories, 
    changeTheme,
    isDarkMode,
    toggleDarkMode,
    getCurrentColorFamilyName
  } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const currentColorName = getCurrentColorFamilyName() || 'Blue';
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Palette size={18} className="text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentColorName} {isDarkMode ? 'Dark' : 'Light'}
        </span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-2">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme Mode</h3>
            {/* <button
              className="mt-2 flex items-center w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => {
                toggleDarkMode();
                setIsOpen(false);
              }}
            >
              {isDarkMode ? (
                <>
                  <Sun size={18} className="text-yellow-500 mr-2" />
                  <span className="text-sm">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={18} className="text-blue-500 mr-2" />
                  <span className="text-sm">Dark Mode</span>
                </>
              )}
            </button> */}
          </div>
          
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Color Theme</h3>
            <div className="mt-2 space-y-1">
              {themeCategories.map((category) => {
                const themeId = `${isDarkMode ? 'dark' : 'light'}-${category.name.toLowerCase()}`;
                const isActive = currentColorName === category.name;
                
                return (
                  <button
                    key={category.name}
                    className={`
                      flex items-center w-full p-2 rounded
                      ${isActive ? 'bg-blue-50 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} 
                      transition-colors
                    `}
                    onClick={() => {
                      changeTheme(themeId);
                      setIsOpen(false);
                    }}
                  >
                    <span 
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ 
                        backgroundColor: `var(--color-${category.name.toLowerCase()}-500)` 
                      }}
                    />
                    <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;