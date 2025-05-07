// src/store/slices/gold-loan/ornamentSlice.js
import { createSlice } from '@reduxjs/toolkit';

// This slice only handles UI state
const initialState = {
  searchTerm: '',
  filterActive: 'all',
  currentTenantId: 1, // Would come from auth in a real app
};

export const ornamentSlice = createSlice({
  name: 'ornamentUI',
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
} = ornamentSlice.actions;

// Export selectors
export const selectSearchTerm = (state) => state.ornamentUI.searchTerm;
export const selectFilterActive = (state) => state.ornamentUI.filterActive;
export const selectCurrentTenantId = (state) => state.ornamentUI.currentTenantId;

export default ornamentSlice.reducer;