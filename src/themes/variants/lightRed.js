import defaultTheme from '../defaultTheme';

// Light Themes
const lightRedTheme = {
  ...defaultTheme,
  id: 'light-red',
  name: 'Light Red',
  isDark: false,
  colors: {
    primary: {
      50: '#ffe6e6',
      100: '#ffcccc',
      200: '#ff9999',
      300: '#ff6666',
      400: '#ff3333',
      500: '#ff0000',
      600: '#cc0000',
      700: '#990000',
      800: '#660000',
      900: '#330000',
    },
    secondary: {
      50: '#fff0e6',
      100: '#ffdab3',
      200: '#ffbf80',
      300: '#ffa54d',
      400: '#ff8b1a',
      500: '#ff7100',
      600: '#cc5a00',
      700: '#994300',
      800: '#662d00',
      900: '#331600',
    },
    accent: {
      50: '#f2e6ff',
      100: '#d9b3ff',
      200: '#bf80ff',
      300: '#a64dff',
      400: '#8c1aff',
      500: '#7300ff',
      600: '#5c00cc',
      700: '#450099',
      800: '#2e0066',
      900: '#170033',
    },
    // Other color sections remain similar to existing light themes
    ...defaultTheme.colors,
  },
};

export default lightRedTheme;