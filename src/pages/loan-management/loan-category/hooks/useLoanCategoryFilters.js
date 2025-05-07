import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  setSearchTerm,
  setFilterActive,
  clearFilters,
  selectSearchTerm,
  selectFilterActive,
  selectCurrentTenantId
} from '../../../../store/slices/loan-management/loanCategorySlice';

export const useLoanCategoryFilters = (loanCategories = []) => {
  const dispatch = useDispatch();
  
  // Get filter values from Redux state
  const searchTerm = useSelector(selectSearchTerm);
  const filterActive = useSelector(selectFilterActive);
  const currentTenantId = useSelector(selectCurrentTenantId);
  
  // Filter change handlers
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };
  
  const handleFilterChange = (e) => {
    dispatch(setFilterActive(e.target.value));
  };
  
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  
  // Memoized filtering logic
  const filteredLoanCategories = useMemo(() => {
    if (!loanCategories.length) return [];
    
    let result = [...loanCategories];
    
    // Filter by tenant ID
    result = result.filter(category => category.tenant_id === currentTenantId);
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(category =>
        category.loan_category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by active status
    if (filterActive !== 'all') {
      result = result.filter(category =>
        category.is_active === (filterActive === 'active')
      );
    }
    
    return result;
  }, [loanCategories, searchTerm, filterActive, currentTenantId]);
  
  return {
    searchTerm,
    filterActive,
    currentTenantId,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    filteredLoanCategories
  };
};

export default useLoanCategoryFilters;
