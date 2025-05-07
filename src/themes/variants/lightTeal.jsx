import defaultTheme from '../defaultTheme';


   const lightTealTheme = {
  ...defaultTheme,
  id: 'light-teal',
  name: 'Light Teal',
  isDark: false,
  colors: {
    primary: {
      50: '#e6f7f2',
      100: '#ccefe6',
      200: '#99dfcd',
      300: '#66cfb3',
      400: '#33bf9a',
      500: '#00af81',
      600: '#008c66',
      700: '#00694c',
      800: '#004633',
      900: '#002319',
    },
    secondary: {
      50: '#e6f9f9',
      100: '#ccf2f2',
      200: '#99e6e6',
      300: '#66d9d9',
      400: '#33cccc',
      500: '#00bfbf',
      600: '#009999',
      700: '#007373',
      800: '#004c4c',
      900: '#002626',
    },
    accent: {
      50: '#e6f5f5',
      100: '#ccebeb',
      200: '#99d6d6',
      300: '#66c2c2',
      400: '#33adad',
      500: '#009999',
      600: '#007a7a',
      700: '#005c5c',
      800: '#003d3d',
      900: '#001f1f',
    },
    // Other color sections remain similar to existing light themes
    ...defaultTheme.colors,
  },
};

export default lightTealTheme;