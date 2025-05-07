import defaultTheme from '../defaultTheme';


   const lightIndigoTheme = {
  ...defaultTheme,
  id: 'light-indigo',
  name: 'Light Indigo',
  isDark: false,
  colors: {
    primary: {
      50: '#e6e6ff',
      100: '#ccccff',
      200: '#9999ff',
      300: '#6666ff',
      400: '#3333ff',
      500: '#0000ff',
      600: '#0000cc',
      700: '#000099',
      800: '#000066',
      900: '#000033',
    },
    secondary: {
      50: '#f0e6ff',
      100: '#e0ccff',
      200: '#c199ff',
      300: '#a366ff',
      400: '#8533ff',
      500: '#6600ff',
      600: '#5200cc',
      700: '#3d0099',
      800: '#290066',
      900: '#140033',
    },
    accent: {
      50: '#f2e6ff',
      100: '#e5ccff',
      200: '#cc99ff',
      300: '#b366ff',
      400: '#9933ff',
      500: '#7f00ff',
      600: '#6600cc',
      700: '#4c0099',
      800: '#330066',
      900: '#190033',
    },
    // Other color sections remain similar to existing light themes
    ...defaultTheme.colors,
  },
};


export default lightIndigoTheme;

