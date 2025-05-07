// src/pages/customer-management/customer-status/hooks/useCustomerStatusRTK.js
import { useState } from 'react';
import {
  useGetCustomerStatusesQuery,
  useAddCustomerStatusMutation,
  useUpdateCustomerStatusMutation,
  useToggleCustomerStatusMutation
} from '../../../../services/customer/customerStatusApi';

export const useCustomerStatusRTK = (filters = {}) => {
  const [error, setError] = useState(null);
  
  // Get customer statuses with the provided filters
  const {
    data: customerStatuses = [],
    isLoading,
    isFetching,
    refetch
  } = useGetCustomerStatusesQuery(filters);
  
  // Mutations for modifying data
  const [addCustomerStatus] = useAddCustomerStatusMutation();
  const [updateCustomerStatus] = useUpdateCustomerStatusMutation();
  const [toggleStatus] = useToggleCustomerStatusMutation();
  
  // Wrap mutations with error handling
  const handleAddCustomerStatus = async (data) => {
    try {
      await addCustomerStatus(data).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to add customer status');
      return false;
    }
  };
  
  const handleUpdateCustomerStatus = async (data) => {
    try {
      await updateCustomerStatus({
        id: data.status_id,
        status_name: data.status_name,
        description: data.description
      }).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update customer status');
      return false;
    }
  };
  
  const handleToggleStatus = async (id) => {
    try {
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
    customerStatuses,
    loading,
    error,
    clearError,
    addCustomerStatus: handleAddCustomerStatus,
    updateCustomerStatus: handleUpdateCustomerStatus,
    toggleStatus: handleToggleStatus,
    refetch
  };
};

export default useCustomerStatusRTK;