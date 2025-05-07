import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taxCategoryService from '../../../services/customer/taxCategoryService';

// Async thunks for CRUD operations
export const fetchTaxCategories = createAsyncThunk(
  'taxCategory/fetchTaxCategories',
  async (_, { rejectWithValue }) => {
    try {
      const taxCategories = await taxCategoryService.getTaxCategories();
      return taxCategories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTaxCategory = createAsyncThunk(
  'taxCategory/addTaxCategory',
  async (taxCategoryData, { rejectWithValue }) => {
    try {
      const newTaxCategory = await taxCategoryService.addTaxCategory(taxCategoryData);
      return newTaxCategory;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTaxCategory = createAsyncThunk(
  'taxCategory/updateTaxCategory',
  async (taxCategoryData, { rejectWithValue }) => {
    try {
      const updatedTaxCategory = await taxCategoryService.updateTaxCategory(
        taxCategoryData.id, 
        taxCategoryData
      );
      return updatedTaxCategory;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTaxCategoryStatus = createAsyncThunk(
  'taxCategory/toggleTaxCategoryStatus',
  async (taxCategoryId, { rejectWithValue }) => {
    try {
      await taxCategoryService.toggleStatus(taxCategoryId);
      return taxCategoryId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  list: [],
  filteredList: [],
  searchTerm: '',
  filterActive: 'all',
  status: 'idle',
  error: null,
  currentTenantId: 1
};

// Slice
const taxCategorySlice = createSlice({
  name: 'taxCategory',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
    setFilterActive: (state, action) => {
      state.filterActive = action.payload;
      applyFilters(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTaxCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        applyFilters(state);
      })
      .addCase(fetchTaxCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addTaxCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
        applyFilters(state);
      })
      .addCase(updateTaxCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
          applyFilters(state);
        }
      })
      .addCase(toggleTaxCategoryStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(cat => cat.id === action.payload);
        if (index !== -1) {
          state.list[index].is_active = !state.list[index].is_active;
          applyFilters(state);
        }
      });
  }
});

// Helper function to apply filters
const applyFilters = (state) => {
  let results = state.list;
  
  // Filter by search term
  if (state.searchTerm) {
    results = results.filter(cat =>
      cat.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }
  
  // Filter by active status
  if (state.filterActive !== 'all') {
    results = results.filter(cat =>
      cat.is_active === (state.filterActive === 'active')
    );
  }
  
  // Filter by tenant
  results = results.filter(cat => cat.tenant_id === state.currentTenantId);
  
  state.filteredList = results;
};

export const { 
  setSearchTerm, 
  setFilterActive 
} = taxCategorySlice.actions;

export const selectTaxCategories = (state) => state.taxCategory.filteredList;
export const selectTaxCategoryStatus = (state) => state.taxCategory.status;
export const selectTaxCategoryError = (state) => state.taxCategory.error;

export default taxCategorySlice.reducer;