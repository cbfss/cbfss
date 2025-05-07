import defaultTheme from '../defaultTheme';

const darkTealTheme = {
  ...defaultTheme,
  id: 'dark-teal',
  name: 'Dark Teal',
  isDark: true,
  colors: {
    // Brand colors
    primary: {
      50: '#002319',
      100: '#004633',
      200: '#00694c',
      300: '#008c66',
      400: '#00af81',
      500: '#33bf9a',
      600: '#66cfb3',
      700: '#99dfcd',
      800: '#ccefe6',
      900: '#e6f7f2',
    },
   
    // Secondary brand color
    secondary: {
      50: '#002626',
      100: '#004c4c',
      200: '#007373',
      300: '#009999',
      400: '#00bfbf',
      500: '#33cccc',
      600: '#66d9d9',
      700: '#99e6e6',
      800: '#ccf2f2',
      900: '#e6f9f9',
    },
   
    // Accent color for highlights
    accent: {
      50: '#001f1f',
      100: '#003d3d',
      200: '#005c5c',
      300: '#007a7a',
      400: '#009999',
      500: '#33adad',
      600: '#66c2c2',
      700: '#99d6d6',
      800: '#ccebeb',
      900: '#e6f5f5',
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
      primary: '#001a1a',
      secondary: '#003333',
      tertiary: '#004d4d',
    },
   
    text: {
      primary: '#ffffff',
      secondary: '#f2f2f2',
      tertiary: '#cccccc',
      inverse: '#001a1a',
    },
   
    border: {
      light: '#003333',
      medium: '#004d4d',
      dark: '#006666',
    },
  },
};

export default darkTealTheme;