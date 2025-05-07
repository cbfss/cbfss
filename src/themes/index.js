import themes, { themeCategories } from './themes';


// Utility exports
 const getThemeById = (id) => {
    return themes[id] || null;
  };
  
   const getAllThemes = () => {
    return { ...themes };
  };
  
   const getThemeCategories = () => {
    return themeCategories;
  };
  
   const getThemeIds = () => {
    return Object.keys(themes);
  };
  
   const getDefaultThemeId = () => {
    return 'light-blue'; 
  };
  
   const themeToCssVariables = (theme) => {
    
    if (!theme) return {};
   
    // Create a deep copy of the theme to prevent mutations
    const safeTheme = JSON.parse(JSON.stringify(theme));
   
    // Ensure all required sections exist
    const ensureSection = (obj, defaultValue = {}) => {
      return obj && typeof obj === 'object' ? obj : defaultValue;
    };
   
    const colors = ensureSection(safeTheme.colors, {
      primary: {},
      secondary: {},
      accent: {},
      success: {},
      warning: {},
      error: {},
      info: {},
      gray: {},
      background: {},
      text: {},
      border: {}
    });
   
    const cssVars = {};
   
    // Process color palette with fallback
    const processColorSection = (sectionName, section) => {
      Object.entries(section).forEach(([shade, color]) => {
        if (color) {
          cssVars[`--color-${sectionName}-${shade}`] = color;
        }
      });
    };
   
    // Process all color sections
    processColorSection('primary', colors.primary);
    processColorSection('secondary', colors.secondary);
    processColorSection('accent', colors.accent);
    processColorSection('success', colors.success);
    processColorSection('warning', colors.warning);
    processColorSection('error', colors.error);
    processColorSection('info', colors.info);
    processColorSection('gray', colors.gray);
   
    // Process UI base colors
    Object.entries(colors.background).forEach(([key, color]) => {
      if (color) cssVars[`--color-bg-${key}`] = color;
    });
   
    Object.entries(colors.text).forEach(([key, color]) => {
      if (color) cssVars[`--color-text-${key}`] = color;
    });
   
    Object.entries(colors.border).forEach(([key, color]) => {
      if (color) cssVars[`--color-border-${key}`] = color;
    });
   
    // Process non-color theme properties with fallbacks
    const processSection = (sectionName, section, prefix) => {
      if (section && typeof section === 'object') {
        Object.entries(section).forEach(([key, value]) => {
          if (value) cssVars[`--${prefix}-${key}`] = value;
        });
      }
    };
   
    processSection('spacing', safeTheme.spacing, 'spacing');
    processSection('borderRadius', safeTheme.borderRadius, 'radius');
    processSection('shadows', safeTheme.shadows, 'shadow');
    processSection('transitions', safeTheme.transitions, 'transition');
   
    return cssVars;
  };
  
   const applyTheme = (theme, element = document.documentElement) => {
    // Validate inputs
    if (!theme || !element) return;
   
    try {
      const cssVars = themeToCssVariables(theme);
   
      // Apply each CSS variable to the element
      Object.entries(cssVars).forEach(([property, value]) => {
        if (value) {
          element.style.setProperty(property, value);
        }
      });
   
      // Add theme-specific body class
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(theme.isDark ? 'theme-dark' : 'theme-light');
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  };
  
  export {
    themes as default,
    getThemeById,
    getAllThemes,
    getThemeCategories,
    getThemeIds,
    getDefaultThemeId,
    themeToCssVariables,
    applyTheme,
  };