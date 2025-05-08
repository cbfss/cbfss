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
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          {/* <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
              placeholder="Search address types..."
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div> */}

          {/* Status Filter */}
          <div className="w-full md:w-auto">
            {/* <div className="flex items-center">
              <Filter size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              <select
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                value={filterActive}
                onChange={onFilterChange}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div> */}
          </div>
        </div>

        {/* Add/Close Button */}
        <button
          onClick={onAddClick}
          className={`${
            isFormVisible ? 'bg-gray-500 hover:bg-gray-700' : 'bg-primary-600 hover:bg-primary-700'
          } text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center transition-colors`}
          aria-label={isFormVisible ? "Close form" : "Add new address type"}
        >
          {isFormVisible ? (
            <>
              <X size={18} className="mr-2" />
              Close Form
            </>
          ) : (
            <>
              <Plus size={18} className="mr-2" />
              Add Address Type
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddressTypeFilters;