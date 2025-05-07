// src/store/slices/gold/goldRateSlice.js
import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for gold rate UI filters
 */
const initialState = {
  searchDate: '', // Empty string for no date filter
  filterCaratId: 'all', // 'all' for no carat type filter
  currentTenantId: 1, // Would come from auth in a real app
};

/**
 * Redux slice for gold rate UI state
 */
export const goldRateSlice = createSlice({
  name: 'goldRateUI',
  initialState,
  reducers: {
    // Set the date filter
    setSearchDate: (state, action) => {
      state.searchDate = action.payload;
    },
    
    // Set the carat type filter
    setFilterCaratId: (state, action) => {
      state.filterCaratId = action.payload;
    },
    
    // Clear all filters
    clearFilters: (state) => {
      state.searchDate = '';
      state.filterCaratId = 'all';
    }
  }
});

// Export actions
export const {
  setSearchDate,
  setFilterCaratId,
  clearFilters
} = goldRateSlice.actions;

// Export selectors
export const selectSearchDate = (state) => state.goldRateUI.searchDate;
export const selectFilterCaratId = (state) => state.goldRateUI.filterCaratId;
export const selectCurrentTenantId = (state) => state.goldRateUI.currentTenantId;

export default goldRateSlice.reducer;