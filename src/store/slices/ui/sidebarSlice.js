import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true, // Sidebar is open by default on desktop
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

// Export actions
export const { toggleSidebar, openSidebar, closeSidebar } = sidebarSlice.actions;

// Export selectors
export const selectSidebarIsOpen = (state) => state.sidebar.isOpen;

export default sidebarSlice.reducer;