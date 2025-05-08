// src/pages/customer-data/address-type/hooks/useAddressTypeRTK.js
import { useState } from 'react';
import { 
  useGetAddressTypesQuery,
  useAddAddressTypeMutation,
  useUpdateAddressTypeMutation,
  useToggleAddressTypeStatusMutation
} from '../../../../services/customer/addressTypeApi';
import { useSelector } from 'react-redux';
import { selectCurrentTenantId } from '../../../../store/slices/customer/addressTypeSlice';

/**
 * Custom hook for interacting with address type RTK Query API
 * Encapsulates API interactions and provides convenient methods
 */
export const useAddressTypeRTK = () => {
  const [error, setError] = useState(null);
  const currentTenantId = useSelector(selectCurrentTenantId);
  
  // Get address types
  const {
    data: addressTypes = [],
    isLoading,
    isFetching,
    refetch
  } = useGetAddressTypesQuery();
  
  // Mutations for modifying data
  const [addAddressTypeMutation] = useAddAddressTypeMutation();
  const [updateAddressTypeMutation] = useUpdateAddressTypeMutation();
  const [toggleStatusMutation] = useToggleAddressTypeStatusMutation();
  
  // Wrap mutations with error handling
  const handleAddAddressType = async (data) => {
    try {
      // Add tenant ID to the data
      const dataWithTenant = {
        ...data,
        tenant_id: currentTenantId
      };
      
      const response = await addAddressTypeMutation(dataWithTenant).unwrap();
      return response;
    } catch (err) {
      console.error('Error adding address type:', err);
      setError(err.data?.message || err.message || 'Failed to add address type');
      throw err;
    }
  };
  
  const handleUpdateAddressType = async (id, data) => {
    try {
      // Add tenant ID to the data
      const dataWithTenant = {
        ...data,
        tenant_id: currentTenantId
      };
      
      const response = await updateAddressTypeMutation({ 
        id, 
        ...dataWithTenant 
      }).unwrap();
      return response;
    } catch (err) {
      console.error('Error updating address type:', err);
      setError(err.data?.message || err.message || 'Failed to update address type');
      throw err;
    }
  };
  
  const handleToggleStatus = async (id) => {
    try {
      const response = await toggleStatusMutation(id).unwrap();
      return response;
    } catch (err) {
      console.error('Error toggling status:', err);
      setError(err.data?.message || err.message || 'Failed to toggle status');
      throw err;
    }
  };
  
  const clearError = () => setError(null);
  
  // Loading state combines both initial loading and subsequent fetches
  const loading = isLoading || isFetching;
  
  return {
    addressTypes,
    loading,
    error,
    clearError,
    addAddressType: handleAddAddressType,
    updateAddressType: handleUpdateAddressType,
    toggleStatus: handleToggleStatus,
    refetch
  };
};