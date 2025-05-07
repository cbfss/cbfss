import defaultTheme from '../defaultTheme';

const darkIndigoTheme = {
  ...defaultTheme,
  id: 'dark-indigo',
  name: 'Dark Indigo',
  isDark: true,
  colors: {
    // Brand colors
    primary: {
      50: '#000033',
      100: '#000066',
      200: '#000099',
      300: '#0000cc',
      400: '#0000ff',
      500: '#3333ff',
      600: '#6666ff',
      700: '#9999ff',
      800: '#ccccff',
      900: '#e6e6ff',
    },
   
    // Secondary brand color
    secondary: {
      50: '#140033',
      100: '#290066',
      200: '#3d0099',
      300: '#5200cc',
      400: '#6600ff',
      500: '#8533ff',
      600: '#a366ff',
      700: '#c199ff',
      800: '#e0ccff',
      900: '#f0e6ff',
    },
   
    // Accent color for highlights
    accent: {
      50: '#190033',
      100: '#330066',
      200: '#4c0099',
      300: '#6600cc',
      400: '#7f00ff',
      500: '#9933ff',
      600: '#b366ff',
      700: '#cc99ff',
      800: '#e5ccff',
      900: '#f2e6ff',
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
      primary: '#000022',
      secondary: '#000044',
      tertiary: '#000066',
    },
   
    text: {
      primary: '#ffffff',
      secondary: '#f2f2f2',
      tertiary: '#cccccc',
      inverse: '#000022',
    },
   
    border: {
      light: '#000044',
      medium: '#000066',
      dark: '#000088',
    },
  },
};

export default darkIndigoTheme;