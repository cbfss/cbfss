import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLanguages,
  addLanguage,
  updateLanguage,
  toggleLanguageStatus,
  selectLanguageStatus,
  selectLanguageError
} from '../../../../store/slices/customer/languageSlice';

const useLanguageOperations = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const status = useSelector(selectLanguageStatus);
  const error = useSelector(selectLanguageError);
  
  // Local error state
  const [localError, setLocalError] = useState(null);
  
  // Load languages on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLanguages());
    }
  }, [dispatch, status]);
  
  // Update local error when redux error changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);
  
  // CRUD operations
  const handleAddLanguage = async (languageData) => {
    setLocalError(null);
    try {
      await dispatch(addLanguage(languageData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleEditLanguage = async (languageData) => {
    setLocalError(null);
    try {
      await dispatch(updateLanguage(languageData)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  const handleToggleStatus = async (languageId) => {
    setLocalError(null);
    try {
      await dispatch(toggleLanguageStatus(languageId)).unwrap();
      return true;
    } catch (err) {
      setLocalError(err);
      return false;
    }
  };
  
  return {
    status,
    error: localError,
    handleAddLanguage,
    handleEditLanguage,
    handleToggleStatus
  };
};

export default useLanguageOperations;