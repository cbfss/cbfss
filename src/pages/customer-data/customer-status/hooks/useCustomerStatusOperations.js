import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCustomerStatuses,
  addCustomerStatus,
  updateCustomerStatus,
  toggleCustomerStatusActive,
  selectCustomerStatusStatus,
  selectCustomerStatusError
} from '../../../../store/slices/customer/customerStatusSlice';

const useCustomerStatusOperations = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const status = useSelector(selectCustomerStatusStatus);
  const error = useSelector(selectCustomerStatusError);
  
  // Local error state
  const [localError, setLocalError] = useState(null);
  
  // Load customer statuses on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCustomerStatuses());
    }
  }, [dispatch, status]);
  
  // Update local error when redux error changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);
  
  // CRUD operations
  const handleAddCustomerStatus = async (statusData) => {
    setLocalError(null);
    try {
      await dispatch(addCustomerStatus(statusData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleEditCustomerStatus = async (statusData) => {
    setLocalError(null);
    try {
      await dispatch(updateCustomerStatus(statusData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleToggleStatus = async (statusId) => {
    setLocalError(null);
    try {
      await dispatch(toggleCustomerStatusActive(statusId)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  return {
    status,
    error: localError,
    handleAddCustomerStatus,
    handleEditCustomerStatus,
    handleToggleStatus
  };
};

export default useCustomerStatusOperations;