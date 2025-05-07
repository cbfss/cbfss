import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMockMenuItems } from '../../../services/menuService';

// Async thunk for fetching menu items (simulated API call)
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would call an API
      const menuItems = await getMockMenuItems();
      return menuItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  expandedItems: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenuExpand: (state, action) => {
      const menuTitle = action.payload;
      state.expandedItems[menuTitle] = !state.expandedItems[menuTitle];
    },
    collapseAllMenus: (state) => {
      state.expandedItems = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { toggleMenuExpand, collapseAllMenus } = menuSlice.actions;

// Export selectors
export const selectAllMenuItems = (state) => state.menu.items;
export const selectExpandedMenuItems = (state) => state.menu.expandedItems;
export const selectMenuStatus = (state) => state.menu.status;
export const selectMenuError = (state) => state.menu.error;

export default menuSlice.reducer;