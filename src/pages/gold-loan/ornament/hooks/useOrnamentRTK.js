// src/pages/gold-loan/ornament/hooks/useOrnamentRTK.js
import { useState } from 'react';
import {
  useGetOrnamentsQuery,
  useAddOrnamentMutation,
  useUpdateOrnamentMutation,
  useToggleOrnamentStatusMutation
} from '../../../../services/gold-loan/ornamentApi';

export const useOrnamentRTK = (filters = {}) => {
  const [error, setError] = useState(null);
  
  // Get ornaments with the provided filters
  const {
    data: ornaments = [],
    isLoading,
    isFetching,
    refetch
  } = useGetOrnamentsQuery(filters);
  
  // Mutations for modifying data
  const [addOrnament] = useAddOrnamentMutation();
  const [updateOrnament] = useUpdateOrnamentMutation();
  const [toggleStatus] = useToggleOrnamentStatusMutation();
  
  // Wrap mutations with error handling
  const handleAddOrnament = async (data) => {
    try {
      await addOrnament(data).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to add ornament');
      return false;
    }
  };
  
  const handleUpdateOrnament = async (data) => {
    try {
      await updateOrnament({
        id: data.ornament_id,
        ornament_name: data.ornament_name
      }).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update ornament');
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
    ornaments,
    loading,
    error,
    clearError,
    addOrnament: handleAddOrnament,
    updateOrnament: handleUpdateOrnament,
    toggleStatus: handleToggleStatus,
    refetch
  };
};

export default useOrnamentRTK;