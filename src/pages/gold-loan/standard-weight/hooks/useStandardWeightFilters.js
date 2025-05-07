import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  setSearchTerm,
  setSortField,
  clearFilters,
  selectSearchTerm,
  selectSortField,
  selectSortDirection,
  selectCurrentTenantId
} from '../../../../store/slices/gold-loan/standardWeightSlice';

/**
 * Custom hook for managing standard weight filters and sorting
 */
export const useStandardWeightFilters = (standardWeights = []) => {
  const dispatch = useDispatch();
  
  // Get filter values from Redux state
  const searchTerm = useSelector(selectSearchTerm);
  const sortField = useSelector(selectSortField);
  const sortDirection = useSelector(selectSortDirection);
  const currentTenantId = useSelector(selectCurrentTenantId);
  
  // Filter change handlers
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };
  
  const handleSortChange = (field) => {
    dispatch(setSortField(field));
  };
  
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  
  // Memoized filtering and sorting logic
  const filteredAndSortedStandardWeights = useMemo(() => {
    if (!standardWeights.length) return [];
    
    let result = [...standardWeights];
    
    // Filter by tenant ID
    result = result.filter(weight => weight.tenant_id === currentTenantId);
    
    // Filter by search term (search in ornament name)
    if (searchTerm) {
      result = result.filter(weight =>
        weight.ornament_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort results
    result.sort((a, b) => {
      let valueA, valueB;
      
      // Handle special case for nested properties
      if (sortField === 'ornament_name') {
        valueA = a.ornament_name;
        valueB = b.ornament_name;
      } else {
        valueA = a[sortField];
        valueB = b[sortField];
      }
      
      // String comparison
      if (typeof valueA === 'string') {
        if (sortDirection === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      }
      
      // Number comparison
      if (sortDirection === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
    
    return result;
  }, [standardWeights, searchTerm, sortField, sortDirection, currentTenantId]);
  
  // Return filter values, handlers, and filtered data
  return {
    // Filter values
    searchTerm,
    sortField,
    sortDirection,
    currentTenantId,
    
    // Filter handlers
    handleSearchChange,
    handleSortChange,
    handleClearFilters,
    
    // Filtered data
    filteredStandardWeights: filteredAndSortedStandardWeights
  };
};
