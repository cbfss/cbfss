import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchTerm,
  setFilterActive,
  selectFilteredContactTypes,
  selectSearchTerm,
  selectFilterActive
} from '../../../../store/slices/customer/contactTypeSlice';

const useContactTypeFilters = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const filteredContactTypes = useSelector(selectFilteredContactTypes);
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
    filteredContactTypes,
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange
  };
};

export default useContactTypeFilters;