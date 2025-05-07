// src/pages/customer-data/relationship/hooks/useRelationshipFilters.js
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  setSearchTerm,
  setFilterActive,
  clearFilters,
  selectSearchTerm,
  selectFilterActive,
  selectCurrentTenantId
} from '../../../../store/slices/customer/relationshipSlice';

export const useRelationshipFilters = (relationships = []) => {
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
  const filteredRelationships = useMemo(() => {
    if (!relationships.length) return [];
    
    let result = [...relationships];
    
    // Filter by tenant ID
    result = result.filter(rel => rel.tenant_id === currentTenantId);
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(rel =>
        rel.relationship.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by active status
    if (filterActive !== 'all') {
      result = result.filter(rel =>
        rel.is_active === (filterActive === 'active')
      );
    }
    
    return result;
  }, [relationships, searchTerm, filterActive, currentTenantId]);
  
  return {
    searchTerm,
    filterActive,
    currentTenantId,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    filteredRelationships
  };
};

export default useRelationshipFilters;