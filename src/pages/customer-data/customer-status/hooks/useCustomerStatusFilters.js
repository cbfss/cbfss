// src/pages/customer-management/customer-status/hooks/useCustomerStatusFilters.js
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  setSearchTerm,
  setFilterActive,
  clearFilters,
  selectSearchTerm,
  selectFilterActive,
  selectCurrentTenantId
} from '../../../../store/slices/customer/customerStatusSlice';

export const useCustomerStatusFilters = (customerStatuses = []) => {
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
  const filteredCustomerStatuses = useMemo(() => {
    if (!customerStatuses.length) return [];
    
    let result = [...customerStatuses];
    
    // Filter by tenant ID
    result = result.filter(status => status.tenant_id === currentTenantId);
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(status =>
        status.status_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (status.description && status.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by active status
    if (filterActive !== 'all') {
      result = result.filter(status =>
        status.is_active === (filterActive === 'active')
      );
    }
    
    return result;
  }, [customerStatuses, searchTerm, filterActive, currentTenantId]);
  
  return {
    searchTerm,
    filterActive,
    currentTenantId,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    filteredCustomerStatuses
  };
};

export default useCustomerStatusFilters;