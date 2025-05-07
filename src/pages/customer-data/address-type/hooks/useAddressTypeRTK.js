// src/pages/customer-data/address-type/hooks/useAddressTypeRTK.js
import { useState } from 'react';
import { 
  useGetAddressTypesQuery,
  useAddAddressTypeMutation,
  useUpdateAddressTypeMutation,
  useToggleAddressTypeStatusMutation
} from '../../../../services/customer/addressTypeApi';

/**
 * Custom hook for interacting with address type RTK Query API
 * Encapsulates API interactions and provides convenient methods
 */
export const useAddressTypeRTK = (filters = {}) => {
  const [error, setError] = useState(null);
  
  // Get address types with the provided filters
  const {
    data: addressTypes = [],
    isLoading,
    isFetching,
    refetch
  } = useGetAddressTypesQuery(filters);
  
  // Mutations for modifying data
  const [addAddressType] = useAddAddressTypeMutation();
  const [updateAddressType] = useUpdateAddressTypeMutation();
  const [toggleStatus] = useToggleAddressTypeStatusMutation();
  
  // Wrap mutations with error handling
  const handleAddAddressType = async (data) => {
    try {
      await addAddressType(data).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to add address type');
      return false;
    }
  };
  
  const handleUpdateAddressType = async (id, data) => {
    try {
      await updateAddressType({ id, ...data }).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update address type');
      return false;
    }
  };
  
  const handleToggleStatus = async (id) => {
    try {
      // FIXED: Only pass the ID to the mutation
      // Let the API and service handle the toggling
      await toggleStatus(id).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to toggle status');
      return false;
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