import defaultTheme from '../defaultTheme';

const lightOrangeTheme = {
  ...defaultTheme,
  id: 'light-orange',
  name: 'Light Orange',
  isDark: false,
  colors: {
    primary: {
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
    secondary: {
      50: '#f2e6d9',
      100: '#e6ccb3',
      200: '#d9b380',
      300: '#cc994d',
      400: '#bf801a',
      500: '#b36600',
      600: '#8c5200',
      700: '#663d00',
      800: '#402600',
      900: '#1a1100',
    },
    accent: {
      50: '#f9f2e6',
      100: '#f3e6cc',
      200: '#edda99',
      300: '#e7cf66',
      400: '#e1c333',
      500: '#dbb700',
      600: '#af9200',
      700: '#836e00',
      800: '#574a00',
      900: '#2b2500',
    },
    // Other color sections remain similar to existing light themes
    ...defaultTheme.colors,
  },
};

export default lightOrangeTheme;
