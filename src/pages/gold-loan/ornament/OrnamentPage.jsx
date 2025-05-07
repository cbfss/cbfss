// src/pages/gold-loan/ornament/OrnamentPage.jsx
import React, { useState } from 'react';
import OrnamentFilters from './components/OrnamentFilters';
import InlineOrnamentForm from './components/InlineOrnamentForm';
import DataTable from '../../../components/common/DataTable';
import { useOrnamentRTK } from './hooks/useOrnamentRTK';
import { useOrnamentFilters } from './hooks/useOrnamentFilters';
import ConfirmationModal from '../../../components/common/ConfirmationModal';

const OrnamentPage = () => {
  // State for the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingOrnament, setEditingOrnament] = useState(null);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  const [statusItem, setStatusItem] = useState(null);
  
  // Get data and methods from custom hooks
  const {
    ornaments,
    loading,
    error,
    clearError,
    addOrnament,
    updateOrnament,
    toggleStatus
  } = useOrnamentRTK();
  
  const {
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange,
    filteredOrnaments
  } = useOrnamentFilters(ornaments);
  
  // Form handlers
  const handleOpenForm = (ornament = null) => {
    setEditingOrnament(ornament);
    setIsFormVisible(true);
    clearError();
  };
  
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingOrnament(null);
  };

  const handleToggleForm = () => {
    if (isFormVisible) {
      handleCloseForm();
    } else {
      handleOpenForm();
    }
  };
  
  const handleSubmit = async (formData) => {
    let success;
    
    if (editingOrnament) {
      // Update existing ornament
      success = await updateOrnament(formData);
    } else {
      // Add new ornament
      success = await addOrnament(formData);
    }
    
    if (success) {
      handleCloseForm();
    }
  };
  
  // Status toggle handlers
  const handleStatusToggleClick = (item) => {
    setStatusItem(item);
    setShowStatusConfirmModal(true);
  };
  
  const handleStatusConfirm = () => {
    toggleStatus(statusItem.ornament_id);
    setShowStatusConfirmModal(false);
  };
  
  // Table configuration
  const tableConfig = {
    columns: [
      {
        key: 'ornament_id',
        header: 'ID',
        width: 'w-1/4',
      },
      {
        key: 'ornament_name',
        header: 'Ornament Name',
        width: 'w-2/4',
      },
      {
        key: 'status',
        header: 'Status',
        width: 'w-1/4',
      }
    ],
    idField: 'ornament_id',
    nameField: 'ornament_name',
    activeField: 'is_active',
    itemName: 'Ornament',
    itemNamePlural: 'Ornaments'
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Ornaments</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage ornament types for gold loan processing
        </p>
      </div>
      
      {/* Modified Filters - just the Add/Close button */}
      <OrnamentFilters
        isFormVisible={isFormVisible}
        onAddClick={handleToggleForm}
      />
      
      {/* Inline Form */}
      <InlineOrnamentForm
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingOrnament}
        isLoading={loading}
        error={error}
      />
      
      {/* Table with integrated search and filters */}
      <DataTable
        data={filteredOrnaments}
        loading={loading}
        error={error}
        onEditClick={handleOpenForm}
        onStatusToggleClick={handleStatusToggleClick}
        tableConfig={tableConfig}
        emptyStateMessage="No ornaments found. Try adjusting your filters or add a new ornament."
        searchTerm={searchTerm}
        filterActive={filterActive}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      
      {/* Status Toggle Confirmation Modal */}
      <ConfirmationModal
        isOpen={showStatusConfirmModal}
        onClose={() => setShowStatusConfirmModal(false)}
        onConfirm={handleStatusConfirm}
        title="Confirm Status Change"
        message={statusItem 
          ? `Are you sure you want to ${statusItem.is_active ? 'deactivate' : 'activate'} "${statusItem.ornament_name}"?` 
          : 'Are you sure you want to change the status?'}
        confirmText={statusItem?.is_active ? "Deactivate" : "Activate"}
        isLoading={loading}
      />
    </div>
  );
};

export default OrnamentPage;