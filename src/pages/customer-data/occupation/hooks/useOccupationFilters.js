import { useSelector, useDispatch } from 'react-redux';
import { 
  setSearchTerm, 
  setFilterActive,
  selectFilteredOccupations, 
  selectSearchTerm, 
  selectFilterActive 
} from '../../../../store/slices/customer/occupationSlice';

const useOccupationFilters = () => {
  const dispatch = useDispatch();
  
  // Select from Redux store
  const filteredOccupations = useSelector(selectFilteredOccupations);
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
    filteredOccupations,
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange
  };
};

export default useOccupationFilters;