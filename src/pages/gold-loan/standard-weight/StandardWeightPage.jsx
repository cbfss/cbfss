import React, { useState } from 'react';
import StandardWeightFilters from './components/StandardWeightFilters';
import StandardWeightModal from './components/StandardWeightModal';
import DataTable from '../../../components/common/DataTable';
import { useStandardWeightRTK } from './hooks/useStandardWeightRTK';
import { useStandardWeightFilters } from './hooks/useStandardWeightFilters';
import { ArrowUpDown } from 'lucide-react';

const StandardWeightPage = () => {
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStandardWeight, setEditingStandardWeight] = useState(null);
  
  // Get data and methods from custom hooks
  const {
    standardWeights,
    ornaments,
    loading,
    error,
    clearError,
    addStandardWeight,
    updateStandardWeight
  } = useStandardWeightRTK();
  
  const {
    searchTerm,
    sortField,
    sortDirection,
    handleSearchChange,
    handleSortChange,
    handleClearFilters,
    filteredStandardWeights
  } = useStandardWeightFilters(standardWeights);
  
  // Modal handlers
  const handleOpenModal = (standardWeight = null) => {
    setEditingStandardWeight(standardWeight);
    setIsModalOpen(true);
    clearError();
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStandardWeight(null);
  };
  
  const handleSubmit = async (formData) => {
    let success;
    
    if (editingStandardWeight) {
      // Update existing standard weight
      success = await updateStandardWeight(
        editingStandardWeight.weight_id,
        formData
      );
    } else {
      // Add new standard weight
      success = await addStandardWeight(formData);
    }
    
    if (success) {
      handleCloseModal();
    }
  };
  
  // Column sort handler
  const handleSort = (field) => {
    handleSortChange(field);
  };
  
  // Table configuration
  const tableConfig = {
    columns: [
      {
        key: 'weight_id',
        header: 'ID',
        width: 'w-1/6',
        render: (item) => (
          <div className="flex items-center">
            {item.weight_id}
            {sortField === 'weight_id' && (
              <span className="ml-1 text-gray-500">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </div>
        ),
        onClick: () => handleSort('weight_id')
      },
      {
        key: 'ornament_name',
        header: (
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleSort('ornament_name')}
          >
            Ornament
            {sortField === 'ornament_name' && (
              <span className="ml-1 text-gray-500">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
            <ArrowUpDown size={14} className="ml-1 text-gray-400" />
          </div>
        ),
        width: 'w-3/6',
      },
      {
        key: 'standard_weight',
        header: (
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleSort('standard_weight')}
          >
            Standard Weight (g)
            {sortField === 'standard_weight' && (
              <span className="ml-1 text-gray-500">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
            <ArrowUpDown size={14} className="ml-1 text-gray-400" />
          </div>
        ),
        width: 'w-2/6',
        render: (item) => item.standard_weight.toFixed(2)
      }
    ],
    idField: 'weight_id',
    nameField: 'ornament_name',
    activeField: null, // No active/inactive status for standard weights
    itemName: 'Standard Weight',
    itemNamePlural: 'Standard Weights'
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Standard Weights</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage standard weights for ornaments used in gold loan appraisal
        </p>
      </div>
      
      {/* Filters */}
      <StandardWeightFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddClick={() => handleOpenModal()}
        onClearFilters={handleClearFilters}
      />
      
      {/* Modal */}
      <StandardWeightModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingStandardWeight}
        ornaments={ornaments}
        isLoading={loading}
        error={error}
      />
      
      {/* Table */}
      <DataTable
        data={filteredStandardWeights}
        loading={loading}
        error={error}
        onEditClick={handleOpenModal}
        onStatusToggleClick={null} // No status toggle for standard weights
        tableConfig={tableConfig}
        emptyStateMessage="No standard weights found. Try adjusting your search or add a new standard weight."
      />
    </div>
  );
};

export default StandardWeightPage;