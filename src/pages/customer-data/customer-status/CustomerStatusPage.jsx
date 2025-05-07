// src/pages/customer-management/customer-status/CustomerStatusPage.jsx
import React, { useState } from 'react';
import CustomerStatusFilters from './components/CustomerStatusFilters';
import InlineCustomerStatusForm from './components/InlineCustomerStatusForm';
import DataTable from '../../../components/common/DataTable';
import { useCustomerStatusRTK } from './hooks/useCustomerStatusRTK';
import { useCustomerStatusFilters } from './hooks/useCustomerStatusFilters';
import ConfirmationModal from '../../../components/common/ConfirmationModal';

const CustomerStatusPage = () => {
  // State for the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  const [statusItem, setStatusItem] = useState(null);
  
  // Get data and methods from custom hooks
  const {
    customerStatuses,
    loading,
    error,
    clearError,
    addCustomerStatus,
    updateCustomerStatus,
    toggleStatus
  } = useCustomerStatusRTK();
  
  const {
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange,
    filteredCustomerStatuses
  } = useCustomerStatusFilters(customerStatuses);
  
  // Form handlers
  const handleOpenForm = (status = null) => {
    setEditingStatus(status);
    setIsFormVisible(true);
    clearError();
  };
  
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingStatus(null);
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
    
    if (editingStatus) {
      // Update existing status
      success = await updateCustomerStatus(formData);
    } else {
      // Add new status
      success = await addCustomerStatus(formData);
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
    toggleStatus(statusItem.status_id);
    setShowStatusConfirmModal(false);
  };
  
  // Table configuration
  const tableConfig = {
    columns: [
      {
        key: 'status_id',
        header: 'ID',
        width: 'w-1/12',
        render: (item) => <span>{item.status_id}</span>
      },
      {
        key: 'status_name',
        header: 'Status Name',
        width: 'w-3/12',
        render: (item) => <span className="font-medium">{item.status_name}</span>
      },
      {
        key: 'description',
        header: 'Description',
        width: 'w-5/12',
        render: (item) => <span className="text-gray-600 dark:text-gray-400">{item.description || '-'}</span>
      },
      {
        key: 'status',
        header: 'Status',
        width: 'w-1/12',
        render: (item) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.is_active 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}>
            {item.is_active ? 'Active' : 'Inactive'}
          </span>
        )
      },
      {
        // key: 'actions',
        // header: 'Actions',
        width: 'w-2/12',
      }
    ],
    idField: 'status_id',
    nameField: 'status_name',
    activeField: 'is_active',
    itemName: 'Customer Status',
    itemNamePlural: 'Customer Statuses'
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Customer Status Master</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage customer status types for categorizing customer accounts
        </p>
      </div>
      
      {/* Filters - just the Add/Close button */}
      <CustomerStatusFilters
        isFormVisible={isFormVisible}
        onAddClick={handleToggleForm}
      />
      
      {/* Inline Form */}
      <InlineCustomerStatusForm
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingStatus}
        isLoading={loading}
        error={error}
      />
      
      {/* Table with integrated search and filters */}
      <DataTable
        data={filteredCustomerStatuses}
        loading={loading}
        error={error}
        onEditClick={handleOpenForm}
        onStatusToggleClick={handleStatusToggleClick}
        tableConfig={tableConfig}
        emptyStateMessage="No customer statuses found. Try adjusting your filters or add a new status."
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
          ? `Are you sure you want to ${statusItem.is_active ? 'deactivate' : 'activate'} "${statusItem.status_name}"?` 
          : 'Are you sure you want to change the status?'}
        confirmText={statusItem?.is_active ? "Deactivate" : "Activate"}
        isLoading={loading}
      />
    </div>
  );
};

export default CustomerStatusPage;