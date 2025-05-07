import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import languageService from '../../../services/customer/languageService';

// Helper function to apply filters
const applyFilters = (state) => {
  let results = state.list;
  
  // Filter by search term
  if (state.searchTerm) {
    results = results.filter(lang =>
      lang.language_name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }
  
  // Filter by active status
  if (state.filterActive !== 'all') {
    results = results.filter(lang =>
      lang.is_active === (state.filterActive === 'active')
    );
  }
  
  // Filter by tenant
  results = results.filter(lang => lang.tenant_id === state.currentTenantId);
  
  state.filteredList = results;
};

// Async thunk for fetching languages
export const fetchLanguages = createAsyncThunk(
  'language/fetchLanguages',
  async (_, { rejectWithValue }) => {
    try {
      const languages = await languageService.getLanguages();
      return languages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a language
export const addLanguage = createAsyncThunk(
  'language/addLanguage',
  async (languageData, { rejectWithValue }) => {
    try {
      const newLanguage = await languageService.addLanguage(languageData);
      return newLanguage;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a language
export const updateLanguage = createAsyncThunk(
  'language/updateLanguage',
  async (languageData, { rejectWithValue }) => {
    try {
      const updatedLanguage = await languageService.updateLanguage(
        languageData.language_id,
        languageData
      );
      return updatedLanguage;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for toggling language status
export const toggleLanguageStatus = createAsyncThunk(
  'language/toggleLanguageStatus',
  async (languageId, { rejectWithValue }) => {
    try {
      const result = await languageService.toggleStatus(languageId);
      return { id: languageId, result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  filteredList: [],
  searchTerm: '',
  filterActive: 'all',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentTenantId: 1, // Would come from auth in a real app
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
    setFilterActive: (state, action) => {
      state.filterActive = action.payload;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.filterActive = 'all';
      state.filteredList = state.list.filter(lang =>
        lang.tenant_id === state.currentTenantId
      );
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch languages
      .addCase(fetchLanguages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        applyFilters(state);
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add language
      .addCase(addLanguage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addLanguage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        applyFilters(state);
      })
      .addCase(addLanguage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update language
      .addCase(updateLanguage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateLanguage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(l => l.language_id === action.payload.language_id);
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload
          };
          applyFilters(state);
        }
      })
      .addCase(updateLanguage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Toggle language status
      .addCase(toggleLanguageStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleLanguageStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(l => l.language_id === action.payload.id);
        if (index !== -1) {
          state.list[index].is_active = !state.list[index].is_active;
          applyFilters(state);
        }
      })
      .addCase(toggleLanguageStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setSearchTerm, setFilterActive, clearFilters, clearError } = languageSlice.actions;

// Export selectors
export const selectAllLanguages = (state) => state.language.list;
export const selectFilteredLanguages = (state) => state.language.filteredList;
export const selectLanguageStatus = (state) => state.language.status;
export const selectLanguageError = (state) => state.language.error;
export const selectSearchTerm = (state) => state.language.searchTerm;
export const selectFilterActive = (state) => state.language.filterActive;
export const selectCurrentTenantId = (state) => state.language.currentTenantId;

export default languageSlice.reducer;