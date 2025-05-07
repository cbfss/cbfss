// src/pages/gold-loan/gold-rate/hooks/useGoldRateRTK.js
import { useState } from 'react';
import {
  useGetGoldRatesQuery,
  useGetCaratTypesQuery
} from '../../../../services/gold/goldRateApi';

/**
 * Custom hook for managing gold rate data with RTK Query
 * @param {Object} filters - Optional filters for the data
 * @returns {Object} Data and methods for gold rate management
 */
export const useGoldRateRTK = (filters = {}) => {
  const [error, setError] = useState(null);
  
  // Get gold rates with the provided filters
  const {
    data: goldRates = [],
    isLoading: ratesLoading,
    isFetching: ratesFetching,
    refetch: refetchRates
  } = useGetGoldRatesQuery(filters);
  
  // Get carat types for form dropdown
  const {
    data: caratTypes = [],
    isLoading: caratLoading,
    refetch: refetchCaratTypes
  } = useGetCaratTypesQuery();
  
  // For the mutation hooks, we'll need to make sure those are properly exported
  // from the goldRateApi.js file. For now, let's create mock functions:
  
  const addGoldRate = async (data) => {
    try {
      // In a real app, this would call the API mutation
      console.log('Adding gold rate:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicate (same carat and date)
      const isDuplicate = goldRates.some(rate => 
        rate.carat_id === data.carat_id && 
        rate.rate_date === data.rate_date
      );
      
      if (isDuplicate) {
        throw new Error('A gold rate already exists for this carat type and date. Please update the existing rate instead.');
      }
      
      // Instead of adding to mock data, we'd call the mutation
      // But for now we'll just refetch to simulate the update
      refetchRates();
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to add gold rate');
      return false;
    }
  };
  
  const updateGoldRate = async (data) => {
    try {
      // In a real app, this would call the API mutation
      console.log('Updating gold rate:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicates if carat or date changed
      const existingRate = goldRates.find(rate => rate.gold_rate_id === data.gold_rate_id);
      
      if (existingRate) {
        if (data.carat_id !== existingRate.carat_id || data.rate_date !== existingRate.rate_date) {
          const isDuplicate = goldRates.some(rate => 
            rate.carat_id === data.carat_id && 
            rate.rate_date === data.rate_date &&
            rate.gold_rate_id !== data.gold_rate_id
          );
          
          if (isDuplicate) {
            throw new Error('A gold rate already exists for this carat type and date. Please update the existing rate instead.');
          }
        }
      }
      
      // Instead of updating mock data, we'd call the mutation
      // But for now we'll just refetch to simulate the update
      refetchRates();
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update gold rate');
      return false;
    }
  };
  
  const clearError = () => setError(null);
  
  // Combined loading state
  const loading = ratesLoading || ratesFetching || caratLoading;
  
  return {
    goldRates,
    caratTypes,
    loading,
    error,
    clearError,
    addGoldRate,
    updateGoldRate,
    getCaratTypes: refetchCaratTypes,
    refetch: refetchRates
  };
};

export default useGoldRateRTK;