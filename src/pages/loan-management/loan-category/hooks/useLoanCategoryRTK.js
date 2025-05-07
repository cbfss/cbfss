// src/pages/loan-management/loan-category/hooks/useLoanCategoryRTK.js
import { useState } from 'react';
import {
  useGetLoanCategoriesQuery,
  useAddLoanCategoryMutation,
  useUpdateLoanCategoryMutation,
  useToggleLoanCategoryStatusMutation
} from '../../../../services/loan-management/loanCategoryApi';

export const useLoanCategoryRTK = (filters = {}) => {
  const [error, setError] = useState(null);
  
  // Get loan categories with the provided filters
  const {
    data: loanCategories = [],
    isLoading,
    isFetching,
    refetch
  } = useGetLoanCategoriesQuery(filters);
  
  // Mutations for modifying data
  const [addLoanCategory] = useAddLoanCategoryMutation();
  const [updateLoanCategory] = useUpdateLoanCategoryMutation();
  const [toggleStatus] = useToggleLoanCategoryStatusMutation();
  
  // Wrap mutations with error handling
  const handleAddLoanCategory = async (data) => {
    try {
      await addLoanCategory(data).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to add loan category');
      return false;
    }
  };
  
  const handleUpdateLoanCategory = async (data) => {
    try {
      await updateLoanCategory({
        id: data.loan_category_id,
        loan_category_name: data.loan_category_name,
        description: data.description
      }).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update loan category');
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
    loanCategories,
    loading,
    error,
    clearError,
    addLoanCategory: handleAddLoanCategory,
    updateLoanCategory: handleUpdateLoanCategory,
    toggleStatus: handleToggleStatus,
    refetch
  };
};

export default useLoanCategoryRTK;