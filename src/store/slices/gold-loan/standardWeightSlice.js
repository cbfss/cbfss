import { createSlice } from '@reduxjs/toolkit';

// This slice only handles UI state
const initialState = {
  searchTerm: '',
  sortField: 'ornament_name',
  sortDirection: 'asc',
  currentTenantId: 1, // Would come from auth in a real app
};

export const standardWeightSlice = createSlice({
  name: 'standardWeightUI',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortField: (state, action) => {
      // If clicked on the same field, toggle direction
      if (state.sortField === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // New field, default to ascending
        state.sortField = action.payload;
        state.sortDirection = 'asc';
      }
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.sortField = 'ornament_name';
      state.sortDirection = 'asc';
    }
  }
});

// Export actions
export const {
  setSearchTerm,
  setSortField,
  clearFilters
} = standardWeightSlice.actions;

// Export selectors
export const selectSearchTerm = (state) => state.standardWeightUI.searchTerm;
export const selectSortField = (state) => state.standardWeightUI.sortField;
export const selectSortDirection = (state) => state.standardWeightUI.sortDirection;
export const selectCurrentTenantId = (state) => state.standardWeightUI.currentTenantId;

export default standardWeightSlice.reducer;