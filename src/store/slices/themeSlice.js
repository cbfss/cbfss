// src/store/slices/themeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import themeService from '../../services/themeService';
import { getThemeById, getDefaultThemeId } from '../../themes';

// Async thunk to initialize theme based on user preferences
export const initializeTheme = createAsyncThunk(
  'theme/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const theme = themeService.initializeTheme();
      return theme.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to change theme and save preference
export const changeTheme = createAsyncThunk(
  'theme/change',
  async (themeId, { rejectWithValue }) => {
    try {
      const theme = getThemeById(themeId);
      if (!theme) {
        throw new Error(`Theme with ID "${themeId}" not found`);
      }
      
      const success = themeService.saveThemePreference(themeId);
      if (!success) {
        throw new Error('Failed to save theme preference');
      }
      
      return themeId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to toggle between light and dark modes within the same color family
export const toggleDarkMode = createAsyncThunk(
  'theme/toggleDarkMode',
  async (_, { getState, dispatch }) => {
    const { currentThemeId } = getState().theme;
    const currentTheme = getThemeById(currentThemeId);
    
    if (!currentTheme) {
      return dispatch(changeTheme(getDefaultThemeId()));
    }
    
    // Extract color family and current mode
    const [mode, color] = currentThemeId.split('-');
    const isDark = mode === 'dark';
    
    // Create the new theme ID by toggling the mode
    const newThemeId = `${isDark ? 'light' : 'dark'}-${color}`;
    
    // Verify the new theme exists
    const newTheme = getThemeById(newThemeId);
    if (!newTheme) {
      return dispatch(changeTheme(getDefaultThemeId()));
    }
    
    return dispatch(changeTheme(newThemeId));
  }
);

const initialState = {
  currentThemeId: getDefaultThemeId(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  systemPrefersDark: false
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSystemColorScheme: (state, action) => {
      state.systemPrefersDark = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Initialize theme
      .addCase(initializeTheme.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeTheme.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentThemeId = action.payload;
      })
      .addCase(initializeTheme.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.currentThemeId = getDefaultThemeId();
      })
      
      // Change theme
      .addCase(changeTheme.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentThemeId = action.payload;
      })
      .addCase(changeTheme.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setSystemColorScheme } = themeSlice.actions;

// Export selectors
export const selectCurrentThemeId = (state) => state.theme.currentThemeId;
export const selectThemeStatus = (state) => state.theme.status;
export const selectThemeError = (state) => state.theme.error;
export const selectSystemPrefersDark = (state) => state.theme.systemPrefersDark;

export default themeSlice.reducer;