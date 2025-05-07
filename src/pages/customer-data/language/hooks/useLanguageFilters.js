import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchTerm,
  setFilterActive,
  selectFilteredLanguages,
  selectSearchTerm,
  selectFilterActive
} from '../../../../store/slices/customer/languageSlice';

const useLanguageFilters = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const filteredLanguages = useSelector(selectFilteredLanguages);
  const searchTerm = useSelector(selectSearchTerm);
  const filterActive = useSelector(selectFilterActive);
  
  // Handle filter changes
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };
  
  const handleFilterChange = (e) => {
    dispatch(setFilterActive(e.target.value));
  };
  
  return {
    filteredLanguages,
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange
  };
};

export default useLanguageFilters;
