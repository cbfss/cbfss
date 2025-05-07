// src/store/slices/customer/occupationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import occupationService from '../../../services/customer/occupationService';

// Async thunk for fetching occupations
export const fetchOccupations = createAsyncThunk(
  'occupation/fetchOccupations',
  async (_, { rejectWithValue }) => {
    try {
      const occupations = await occupationService.getOccupations();
      return occupations;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding an occupation
export const addOccupation = createAsyncThunk(
  'occupation/addOccupation',
  async (occupationData, { rejectWithValue }) => {
    try {
      const newOccupation = await occupationService.addOccupation(occupationData);
      return newOccupation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating an occupation
export const updateOccupation = createAsyncThunk(
  'occupation/updateOccupation',
  async (occupationData, { rejectWithValue }) => {
    try {
      const updatedOccupation = await occupationService.updateOccupation(
        occupationData
      );
      return updatedOccupation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for toggling occupation status
export const toggleOccupationStatus = createAsyncThunk(
  'occupation/toggleOccupationStatus',
  async (occupationId, { rejectWithValue }) => {
    try {
      const result = await occupationService.toggleStatus(occupationId);
      return { occupation_id: occupationId, result };
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

export const occupationSlice = createSlice({
  name: 'occupation',
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
      state.filteredList = state.list.filter(occ =>
        occ.tenant_id === state.currentTenantId
      );
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch occupations
      .addCase(fetchOccupations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOccupations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        applyFilters(state);
      })
      .addCase(fetchOccupations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add occupation
      .addCase(addOccupation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOccupation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        applyFilters(state);
      })
      .addCase(addOccupation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update occupation
      .addCase(updateOccupation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOccupation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(o => o.occupation_id === action.payload.occupation_id);
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload
          };
          applyFilters(state);
        }
      })
      .addCase(updateOccupation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Toggle occupation status
      .addCase(toggleOccupationStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleOccupationStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(o => o.occupation_id === action.payload.occupation_id);
        if (index !== -1) {
          state.list[index].is_active = !state.list[index].is_active;
          applyFilters(state);
        }
      })
      .addCase(toggleOccupationStatus.rejected, (state, action) => {
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
    results = results.filter(occ =>
      occ.occupation_name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }
  
  // Filter by active status
  if (state.filterActive !== 'all') {
    results = results.filter(occ =>
      occ.is_active === (state.filterActive === 'active')
    );
  }
  
  // Filter by tenant
  results = results.filter(occ => occ.tenant_id === state.currentTenantId);
  
  state.filteredList = results;
};

// Export actions
export const { setSearchTerm, setFilterActive, clearFilters, clearError } = occupationSlice.actions;

// Export selectors
export const selectAllOccupations = (state) => state.occupation.list;
export const selectFilteredOccupations = (state) => state.occupation.filteredList;
export const selectOccupationStatus = (state) => state.occupation.status;
export const selectOccupationError = (state) => state.occupation.error;
export const selectSearchTerm = (state) => state.occupation.searchTerm;
export const selectFilterActive = (state) => state.occupation.filterActive;
export const selectCurrentTenantId = (state) => state.occupation.currentTenantId;

export default occupationSlice.reducer;