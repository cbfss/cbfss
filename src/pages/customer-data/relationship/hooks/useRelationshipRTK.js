// src/pages/customer-data/relationship/hooks/useRelationshipRTK.js
import { useState } from 'react';
import {
  useGetRelationshipsQuery,
  useAddRelationshipMutation,
  useUpdateRelationshipMutation,
  useToggleRelationshipStatusMutation
} from '../../../../services/customer/relationshipApi';

export const useRelationshipRTK = (filters = {}) => {
  const [error, setError] = useState(null);
  
  // Get relationships with the provided filters
  const {
    data: relationships = [],
    isLoading,
    isFetching,
    refetch
  } = useGetRelationshipsQuery(filters);
  
  // Mutations for modifying data
  const [addRelationship] = useAddRelationshipMutation();
  const [updateRelationship] = useUpdateRelationshipMutation();
  const [toggleStatus] = useToggleRelationshipStatusMutation();
  
  // Wrap mutations with error handling
  const handleAddRelationship = async (data) => {
    try {
      await addRelationship(data).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to add relationship');
      return false;
    }
  };
  
  const handleUpdateRelationship = async (data) => {
    try {
      await updateRelationship({
        id: data.relationship_id,
        relationship: data.relationship
      }).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update relationship');
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
    relationships,
    loading,
    error,
    clearError,
    addRelationship: handleAddRelationship,
    updateRelationship: handleUpdateRelationship,
    toggleStatus: handleToggleStatus,
    refetch
  };
};

export default useRelationshipRTK;