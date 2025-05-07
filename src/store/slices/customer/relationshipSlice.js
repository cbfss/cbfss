// src/store/slices/customer/relationshipSlice.js
import { createSlice } from '@reduxjs/toolkit';

// This slice now only handles UI state
const initialState = {
  searchTerm: '',
  filterActive: 'all',
  currentTenantId: 1, // Would come from auth in a real app
};

export const relationshipSlice = createSlice({
  name: 'relationshipUI',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterActive: (state, action) => {
      state.filterActive = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.filterActive = 'all';
    }
  }
});

// Export actions
export const {
  setSearchTerm,
  setFilterActive,
  clearFilters
} = relationshipSlice.actions;

// Export selectors
export const selectSearchTerm = (state) => state.relationshipUI.searchTerm;
export const selectFilterActive = (state) => state.relationshipUI.filterActive;
export const selectCurrentTenantId = (state) => state.relationshipUI.currentTenantId;

export default relationshipSlice.reducer;