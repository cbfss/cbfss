// src/services/gold-loan/ornamentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ornamentService from './ornamentService';

// RTK Query API slice for ornaments
export const ornamentApi = createApi({
  reducerPath: 'ornamentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Ornament'],
  endpoints: (builder) => ({
    // Get all ornaments with optional filters
    getOrnaments: builder.query({
      queryFn: async (filters = {}) => {
        try {
          const data = await ornamentService.getOrnaments(filters);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Ornament']
    }),
    
    // Get a single ornament by ID
    getOrnamentById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await ornamentService.getOrnamentById(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'Ornament', id }]
    }),
    
    // Add a new ornament
    addOrnament: builder.mutation({
      queryFn: async (ornamentData) => {
        try {
          const data = await ornamentService.addOrnament(ornamentData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Ornament']
    }),
    
    // Update an existing ornament
    updateOrnament: builder.mutation({
      queryFn: async ({ id, ...ornamentData }) => {
        try {
          const data = await ornamentService.updateOrnament(id, ornamentData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ornament', id },
        'Ornament'
      ]
    }),
    
    // Toggle the active status of an ornament
    toggleOrnamentStatus: builder.mutation({
      queryFn: async (id) => {
        try {
          const result = await ornamentService.toggleStatus(id);
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
        { type: 'Ornament', id },
        'Ornament'
      ]
    })
  })
});

// Export hooks for usage in functional components
export const {
  useGetOrnamentsQuery,
  useGetOrnamentByIdQuery,
  useAddOrnamentMutation,
  useUpdateOrnamentMutation,
  useToggleOrnamentStatusMutation
} = ornamentApi;