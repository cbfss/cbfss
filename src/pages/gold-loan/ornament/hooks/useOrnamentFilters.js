// src/pages/gold-loan/ornament/hooks/useOrnamentFilters.js
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  setSearchTerm,
  setFilterActive,
  clearFilters,
  selectSearchTerm,
  selectFilterActive,
  selectCurrentTenantId
} from '../../../../store/slices/gold-loan/ornamentSlice';

export const useOrnamentFilters = (ornaments = []) => {
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
  const filteredOrnaments = useMemo(() => {
    if (!ornaments.length) return [];
    
    let result = [...ornaments];
    
    // Filter by tenant ID
    result = result.filter(ornament => ornament.tenant_id === currentTenantId);
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(ornament =>
        ornament.ornament_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by active status
    if (filterActive !== 'all') {
      result = result.filter(ornament =>
        ornament.is_active === (filterActive === 'active')
      );
    }
    
    return result;
  }, [ornaments, searchTerm, filterActive, currentTenantId]);
  
  return {
    searchTerm,
    filterActive,
    currentTenantId,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    filteredOrnaments
  };
};

export default useOrnamentFilters;