import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setSearchTerm, 
  setFilterActive,
  selectFilteredNationalities, 
  selectSearchTerm, 
  selectFilterActive 
} from '../../../../store/slices/customer/nationalitySlice';

const useNationalityFilters = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const filteredNationalities = useSelector(selectFilteredNationalities);
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
    filteredNationalities,
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange
  };
};

export default useNationalityFilters;