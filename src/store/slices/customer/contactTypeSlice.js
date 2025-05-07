import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactTypeService from '../../../services/customer/contactTypeService';

// Helper function to apply filters
const applyFilters = (state) => {
  let results = state.list;
  
  // Filter by search term
  if (state.searchTerm) {
    results = results.filter(type =>
      type.contact_type.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }
  
  // Filter by active status
  if (state.filterActive !== 'all') {
    results = results.filter(type =>
      type.is_active === (state.filterActive === 'active')
    );
  }
  
  // Filter by tenant
  results = results.filter(type => type.tenant_id === state.currentTenantId);
  
  state.filteredList = results;
};

// Async thunk for fetching contact types
export const fetchContactTypes = createAsyncThunk(
  'contactType/fetchContactTypes',
  async (_, { rejectWithValue }) => {
    try {
      const contactTypes = await contactTypeService.getContactTypes();
      return contactTypes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a contact type
export const addContactType = createAsyncThunk(
  'contactType/addContactType',
  async (contactTypeData, { rejectWithValue }) => {
    try {
      const newContactType = await contactTypeService.addContactType(contactTypeData);
      return newContactType;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a contact type
export const updateContactType = createAsyncThunk(
  'contactType/updateContactType',
  async (contactTypeData, { rejectWithValue }) => {
    try {
      const updatedContactType = await contactTypeService.updateContactType(
        contactTypeData.contact_type_id,
        contactTypeData
      );
      return updatedContactType;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for toggling contact type status
export const toggleContactTypeStatus = createAsyncThunk(
  'contactType/toggleContactTypeStatus',
  async (contactTypeId, { rejectWithValue }) => {
    try {
      const result = await contactTypeService.toggleStatus(contactTypeId);
      return { id: contactTypeId, result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  filteredList: [],
  searchTerm: '',
  filterActive: 'all',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentTenantId: 1, // Would come from auth in a real app
};

export const contactTypeSlice = createSlice({
  name: 'contactType',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
    setFilterActive: (state, action) => {
      state.filterActive = action.payload;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.filterActive = 'all';
      state.filteredList = state.list.filter(type =>
        type.tenant_id === state.currentTenantId
      );
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch contact types
      .addCase(fetchContactTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContactTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        applyFilters(state);
      })
      .addCase(fetchContactTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add contact type
      .addCase(addContactType.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContactType.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        applyFilters(state);
      })
      .addCase(addContactType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update contact type
      .addCase(updateContactType.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateContactType.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(t => t.contact_type_id === action.payload.contact_type_id);
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload
          };
          applyFilters(state);
        }
      })
      .addCase(updateContactType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Toggle contact type status
      .addCase(toggleContactTypeStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleContactTypeStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(t => t.contact_type_id === action.payload.id);
        if (index !== -1) {
          state.list[index].is_active = !state.list[index].is_active;
          applyFilters(state);
        }
      })
      .addCase(toggleContactTypeStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setSearchTerm, setFilterActive, clearFilters, clearError } = contactTypeSlice.actions;

// Export selectors
export const selectAllContactTypes = (state) => state.contactType.list;
export const selectFilteredContactTypes = (state) => state.contactType.filteredList;
export const selectContactTypeStatus = (state) => state.contactType.status;
export const selectContactTypeError = (state) => state.contactType.error;
export const selectSearchTerm = (state) => state.contactType.searchTerm;
export const selectFilterActive = (state) => state.contactType.filterActive;
export const selectCurrentTenantId = (state) => state.contactType.currentTenantId;

export default contactTypeSlice.reducer;