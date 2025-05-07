import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

const ContactTypeFilters = ({
  searchTerm,
  filterActive,
  onSearchChange,
  onFilterChange,
  onAddClick
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex items-center w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search contact types..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>

        <div className="ml-0 md:ml-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={filterActive}
              onChange={onFilterChange}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={onAddClick}
        className="bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center transition-colors"
      >
        <Plus size={18} className="mr-2" />
        Add Contact Type
      </button>
    </div>
  );
};

export default ContactTypeFilters;