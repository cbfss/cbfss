import React from 'react';
import { Search, Filter, Plus, X } from 'lucide-react';

const AddressTypeFilters = ({
  searchTerm,
  filterActive,
  onSearchChange,
  onFilterChange,
  onAddClick,
  isFormVisible
}) => {
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={onAddClick}
        className={`${
          isFormVisible ? 'bg-primary-500 hover:bg-primary-700 ' : 'bg-primary-600 hover:bg-primary-700'
        } text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center transition-colors`}
      >
        {isFormVisible ? (
          <>
             Close  
            <X size={20} className="mr-2" />
            
          </>
        ) : (
          <>
            <Plus size={18} className="mr-2" />
            Add Address Type
          </>
        )}
      </button>
    </div>
  );
};

export default AddressTypeFilters;
