// src/services/customer/relationshipApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import relationshipService from './relationshipService';

// RTK Query API slice for relationships
export const relationshipApi = createApi({
  reducerPath: 'relationshipApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Relationship'],
  endpoints: (builder) => ({
    // Get all relationships with optional filters
    getRelationships: builder.query({
      // Using the mock service for now - will be replaced with real API later
      queryFn: async (filters = {}) => {
        try {
          const data = await relationshipService.getRelationships(filters);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Relationship']
    }),
    
    // Get a single relationship by ID
    getRelationshipById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await relationshipService.getRelationshipById(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'Relationship', id }]
    }),
    
    // Add a new relationship
    addRelationship: builder.mutation({
      queryFn: async (relationshipData) => {
        try {
          const data = await relationshipService.addRelationship(relationshipData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Relationship']
    }),
    
    // Update an existing relationship
    updateRelationship: builder.mutation({
      queryFn: async ({ id, ...relationshipData }) => {
        try {
          const data = await relationshipService.updateRelationship(id, relationshipData);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Relationship', id },
        'Relationship'
      ]
    }),
    
    // Toggle the active status of a relationship
    toggleRelationshipStatus: builder.mutation({
      queryFn: async (id) => {
        try {
          const result = await relationshipService.toggleStatus(id);
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
        { type: 'Relationship', id },
        'Relationship'
      ]
    })
  })
});

// Export hooks for usage in functional components
export const {
  useGetRelationshipsQuery,
  useGetRelationshipByIdQuery,
  useAddRelationshipMutation,
  useUpdateRelationshipMutation,
  useToggleRelationshipStatusMutation
} = relationshipApi;