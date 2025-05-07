// src/pages/customer-data/relationship/RelationshipPage.jsx
import React, { useState } from 'react';
import RelationshipFilters from './components/RelationshipFilters';
import InlineRelationshipForm from './components/InlineRelationshipForm';
import DataTable from '../../../components/common/DataTable';
import { useRelationshipRTK } from './hooks/useRelationshipRTK';
import { useRelationshipFilters } from './hooks/useRelationshipFilters';
import ConfirmationModal from '../../../components/common/ConfirmationModal';

const RelationshipPage = () => {
  // State for the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRelationship, setEditingRelationship] = useState(null);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  const [statusItem, setStatusItem] = useState(null);
  
  // Get data and methods from custom hooks
  const {
    relationships,
    loading,
    error,
    clearError,
    addRelationship,
    updateRelationship,
    toggleStatus
  } = useRelationshipRTK();
  
  const {
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange,
    filteredRelationships
  } = useRelationshipFilters(relationships);
  
  // Form handlers
  const handleOpenForm = (relationship = null) => {
    setEditingRelationship(relationship);
    setIsFormVisible(true);
    clearError();
  };
  
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingRelationship(null);
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
    
    if (editingRelationship) {
      // Update existing relationship
      success = await updateRelationship(formData);
    } else {
      // Add new relationship
      success = await addRelationship(formData);
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
    toggleStatus(statusItem.relationship_id);
    setShowStatusConfirmModal(false);
  };
  
  // Table configuration
  const tableConfig = {
    columns: [
      {
        key: 'relationship_id',
        header: 'ID',
        width: 'w-1/4',
      },
      {
        key: 'relationship',
        header: 'Relationship',
        width: 'w-2/4',
      },
      {
        key: 'status',
        header: 'Status',
        width: 'w-1/4',
      }
    ],
    idField: 'relationship_id',
    nameField: 'relationship',
    activeField: 'is_active',
    itemName: 'Relationship',
    itemNamePlural: 'Relationships'
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Relationships</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage relationships for customer profiles
        </p>
      </div>
      
      {/* Modified Filters - just the Add/Close button */}
      <RelationshipFilters
        isFormVisible={isFormVisible}
        onAddClick={handleToggleForm}
      />
      
      {/* Inline Form */}
      <InlineRelationshipForm
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingRelationship}
        isLoading={loading}
        error={error}
      />
      
      {/* Table with integrated search and filters */}
      <DataTable
        data={filteredRelationships}
        loading={loading}
        error={error}
        onEditClick={handleOpenForm}
        onStatusToggleClick={handleStatusToggleClick}
        tableConfig={tableConfig}
        emptyStateMessage="No relationships found. Try adjusting your filters or add a new relationship."
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
          ? `Are you sure you want to ${statusItem.is_active ? 'deactivate' : 'activate'} "${statusItem.relationship}"?` 
          : 'Are you sure you want to change the status?'}
        confirmText={statusItem?.is_active ? "Deactivate" : "Activate"}
        isLoading={loading}
      />
    </div>
  );
};

export default RelationshipPage;
