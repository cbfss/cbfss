// src/store/slices/customer-management/customerStatusSlice.js
import { createSlice } from '@reduxjs/toolkit';

// This slice only handles UI state
const initialState = {
  searchTerm: '',
  filterActive: 'all',
  currentTenantId: 1, // Would come from auth in a real app
};

export const customerStatusSlice = createSlice({
  name: 'customerStatusUI',
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
} = customerStatusSlice.actions;

// Export selectors
export const selectSearchTerm = (state) => state.customerStatusUI.searchTerm;
export const selectFilterActive = (state) => state.customerStatusUI.filterActive;
export const selectCurrentTenantId = (state) => state.customerStatusUI.currentTenantId;

export default customerStatusSlice.reducer;