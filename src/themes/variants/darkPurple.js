import defaultTheme from '../defaultTheme';

const darkPurpleTheme = {
  ...defaultTheme,
  
  // Theme metadata
  id: 'dark-purple',
  name: 'Dark Purple',
  isDark: true,
  
  // Color palette
  colors: {
    // Brand colors
    primary: {
      50: '#1f0033',
      100: '#3d0066',
      200: '#5c0099',
      300: '#7a00cc',
      400: '#9900ff',
      500: '#ad33ff', // Main primary color
      600: '#c266ff',
      700: '#d699ff',
      800: '#ebccff',
      900: '#f5e6ff',
    },
    
    // Secondary brand color
    secondary: {
      50: '#140033',
      100: '#290066',
      200: '#3d0099',
      300: '#5200cc',
      400: '#6600ff',
      500: '#8533ff', // Main secondary color
      600: '#a366ff',
      700: '#c299ff',
      800: '#e0ccff',
      900: '#f0e6ff',
    },
    
    // Accent color for highlights
    accent: {
      50: '#260033',
      100: '#4d0066',
      200: '#730099',
      300: '#9900cc',
      400: '#bf00ff',
      500: '#cc33ff', // Main accent color
      600: '#d966ff',
      700: '#e599ff',
      800: '#f2ccff',
      900: '#f9e6ff',
    },
    
    // Semantic colors
    success: {
      50: '#012413',
      100: '#014827',
      200: '#026d3a',
      300: '#03914e',
      400: '#04b661',
      500: '#36c480', // Main success color
      600: '#68d3a0',
      700: '#9be1c0',
      800: '#cdf0df',
      900: '#e6f7ef',
    },
    
    warning: {
      50: '#332900',
      100: '#665200',
      200: '#997a00',
      300: '#cca300',
      400: '#ffcc00',
      500: '#ffd633', // Main warning color
      600: '#ffe066',
      700: '#ffeb99',
      800: '#fff5cc',
      900: '#fffae6',
    },
    
    error: {
      50: '#2f0e0e',
      100: '#5e1c1c',
      200: '#8d2a2a',
      300: '#bc3838',
      400: '#eb4646',
      500: '#ef6b6b', // Main error color
      600: '#f39090',
      700: '#f7b5b5',
      800: '#fbdada',
      900: '#fdeded',
    },
    
    info: {
      50: '#001433',
      100: '#002966',
      200: '#003d99',
      300: '#0052cc',
      400: '#0066ff',
      500: '#3385ff', // Main info color
      600: '#66a3ff',
      700: '#99c2ff',
      800: '#cce0ff',
      900: '#e6f0ff',
    },
    
    // Grayscale
    gray: {
      50: '#111827',
      100: '#1f2937',
      200: '#374151',
      300: '#4b5563',
      400: '#6b7280',
      500: '#9ca3af',
      600: '#d1d5db',
      700: '#e5e7eb',
      800: '#f3f4f6',
      900: '#f9fafb',
    },
    
    // Base UI colors
    background: {
      primary: '#111827',
      secondary: '#1f2937',
      tertiary: '#374151',
    },
    
    text: {
      primary: '#f9fafb',
      secondary: '#e5e7eb',
      tertiary: '#9ca3af',
      inverse: '#111827',
    },
    
    border: {
      light: '#374151',
      medium: '#4b5563',
      dark: '#6b7280',
    },
  },
};

export default darkPurpleTheme;