import React from 'react';
import { Search, ArrowUpDown, Plus, X } from 'lucide-react';

const StandardWeightFilters = ({
  searchTerm,
  onSearchChange,
  onAddClick,
  onClearFilters
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search ornaments..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>

        {searchTerm && (
          <button
            onClick={onClearFilters}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
          >
            <X size={18} className="mr-1" />
            Clear
          </button>
        )}
      </div>

      <button
        onClick={onAddClick}
        className="bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center transition-colors"
      >
        <Plus size={18} className="mr-2" />
        Add Standard Weight
      </button>
    </div>
  );
};

export default StandardWeightFilters;