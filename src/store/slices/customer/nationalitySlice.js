import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import nationalityService from '../../../services/customer/nationalityService';

// Async thunk for fetching nationalities
export const fetchNationalities = createAsyncThunk(
  'nationality/fetchNationalities',
  async (_, { rejectWithValue }) => {
    try {
      const nationalities = await nationalityService.getNationalities();
      return nationalities;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a nationality
export const addNationality = createAsyncThunk(
  'nationality/addNationality',
  async (nationalityData, { rejectWithValue }) => {
    try {
      const newNationality = await nationalityService.addNationality(nationalityData);
      return newNationality;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a nationality
export const updateNationality = createAsyncThunk(
  'nationality/updateNationality',
  async (nationalityData, { rejectWithValue }) => {
    try {
      const updatedNationality = await nationalityService.updateNationality(
        nationalityData.id,
        nationalityData
      );
      return updatedNationality;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for toggling nationality status
export const toggleNationalityStatus = createAsyncThunk(
  'nationality/toggleNationalityStatus',
  async (nationalityId, { rejectWithValue }) => {
    try {
      const result = await nationalityService.toggleStatus(nationalityId);
      return { id: nationalityId, result };
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

export const nationalitySlice = createSlice({
  name: 'nationality',
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
      state.filteredList = state.list.filter(nat =>
        nat.tenant_id === state.currentTenantId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch nationalities
      .addCase(fetchNationalities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNationalities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        applyFilters(state);
      })
      .addCase(fetchNationalities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add nationality
      .addCase(addNationality.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNationality.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        applyFilters(state);
      })
      .addCase(addNationality.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update nationality
      .addCase(updateNationality.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateNationality.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload
          };
          applyFilters(state);
        }
      })
      .addCase(updateNationality.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Toggle nationality status
      .addCase(toggleNationalityStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleNationalityStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.list[index].is_active = !state.list[index].is_active;
          applyFilters(state);
        }
      })
      .addCase(toggleNationalityStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Helper function to apply filters
const applyFilters = (state) => {
  let results = state.list;
  
  // Filter by search term
  if (state.searchTerm) {
    results = results.filter(nat =>
      nat.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }
  
  // Filter by active status
  if (state.filterActive !== 'all') {
    results = results.filter(nat =>
      nat.is_active === (state.filterActive === 'active')
    );
  }
  
  // Filter by tenant
  results = results.filter(nat => nat.tenant_id === state.currentTenantId);
  
  state.filteredList = results;
};

// Export actions
export const { setSearchTerm, setFilterActive, clearFilters } = nationalitySlice.actions;

// Export selectors
export const selectAllNationalities = (state) => state.nationality.list;
export const selectFilteredNationalities = (state) => state.nationality.filteredList;
export const selectNationalityStatus = (state) => state.nationality.status;
export const selectNationalityError = (state) => state.nationality.error;
export const selectSearchTerm = (state) => state.nationality.searchTerm;
export const selectFilterActive = (state) => state.nationality.filterActive;
export const selectCurrentTenantId = (state) => state.nationality.currentTenantId;

export default nationalitySlice.reducer;