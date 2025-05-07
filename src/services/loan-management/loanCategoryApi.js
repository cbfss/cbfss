import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import loanCategoryService from './loanCategoryService';

// RTK Query API slice for loan categories
export const loanCategoryApi = createApi({
  reducerPath: 'loanCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['LoanCategory'],
  endpoints: (builder) => ({
    // Get all loan categories with optional filters
    getLoanCategories: builder.query({
      queryFn: async (filters = {}) => {
        try {
          const data = await loanCategoryService.getLoanCategories(filters);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['LoanCategory']
    }),
    
    // Get a single loan category by ID
    getLoanCategoryById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await loanCategoryService.getLoanCategoryById(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'LoanCategory', id }]
    }),
    
    // Add a new loan category
    addLoanCategory: builder.mutation({
      queryFn: async (loanCategoryData) => {
        try {
          const data = await loanCategoryService.addLoanCategory(loanCategoryData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['LoanCategory']
    }),
    
    // Update an existing loan category
    updateLoanCategory: builder.mutation({
      queryFn: async ({ id, ...loanCategoryData }) => {
        try {
          const data = await loanCategoryService.updateLoanCategory(id, loanCategoryData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'LoanCategory', id },
        'LoanCategory'
      ]
    }),
    
    // Toggle the active status of a loan category
    toggleLoanCategoryStatus: builder.mutation({
      queryFn: async (id) => {
        try {
          const result = await loanCategoryService.toggleStatus(id);
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
        { type: 'LoanCategory', id },
        'LoanCategory'
      ]
    })
  })
});

// Export hooks for usage in functional components
export const {
  useGetLoanCategoriesQuery,
  useGetLoanCategoryByIdQuery,
  useAddLoanCategoryMutation,
  useUpdateLoanCategoryMutation,
  useToggleLoanCategoryStatusMutation
} = loanCategoryApi;
