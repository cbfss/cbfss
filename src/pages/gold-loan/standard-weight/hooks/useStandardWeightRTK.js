import { useState } from 'react';
import {
  useGetStandardWeightsQuery,
  useAddStandardWeightMutation,
  useUpdateStandardWeightMutation,
  useGetOrnamentsQuery
} from '../../../../services/gold-loan/standardWeightApi';

/**
 * Custom hook for interacting with standard weight RTK Query API
 */
export const useStandardWeightRTK = (filters = {}) => {
  const [error, setError] = useState(null);
  
  // Get standard weights with the provided filters
  const {
    data: standardWeights = [],
    isLoading: weightsLoading,
    isFetching: weightsFetching,
    refetch: refetchWeights
  } = useGetStandardWeightsQuery(filters);
  
  // Get ornaments for dropdown selection
  const {
    data: ornaments = [],
    isLoading: ornamentsLoading,
    isFetching: ornamentsFetching
  } = useGetOrnamentsQuery({ isActive: true, excludeWithStandardWeights: true });
  
  // Mutations for modifying data
  const [addStandardWeight] = useAddStandardWeightMutation();
  const [updateStandardWeight] = useUpdateStandardWeightMutation();
  
  // Wrap mutations with error handling
  const handleAddStandardWeight = async (data) => {
    try {
      await addStandardWeight(data).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to add standard weight');
      return false;
    }
  };
  
  const handleUpdateStandardWeight = async (id, data) => {
    try {
      await updateStandardWeight({ id, ...data }).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update standard weight');
      return false;
    }
  };
  
  const clearError = () => setError(null);
  
  // Loading state combines both initial loading and subsequent fetches
  const loading = weightsLoading || weightsFetching || ornamentsLoading || ornamentsFetching;
  
  return {
    standardWeights,
    ornaments,
    loading,
    error,
    clearError,
    addStandardWeight: handleAddStandardWeight,
    updateStandardWeight: handleUpdateStandardWeight,
    refetchWeights
  };
};