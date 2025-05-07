import defaultTheme from '../defaultTheme';

const darkRedTheme = {
    ...defaultTheme,
    id: 'dark-red',
    name: 'Dark Red',
    isDark: true,
    colors: {
      // Brand colors
      primary: {
        50: '#330000',
        100: '#660000',
        200: '#990000',
        300: '#cc0000',
        400: '#ff0000',
        500: '#ff3333',
        600: '#ff6666',
        700: '#ff9999',
        800: '#ffcccc',
        900: '#ffe6e6',
      },
     
      // Secondary brand color
      secondary: {
        50: '#331600',
        100: '#662d00',
        200: '#994300',
        300: '#cc5a00',
        400: '#ff7100',
        500: '#ff8b1a',
        600: '#ffa54d',
        700: '#ffbf80',
        800: '#ffdab3',
        900: '#fff0e6',
      },
     
      // Accent color for highlights
      accent: {
        50: '#170033',
        100: '#2e0066',
        200: '#450099',
        300: '#5c00cc',
        400: '#7300ff',
        500: '#8c1aff',
        600: '#a64dff',
        700: '#bf80ff',
        800: '#d9b3ff',
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
        primary: '#1a0000',
        secondary: '#330000',
        tertiary: '#4d0000',
      },
     
      text: {
        primary: '#ffffff',
        secondary: '#f2f2f2',
        tertiary: '#cccccc',
        inverse: '#1a0000',
      },
     
      border: {
        light: '#330000',
        medium: '#4d0000',
        dark: '#660000',
      },
    },
  };
  
  export default darkRedTheme;