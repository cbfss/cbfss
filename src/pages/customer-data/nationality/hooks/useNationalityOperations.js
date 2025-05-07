import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchNationalities, 
  addNationality, 
  updateNationality, 
  toggleNationalityStatus,
  selectNationalityStatus,
  selectNationalityError 
} from '../../../../store/slices/customer/nationalitySlice';

const useNationalityOperations = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const status = useSelector(selectNationalityStatus);
  const error = useSelector(selectNationalityError);
  
  // Local error state
  const [localError, setLocalError] = useState(null);
  
  // Load nationalities on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNationalities());
    }
  }, [dispatch, status]);
  
  // Update local error when redux error changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);
  
  // CRUD operations
  const handleAddNationality = async (nationalityData) => {
    setLocalError(null);
    try {
      await dispatch(addNationality(nationalityData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleEditNationality = async (nationalityData) => {
    setLocalError(null);
    try {
      await dispatch(updateNationality(nationalityData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleToggleStatus = async (nationalityId) => {
    setLocalError(null);
    try {
      await dispatch(toggleNationalityStatus(nationalityId)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  return {
    status,
    error: localError,
    handleAddNationality,
    handleEditNationality,
    handleToggleStatus
  };
};

export default useNationalityOperations;