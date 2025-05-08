import React, { useState } from 'react';
import AddressTypeFilters from './components/AddressTypeFilters';
import InlineAddressTypeForm from './components/InlineAddressTypeForm';
import DataTable from '../../../components/common/DataTable';
import { useAddressTypeRTK } from './hooks/useAddressTypeRTK';
import { useAddressTypeFilters } from './hooks/useAddressTypeFilters';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import ErrorBoundary from '../../../components/common/ErrorBoundary';

const AddressTypePage = () => {
  // State for the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAddressType, setEditingAddressType] = useState(null);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  const [statusItem, setStatusItem] = useState(null);
  const [formError, setFormError] = useState(null);
 
  // Get data and methods from custom hooks
  const {
    addressTypes,
    loading,
    error,
    clearError,
    addAddressType,
    updateAddressType,
    toggleStatus
  } = useAddressTypeRTK();
 
  const {
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange,
    filteredAddressTypes
  } = useAddressTypeFilters(addressTypes);
 
  // Form handlers
  const handleOpenForm = (addressType = null) => {
    setEditingAddressType(addressType);
    setIsFormVisible(true);
    setFormError(null);
    clearError();
  };
 
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingAddressType(null);
    setFormError(null);
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
    
    try {
      if (editingAddressType) {
        // Update existing address type
        success = await updateAddressType(
          formData.address_type_id,
          formData
        );
      } else {
        // Add new address type
        success = await addAddressType(formData);
      }
      
      if (success) {
        handleCloseForm();
      }
    } catch (err) {
      setFormError(err.message || 'An error occurred while saving the address type');
    }
  };

  const handleStatusToggleClick = (item) => {
    setStatusItem(item);
    setShowStatusConfirmModal(true);
  };

  const handleStatusConfirm = async () => {
    try {
      await toggleStatus(statusItem.address_type_id);
      setShowStatusConfirmModal(false);
    } catch (err) {
      // Handle error
      console.error('Error toggling status:', err);
    }
  };
 
  // Table configuration
  const tableConfig = {
    columns: [
      // {
      //   key: 'address_type_id',
      //   header: 'ID',
      //   width: 'w-1/4',
      // },
      {
        key: 'address_type_name',
        header: 'Address Type',
        width: 'w-2/4',
      },
      {
        key: 'status',
        header: 'Status',
        width: 'w-1/4',
      }
    ],
    idField: 'address_type_id',
    nameField: 'address_type_name',
    activeField: 'is_active',
    itemName: 'Address Type',
    itemNamePlural: 'Address Types'
  };
 
  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Something went wrong loading the Address Types. Please try again later.</div>}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Address Types</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage address types for customer profiles
          </p>
        </div>
       
        {/* Modified Filters - just the Add/Close button */}
        <AddressTypeFilters
          searchTerm={searchTerm}
          filterActive={filterActive}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          isFormVisible={isFormVisible}
          onAddClick={handleToggleForm}
        />
       
        {/* Inline Form */}
        <InlineAddressTypeForm
          isVisible={isFormVisible}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          initialData={editingAddressType}
          isLoading={loading}
          error={formError || error}
        />
       
        {/* Table with integrated search and filters */}
        <DataTable
          data={filteredAddressTypes}
          loading={loading}
          error={error}
          onEditClick={handleOpenForm}
          onStatusToggleClick={handleStatusToggleClick}
          tableConfig={tableConfig}
          emptyStateMessage="No address types found. Try adjusting your filters or add a new address type."
          searchTerm={searchTerm}
          filterActive={filterActive}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />
        
        <ConfirmationModal
          isOpen={showStatusConfirmModal}
          onClose={() => setShowStatusConfirmModal(false)}
          onConfirm={handleStatusConfirm}
          title="Confirm Status Change"
          message={statusItem 
            ? `Are you sure you want to ${statusItem.is_active ? 'deactivate' : 'activate'} "${statusItem.address_type_name}"?` 
            : 'Are you sure you want to change the status?'}
          confirmText={statusItem?.is_active ? "Deactivate" : "Activate"}
          isLoading={loading}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AddressTypePage;