// src/services/customer/addressTypeApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import addressTypeService from './addressTypeService';

// RTK Query API slice for address types
export const addressTypeApi = createApi({
  reducerPath: 'addressTypeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['AddressType'],
  endpoints: (builder) => ({
    // Get all address types with optional filters
    getAddressTypes: builder.query({
      // Using the mock service for now - will be replaced with real API later
      queryFn: async (filters = {}) => {
        try {
          const data = await addressTypeService.getAddressTypes(filters);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['AddressType']
    }),
    
    // Get a single address type by ID
    getAddressTypeById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await addressTypeService.getAddressTypeById(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'AddressType', id }]
    }),
    
    // Add a new address type
    addAddressType: builder.mutation({
      queryFn: async (addressTypeData) => {
        try {
          const data = await addressTypeService.addAddressType(addressTypeData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['AddressType']
    }),
    
    // Update an existing address type
    updateAddressType: builder.mutation({
      queryFn: async ({ id, ...addressTypeData }) => {
        try {
          const data = await addressTypeService.updateAddressType(id, addressTypeData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'AddressType', id },
        'AddressType'
      ]
    }),
    
    // Toggle the active status of an address type
    toggleAddressTypeStatus: builder.mutation({
      queryFn: async (id) => {
        try {
          // Call the service method - do NOT modify the cache directly
          const result = await addressTypeService.toggleStatus(id);
          
          // Return the result from the service
          return { 
            data: { 
              id, 
              success: result.success 
            } 
          };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      // Important: This invalidation causes a refetch of the data
      invalidatesTags: (result, error, id) => [
        { type: 'AddressType', id },
        'AddressType'
      ]
    })
  })
});

// Export hooks for usage in functional components
export const {
  useGetAddressTypesQuery,
  useGetAddressTypeByIdQuery,
  useAddAddressTypeMutation,
  useUpdateAddressTypeMutation,
  useToggleAddressTypeStatusMutation
} = addressTypeApi;