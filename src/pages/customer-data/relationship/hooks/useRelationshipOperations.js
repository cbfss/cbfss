import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRelationships,
  addRelationship,
  updateRelationship,
  toggleRelationshipStatus,
  selectRelationshipStatus,
  selectRelationshipError
} from '../../../../store/slices/customer/relationshipSlice';

const useRelationshipOperations = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const status = useSelector(selectRelationshipStatus);
  const error = useSelector(selectRelationshipError);
  
  // Local error state
  const [localError, setLocalError] = useState(null);
  
  // Load relationships on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRelationships());
    }
  }, [dispatch, status]);
  
  // Update local error when redux error changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);
  
  // CRUD operations
  const handleAddRelationship = async (relationshipData) => {
    setLocalError(null);
    try {
      await dispatch(addRelationship(relationshipData)).unwrap();
      return true; // Return true on success
    } catch (err) {
      setLocalError(err);
      return false; // Return false on failure
    }
  };
  
  const handleEditRelationship = async (relationshipData) => {
    setLocalError(null);
    try {
      await dispatch(updateRelationship(relationshipData)).unwrap();
      return true; // Return true on success
    } catch (err) {
      setLocalError(err);
      return false; // Return false on failure
    }
  };
  
  const handleToggleStatus = async (relationshipId) => {
    setLocalError(null);
    try {
      await dispatch(toggleRelationshipStatus(relationshipId)).unwrap();
      return true; // Return true on success
    } catch (err) {
      setLocalError(err);
      return false; // Return false on failure
    }
  };
  
  return {
    status,
    error: localError,
    handleAddRelationship,
    handleEditRelationship,
    handleToggleStatus
  };
};

export default useRelationshipOperations;