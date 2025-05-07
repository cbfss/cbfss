// src/pages/gold-loan/gold-rate/hooks/useGoldRateFilters.js
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  setSearchDate,
  setFilterCaratId,
  clearFilters,
  selectSearchDate,
  selectFilterCaratId,
  selectCurrentTenantId
} from '../../../../store/slices/gold/goldRateSlice';

/**
 * Custom hook for gold rate filtering functionality
 * @param {Array} goldRates - Array of gold rates to filter
 * @returns {Object} Filtered data and handler functions
 */
export const useGoldRateFilters = (goldRates = []) => {
  const dispatch = useDispatch();
  
  // Get filter values from Redux state
  const searchDate = useSelector(selectSearchDate);
  const filterCaratId = useSelector(selectFilterCaratId);
  const currentTenantId = useSelector(selectCurrentTenantId);
  
  // Filter change handlers
  const handleDateChange = (e) => {
    dispatch(setSearchDate(e.target.value));
  };
  
  const handleCaratFilterChange = (e) => {
    dispatch(setFilterCaratId(e.target.value));
  };
  
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  
  // Memoized filtering logic
  const filteredGoldRates = useMemo(() => {
    if (!goldRates.length) return [];
    
    let result = [...goldRates];
    
    // Filter by tenant ID
    result = result.filter(rate => rate.tenant_id === currentTenantId);
    
    // Filter by date
    if (searchDate) {
      result = result.filter(rate => rate.rate_date === searchDate);
    }
    
    // Filter by carat type
    if (filterCaratId !== 'all') {
      result = result.filter(rate => rate.carat_id.toString() === filterCaratId);
    }
    
    return result;
  }, [goldRates, searchDate, filterCaratId, currentTenantId]);
  
  return {
    searchDate,
    filterCaratId,
    currentTenantId,
    handleDateChange,
    handleCaratFilterChange,
    handleClearFilters,
    filteredGoldRates
  };
};

export default useGoldRateFilters;