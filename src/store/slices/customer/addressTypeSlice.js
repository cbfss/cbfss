// src/store/slices/customer/addressTypeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// This slice now only handles UI state
// API communication is moved to addressTypeApi.js
const initialState = {
  searchTerm: '',
  filterActive: 'all',
  currentTenantId: 1, // Would come from auth in a real app
};

export const addressTypeSlice = createSlice({
  name: 'addressTypeUI',
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
} = addressTypeSlice.actions;

// Export selectors
export const selectSearchTerm = (state) => state.addressTypeUI.searchTerm;
export const selectFilterActive = (state) => state.addressTypeUI.filterActive;
export const selectCurrentTenantId = (state) => state.addressTypeUI.currentTenantId;

export default addressTypeSlice.reducer;