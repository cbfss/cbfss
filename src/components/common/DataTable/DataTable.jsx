import React from 'react';
import { Edit, Search, Filter } from 'lucide-react';
import useTheme from '../../../hooks/useTheme';

const DataTable = ({
  data,
  loading,
  error,
  onEditClick,
  onStatusToggleClick,
  tableConfig,
  emptyStateMessage,
  // New props for integrated search and filter
  searchTerm,
  filterActive,
  onSearchChange,
  onFilterChange
}) => {
  const { isDarkMode } = useTheme();

  // Theme-based styling
  const tableBorderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const tableHeaderBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-50';
  const tableRowBg = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const tableRowHoverBg = isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const textSecondaryColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const loadingColor = 'border-primary-500';
  const errorBg = isDarkMode ? 'bg-red-900' : 'bg-red-100';
  const errorText = isDarkMode ? 'text-red-300' : 'text-red-700';
  const errorBorder = isDarkMode ? 'border-red-700' : 'border-red-400';
  const activeText = isDarkMode ? 'text-green-400' : 'text-green-800';
  const inactiveText = isDarkMode ? 'text-red-400' : 'text-red-800';
  const emptyStateBg = isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500';
  const inputBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const inputBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputText = isDarkMode ? 'text-gray-100' : 'text-gray-900';

  // Check if search and filter functionality are provided
  const hasSearch = typeof searchTerm !== 'undefined' && typeof onSearchChange === 'function';
  const hasFilter = typeof filterActive !== 'undefined' && typeof onFilterChange === 'function';
  const hasSearchOrFilter = hasSearch || hasFilter;

  return (
    <div className="w-full overflow-x-auto">
      {/* Integrated Search and Filters - Only show if functionality is provided */}
      {!loading && !error && hasSearchOrFilter && (
        <div className="mb-4 p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Only show search if searchTerm and onSearchChange are provided */}
            {hasSearch && (
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`${inputBg} border ${inputBorder} ${inputText} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={onSearchChange}
                />
              </div>
            )}

            {/* Only show filter if filterActive and onFilterChange are provided */}
            {hasFilter && (
              <div className="w-full md:w-auto">
                <div className="flex items-center">
                  <Filter size={18} className={`${textSecondaryColor} mr-2`} />
                  <select
                    className={`${inputBg} border ${inputBorder} ${inputText} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    value={filterActive}
                    onChange={onFilterChange}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 ${loadingColor}`}></div>
        </div>
      )}
     
      {error && (
        <div className={`${errorBg} ${errorBorder} border ${errorText} px-4 py-3 rounded-lg mb-4`}>
          <p>Error: {error}</p>
        </div>
      )}
     
      {!loading && !error && (
        <div className="w-full">
          {/* Table Header */}
          <div className={`hidden md:flex rounded-full overflow-hidden border ${tableBorderColor} mb-4`}>
            <div className={`flex w-full text-sm ${textSecondaryColor} font-medium`}>
              {tableConfig.columns.map((column) => (
                <div
                  key={column.key}
                  className={`${column.width} px-6 py-3 ${column.align || 'text-left'}`}
                >
                  {column.header}
                </div>
              ))}
              <div className="w-1/6 px-6 py-3">Actions</div>
            </div>
          </div>
         
          {/* Table Body Rows */}
          <div className="space-y-4">
            {data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item[tableConfig.idField]}
                  className={`block md:flex items-center rounded-xl border ${tableBorderColor} ${tableRowBg} ${tableRowHoverBg}`}
                >
                  {/* Mobile View - Stacked Layout */}
                  <div className="md:hidden p-4 w-full">
                    {tableConfig.columns.map((column) => (
                      <div
                        key={`mobile-${item[tableConfig.idField]}-${column.key}`}
                        className="flex justify-between mb-2 last:mb-0"
                      >
                        <span className={`font-medium ${textColor}`}>{column.header}:</span>
                        <span className={textColor}>
                          {column.key === 'status' ? (
                            <div className="flex items-center">
                              <label className="inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={item[tableConfig.activeField]}
                                  onChange={() => onStatusToggleClick(item)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                <span className="ms-2">
                                  {item[tableConfig.activeField] ? (
                                    <span className={activeText}>Active</span>
                                  ) : (
                                    <span className={inactiveText}>Inactive</span>
                                  )}
                                </span>
                              </label>
                            </div>
                          ) : (
                            column.render ? column.render(item) : item[column.key]
                          )}
                        </span>
                      </div>
                    ))}
                    <div className={`flex justify-between mt-3 pt-2 border-t ${tableBorderColor}`}>
                      <span className={`font-medium ${textColor}`}>Actions:</span>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => onEditClick(item)}
                          className={`${textSecondaryColor} hover:text-primary-500`}
                          aria-label={`Edit ${item[tableConfig.nameField]}`}
                        >
                          <Edit size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop View - Flex Layout */}
                  <div className="hidden md:flex w-full">
                    {tableConfig.columns.map((column) => (
                      <div
                        key={`${item[tableConfig.idField]}-${column.key}`}
                        className={`${column.width} px-6 py-4 ${column.align || ''} ${textColor}`}
                      >
                        {column.key === 'status' ? (
                          <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={item[tableConfig.activeField]}
                                onChange={() => onStatusToggleClick(item)}
                              />
                              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                              <span className="ms-2">
                                {item[tableConfig.activeField] ? (
                                  <span className={activeText}>Active</span>
                                ) : (
                                  <span className={inactiveText}>Inactive</span>
                                )}
                              </span>
                            </label>
                          </div>
                        ) : (
                          column.render ? column.render(item) : item[column.key]
                        )}
                      </div>
                    ))}
                    <div className="w-1/6 px-6 py-4 flex space-x-3">
                      <button
                        onClick={() => onEditClick(item)}
                        className={`${textSecondaryColor} hover:text-primary-500`}
                        aria-label={`Edit ${item[tableConfig.nameField]}`}
                      >
                        <Edit size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`py-4 text-center border ${tableBorderColor} rounded-xl ${emptyStateBg}`}>
                {emptyStateMessage || `No ${tableConfig.itemNamePlural.toLowerCase()} found. Try adjusting your filters or add a new ${tableConfig.itemName.toLowerCase()}.`}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;