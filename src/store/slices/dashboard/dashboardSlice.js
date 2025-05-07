import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock dashboard data
const mockDashboardStats = [
  {
    id: "customer-data",
    title: "Customer Data",
    count: 9,
    label: "Master data categories",
    icon: "Users",
    color: "blue"
  },
  {
    id: "loan-management",
    title: "Loan Management",
    count: 9,
    label: "Master data categories",
    icon: "FileText",
    color: "green"
  },
  {
    id: "gold-loan",
    title: "Gold Loan Parameters",
    count: 5,
    label: "Master data categories",
    icon: "Award",
    color: "yellow"
  },
  {
    id: "payment-banking",
    title: "Payment & Banking",
    count: 3,
    label: "Master data categories",
    icon: "CreditCard",
    color: "purple"
  },
  {
    id: "settings",
    title: "Preferences",
    count: 2,
    label: "Master data categories",
    icon: "Settings",
    color: "gray"
  },
  {
    id: "total",
    title: "Total Categories",
    count: 29,
    label: "Master data categories",
    icon: "Layers",
    color: "red"
  }
];

// Async thunk for fetching dashboard statistics
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock data
      return mockDashboardStats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  stats: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardStats: (state) => {
      state.stats = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearDashboardStats } = dashboardSlice.actions;

// Export selectors
export const selectAllDashboardStats = (state) => state.dashboard.stats;
export const selectDashboardStatus = (state) => state.dashboard.status;
export const selectDashboardError = (state) => state.dashboard.error;

export default dashboardSlice.reducer;