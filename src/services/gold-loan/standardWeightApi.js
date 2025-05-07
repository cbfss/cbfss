// src/services/gold-loan/standardWeightApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import standardWeightService from './standardWeightService';

// RTK Query API slice for standard weights
export const standardWeightApi = createApi({
  reducerPath: 'standardWeightApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['StandardWeight', 'Ornament'],
  endpoints: (builder) => ({
    // Get all standard weights with optional filters
    getStandardWeights: builder.query({
      queryFn: async (filters = {}) => {
        try {
          const data = await standardWeightService.getStandardWeights(filters);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['StandardWeight']
    }),
    
    // Get a single standard weight by ID
    getStandardWeightById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await standardWeightService.getStandardWeightById(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'StandardWeight', id }]
    }),
    
    // Get standard weight by ornament ID
    getStandardWeightByOrnamentId: builder.query({
      queryFn: async (ornamentId) => {
        try {
          const data = await standardWeightService.getStandardWeightByOrnamentId(ornamentId);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, ornamentId) => [
        { type: 'StandardWeight', id: `ornament-${ornamentId}` }
      ]
    }),
    
    // Add a new standard weight
    addStandardWeight: builder.mutation({
      queryFn: async (standardWeightData) => {
        try {
          const data = await standardWeightService.addStandardWeight(standardWeightData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['StandardWeight']
    }),
    
    // Update an existing standard weight
    updateStandardWeight: builder.mutation({
      queryFn: async ({ id, ...standardWeightData }) => {
        try {
          const data = await standardWeightService.updateStandardWeight(id, standardWeightData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'StandardWeight', id },
        'StandardWeight'
      ]
    }),
    
    // Get all ornaments (to select from when creating/editing standard weights)
    getOrnaments: builder.query({
      queryFn: async (filters = {}) => {
        try {
          const data = await standardWeightService.getOrnaments(filters);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Ornament']
    })
  })
});

// Export hooks for usage in functional components
export const {
  useGetStandardWeightsQuery,
  useGetStandardWeightByIdQuery,
  useGetStandardWeightByOrnamentIdQuery,
  useAddStandardWeightMutation,
  useUpdateStandardWeightMutation,
  useGetOrnamentsQuery
} = standardWeightApi;