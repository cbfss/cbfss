import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContactTypes,
  addContactType,
  updateContactType,
  toggleContactTypeStatus,
  selectContactTypeStatus,
  selectContactTypeError
} from '../../../../store/slices/customer/contactTypeSlice';

const useContactTypeOperations = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const status = useSelector(selectContactTypeStatus);
  const error = useSelector(selectContactTypeError);
  
  // Local error state
  const [localError, setLocalError] = useState(null);
  
  // Load contact types on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContactTypes());
    }
  }, [dispatch, status]);
  
  // Update local error when redux error changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);
  
  // CRUD operations
  const handleAddContactType = async (contactTypeData) => {
    setLocalError(null);
    try {
      await dispatch(addContactType(contactTypeData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleEditContactType = async (contactTypeData) => {
    setLocalError(null);
    try {
      await dispatch(updateContactType(contactTypeData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleToggleStatus = async (contactTypeId) => {
    setLocalError(null);
    try {
      await dispatch(toggleContactTypeStatus(contactTypeId)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  return {
    status,
    error: localError,
    handleAddContactType,
    handleEditContactType,
    handleToggleStatus
  };
};

export default useContactTypeOperations;
