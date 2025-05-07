import React from 'react';
import { Calendar, Award, Plus, X, RefreshCw } from 'lucide-react';

const GoldRateFilters = ({
  isFormVisible,
  onAddClick,
  searchDate,
  filterCaratId,
  caratTypes,
  onDateChange,
  onCaratFilterChange,
  onClearFilters
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        {/* Date Filter */}
        <div className="relative w-full md:w-52">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Calendar size={18} className="text-gray-400" />
          </div>
          <input
            type="date"
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
            value={searchDate}
            onChange={onDateChange}
          />
        </div>
        
        {/* Carat Type Filter */}
        <div className="w-full md:w-52">
          <div className="flex items-center">
            <Award size={18} className="text-gray-400 mr-2" />
            <select
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              value={filterCaratId}
              onChange={onCaratFilterChange}
            >
              <option value="all">All Carat Types</option>
              {caratTypes.map(carat => (
                <option key={carat.carat_id} value={carat.carat_id}>
                  {carat.carat_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Clear Filters Button */}
        <button
          onClick={onClearFilters}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <RefreshCw size={16} className="mr-2" />
          Clear Filters
        </button>
      </div>
      
      {/* Add/Close Form Button */}
      <button
        onClick={onAddClick}
        className={`${
          isFormVisible ? 'bg-gray-600 hover:bg-gray-700' : 'bg-primary-600 hover:bg-primary-700'
        } text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center ml-auto transition-colors`}
      >
        {isFormVisible ? (
          <>
            <X size={18} className="mr-2" />
            Close Form
          </>
        ) : (
          <>
            <Plus size={18} className="mr-2" />
            Add Gold Rate
          </>
        )}
      </button>
    </div>
  );
};

export default GoldRateFilters;