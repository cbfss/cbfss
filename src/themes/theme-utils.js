import defaultTheme from '../defaultTheme';

// Deep merge utility
const deepMerge = (target, source) => {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  const output = { ...target };
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        output[key] = deepMerge(output[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  
  return output;
};

// Safe theme application function
export const themeToCssVariables = (theme) => {
  // If no theme provided, use default theme
  const safeTheme = theme ? deepMerge(defaultTheme, theme) : defaultTheme;

  const cssVars = {};
  const colorSections = [
    'primary', 'secondary', 'accent', 
    'success', 'warning', 'error', 'info', 
    'gray', 'background', 'text', 'border'
  ];

  // Process color sections
  if (safeTheme.colors) {
    colorSections.forEach(section => {
      const sectionColors = safeTheme.colors[section] || {};
      Object.entries(sectionColors).forEach(([shade, color]) => {
        if (color) {
          cssVars[`--color-${section}-${shade}`] = color;
        }
      });
    });
  }

  // Process non-color properties
  const processSections = [
    { name: 'spacing', prefix: 'spacing' },
    { name: 'borderRadius', prefix: 'radius' },
    { name: 'shadows', prefix: 'shadow' },
    { name: 'transitions', prefix: 'transition' }
  ];

  processSections.forEach(({ name, prefix }) => {
    const section = safeTheme[name] || {};
    Object.entries(section).forEach(([key, value]) => {
      if (value) {
        cssVars[`--${prefix}-${key}`] = value;
      }
    });
  });

  return cssVars;
};

export const applyTheme = (theme, element = document.documentElement) => {
  if (!theme || !element) {
    console.warn('Cannot apply theme: theme or element is undefined');
    return;
  }

  try {
    const cssVars = themeToCssVariables(theme);

    // Apply CSS variables
    Object.entries(cssVars).forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });

    // Toggle theme classes
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme.isDark ? 'theme-dark' : 'theme-light');
  } catch (error) {
    console.error('Error applying theme:', error);
  }
};

export default {
  deepMerge,
  themeToCssVariables,
  applyTheme
};