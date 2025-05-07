import lightBlueTheme from './variants/lightBlue';
import darkBlueTheme from './variants/darkBlue';
import lightGreenTheme from './variants/lightGreen';
import darkGreenTheme from './variants/darkGreen';
import lightPurpleTheme from './variants/lightPurple';
import darkPurpleTheme from './variants/darkPurple';

// Group all themes in a single object for easy access
const themes = {
  'light-blue': lightBlueTheme,
  'dark-blue': darkBlueTheme,
  'light-green': lightGreenTheme,
  'dark-green': darkGreenTheme,
  'light-purple': lightPurpleTheme,
  'dark-purple': darkPurpleTheme,
};

// Theme categories for UI organization
export const themeCategories = [
  {
    name: 'Blue',
    themes: [
      { id: 'light-blue', name: 'Light Blue', isDark: false },
      { id: 'dark-blue', name: 'Dark Blue', isDark: true },
    ],
  },
  {
    name: 'Green',
    themes: [
      { id: 'light-green', name: 'Light Green', isDark: false },
      { id: 'dark-green', name: 'Dark Green', isDark: true },
    ],
  },
  {
    name: 'Purple',
    themes: [
      { id: 'light-purple', name: 'Light Purple', isDark: false },
      { id: 'dark-purple', name: 'Dark Purple', isDark: true },
    ],
  },
];

// Export themes as default
export default themes;