import { createSlice } from '@reduxjs/toolkit';

// This slice only handles UI state
const initialState = {
  searchTerm: '',
  filterActive: 'all',
  currentTenantId: 1, // Would come from auth in a real app
};

export const loanCategorySlice = createSlice({
  name: 'loanCategoryUI',
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
} = loanCategorySlice.actions;

// Export selectors
export const selectSearchTerm = (state) => state.loanCategoryUI.searchTerm;
export const selectFilterActive = (state) => state.loanCategoryUI.filterActive;
export const selectCurrentTenantId = (state) => state.loanCategoryUI.currentTenantId;

export default loanCategorySlice.reducer;