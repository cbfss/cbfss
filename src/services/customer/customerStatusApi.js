// src/services/customer-management/customerStatusApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import customerStatusService from './customerStatusService';

// RTK Query API slice for customer statuses
export const customerStatusApi = createApi({
  reducerPath: 'customerStatusApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['CustomerStatus'],
  endpoints: (builder) => ({
    // Get all customer statuses with optional filters
    getCustomerStatuses: builder.query({
      queryFn: async (filters = {}) => {
        try {
          const data = await customerStatusService.getCustomerStatuses(filters);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['CustomerStatus']
    }),
    
    // Get a single customer status by ID
    getCustomerStatusById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await customerStatusService.getCustomerStatusById(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'CustomerStatus', id }]
    }),
    
    // Add a new customer status
    addCustomerStatus: builder.mutation({
      queryFn: async (customerStatusData) => {
        try {
          const data = await customerStatusService.addCustomerStatus(customerStatusData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['CustomerStatus']
    }),
    
    // Update an existing customer status
    updateCustomerStatus: builder.mutation({
      queryFn: async ({ id, ...customerStatusData }) => {
        try {
          const data = await customerStatusService.updateCustomerStatus(id, customerStatusData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'CustomerStatus', id },
        'CustomerStatus'
      ]
    }),
    
    // Toggle the active status of a customer status
    toggleCustomerStatus: builder.mutation({
      queryFn: async (id) => {
        try {
          const result = await customerStatusService.toggleStatus(id);
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
      invalidatesTags: (result, error, id) => [
        { type: 'CustomerStatus', id },
        'CustomerStatus'
      ]
    })
  })
});

// Export hooks for usage in functional components
export const {
  useGetCustomerStatusesQuery,
  useGetCustomerStatusByIdQuery,
  useAddCustomerStatusMutation,
  useUpdateCustomerStatusMutation,
  useToggleCustomerStatusMutation
} = customerStatusApi;