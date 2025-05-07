// src/pages/customer-data/address-type/hooks/useAddressTypeFilters.js
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { 
  setSearchTerm, 
  setFilterActive, 
  clearFilters,
  selectSearchTerm,
  selectFilterActive,
  selectCurrentTenantId
} from '../../../../store/slices/customer/addressTypeSlice';

/**
 * Custom hook for managing address type filters
 * Separates UI state from data fetching
 */
export const useAddressTypeFilters = (addressTypes = []) => {
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
  const filteredAddressTypes = useMemo(() => {
    if (!addressTypes.length) return [];
    
    let result = [...addressTypes];
    
    // Filter by tenant ID
    result = result.filter(type => type.tenant_id === currentTenantId);
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(type =>
        type.address_type_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by active status
    if (filterActive !== 'all') {
      result = result.filter(type =>
        type.is_active === (filterActive === 'active')
      );
    }
    
    return result;
  }, [addressTypes, searchTerm, filterActive, currentTenantId]);
  
  // Return filter values, handlers, and filtered data
  return {
    // Filter values
    searchTerm,
    filterActive,
    currentTenantId,
    
    // Filter handlers
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    
    // Filtered data
    filteredAddressTypes
  };
};