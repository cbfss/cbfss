// src/services/customer/addressTypeApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addressTypeApi = createApi({
  reducerPath: 'addressTypeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    prepareHeaders: (headers) => {
      // Add authorization header if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['AddressType'],
  endpoints: (builder) => ({
    getAddressTypes: builder.query({
      query: () => `/v1/masterdata/address/address-types/getAll`,
      transformResponse: (response) => {
        // Transform the API response to match the format expected by the UI
        if (!response) return [];
        
        return response.map(item => ({
          address_type_id: item.id,
          address_type_name: item.addressTypeName,
          is_active: item.isActive,
          tenant_id: item.tenantId || 1, // Default to 1 if not provided
          created_at: item.createdAt,
          updated_at: item.updatedAt
        }));
      },
      providesTags: ['AddressType']
    }),
    
    getAddressTypeById: builder.query({
      query: (id) => `/v1/masterdata/address/address-types/${id}`,
      transformResponse: (response) => {
        if (!response) return null;
        
        return {
          address_type_id: response.id,
          address_type_name: response.addressTypeName,
          is_active: response.isActive,
          tenant_id: response.tenantId || 1,
          created_at: response.createdAt,
          updated_at: response.updatedAt
        };
      },
      providesTags: (result, error, id) => [{ type: 'AddressType', id }]
    }),
    
    addAddressType: builder.mutation({
      query: (data) => ({
        url: `/v1/masterdata/address/address-types/`,
        method: 'POST',
        body: {
          addressTypeName: data.address_type_name,
          isActive: true,
          tenantId: data.tenant_id || 1,
          createdBy: 1 // In a real app, this would come from auth context
        }
      }),
      invalidatesTags: ['AddressType']
    }),
    
    updateAddressType: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/v1/masterdata/address/address-types/${id}`,
        method: 'PUT',
        body: {
          addressTypeName: data.address_type_name,
          isActive: data.is_active,
          tenantId: data.tenant_id || 1,
          updatedBy: 1 // In a real app, this would come from auth context
        }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'AddressType', id }, 'AddressType']
    }),
    
    toggleAddressTypeStatus: builder.mutation({
      query: (id) => ({
        url: `/v1/masterdata/address/address-types/${id}/toggle-status`,
        method: 'PATCH'
      }),
      // Since the API doesn't have a specific toggle endpoint in the Postman collection,
      // we'll use a custom endpoint. In a real implementation, you might need to:
      // 1. First get the current status using getAddressTypeById
      // 2. Then update using updateAddressType with the toggled status
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        // Optimistic update - find the current item in the cache
        const state = getState();
        const addressTypes = state.addressTypeApi.queries['getAddressTypes(undefined)']?.data;
        
        if (!addressTypes) return;
        
        const addressType = addressTypes.find(item => item.address_type_id === id);
        if (!addressType) return;
        
        // Optimistically update the list
        const patchResult = dispatch(
          addressTypeApi.util.updateQueryData('getAddressTypes', undefined, (draft) => {
            const itemToUpdate = draft.find(item => item.address_type_id === id);
            if (itemToUpdate) {
              itemToUpdate.is_active = !itemToUpdate.is_active;
            }
          })
        );
        
        try {
          // Wait for the actual API call to complete
          await queryFulfilled;
        } catch {
          // Rollback the optimistic update on error
          patchResult.undo();
          
          // Invalidate the tag to force a refetch
          dispatch(addressTypeApi.util.invalidateTags(['AddressType']));
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'AddressType', id }, 'AddressType']
    }),
    
    deleteAddressType: builder.mutation({
      query: (id) => ({
        url: `/v1/masterdata/address/address-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AddressType']
    }),
  }),
});

export const {
  useGetAddressTypesQuery,
  useGetAddressTypeByIdQuery,
  useAddAddressTypeMutation,
  useUpdateAddressTypeMutation,
  useToggleAddressTypeStatusMutation,
  useDeleteAddressTypeMutation,
} = addressTypeApi;