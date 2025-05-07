import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchOccupations, 
  addOccupation, 
  updateOccupation, 
  toggleOccupationStatus,
  selectOccupationStatus,
  selectOccupationError 
} from '../../../../store/slices/customer/occupationSlice';

const useOccupationOperations = () => {
  const dispatch = useDispatch();
  
  const status = useSelector(selectOccupationStatus);
  const error = useSelector(selectOccupationError);
  
  // Local error state
  const [localError, setLocalError] = useState(null);
  
  // Load occupations on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOccupations());
    }
  }, [dispatch, status]);
  
  // Update local error when redux error changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);
  
  // CRUD operations
  const handleAddOccupation = async (occupationData) => {
    setLocalError(null);
    try {
      await dispatch(addOccupation(occupationData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleEditOccupation = async (occupationData) => {
    setLocalError(null);
    try {
      await dispatch(updateOccupation(occupationData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleToggleStatus = async (occupationId) => {
    setLocalError(null);
    try {
      await dispatch(toggleOccupationStatus(occupationId)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  return {
    status,
    error: localError,
    handleAddOccupation,
    handleEditOccupation,
    handleToggleStatus
  };
};

export default useOccupationOperations;