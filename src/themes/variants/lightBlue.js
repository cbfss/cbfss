import defaultTheme from '../defaultTheme';

const lightBlueTheme = {
  ...defaultTheme,
  
  // Theme metadata
  id: 'light-blue',
  name: 'Light Blue',
  isDark: false,
  
  // Color palette
  colors: {
    // Brand colors
    primary: {
      50: '#e6f1ff',
      100: '#cce3ff',
      200: '#99c8ff',
      300: '#66adff',
      400: '#3392ff',
      500: '#0077ff', // Main primary color
      600: '#005ecb',
      700: '#004698',
      800: '#002e64',
      900: '#001732',
    },
    
    // Secondary brand color
    secondary: {
      50: '#e6f9ff',
      100: '#ccf3ff',
      200: '#99e8ff',
      300: '#66ddff',
      400: '#33d2ff',
      500: '#00c7ff', // Main secondary color
      600: '#009fc7',
      700: '#007795',
      800: '#004e64',
      900: '#002732',
    },
    
    // Accent color for highlights
    accent: {
      50: '#ebf9ff',
      100: '#d7f3ff',
      200: '#afe8ff',
      300: '#87dcff',
      400: '#5fd1ff',
      500: '#37c5ff', // Main accent color
      600: '#2c9ecc',
      700: '#217699',
      800: '#164f66',
      900: '#0b2733',
    },
    
    // Semantic colors
    success: {
      50: '#e6f7ef',
      100: '#cdf0df',
      200: '#9be1c0',
      300: '#68d3a0',
      400: '#36c480',
      500: '#04b661', // Main success color
      600: '#03914e',
      700: '#026d3a',
      800: '#014827',
      900: '#012413',
    },
    
    warning: {
      50: '#fffae6',
      100: '#fff5cc',
      200: '#ffeb99',
      300: '#ffe066',
      400: '#ffd633',
      500: '#ffcc00', // Main warning color
      600: '#cca300',
      700: '#997a00',
      800: '#665200',
      900: '#332900',
    },
    
    error: {
      50: '#fdeded',
      100: '#fbdada',
      200: '#f7b5b5',
      300: '#f39090',
      400: '#ef6b6b',
      500: '#eb4646', // Main error color
      600: '#bc3838',
      700: '#8d2a2a',
      800: '#5e1c1c',
      900: '#2f0e0e',
    },
    
    info: {
      50: '#e6f0ff',
      100: '#cce0ff',
      200: '#99c2ff',
      300: '#66a3ff',
      400: '#3385ff',
      500: '#0066ff', // Main info color
      600: '#0052cc',
      700: '#003d99',
      800: '#002966',
      900: '#001433',
    },
    
    // Grayscale
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    
    // Base UI colors
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
    },
    
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      tertiary: '#9ca3af',
      inverse: '#ffffff',
    },
    
    border: {
      light: '#e5e7eb',
      medium: '#d1d5db',
      dark: '#9ca3af',
    },
  },
};

export default lightBlueTheme;