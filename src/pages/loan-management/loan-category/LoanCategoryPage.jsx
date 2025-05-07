// src/pages/loan-management/loan-category/LoanCategoryPage.jsx
import React, { useState } from 'react';
import LoanCategoryFilters from './components/LoanCategoryFilters';
import InlineLoanCategoryForm from './components/InlineLoanCategoryForm';
import DataTable from '../../../components/common/DataTable';
import { useLoanCategoryRTK } from './hooks/useLoanCategoryRTK';
import { useLoanCategoryFilters } from './hooks/useLoanCategoryFilters';
import ConfirmationModal from '../../../components/common/ConfirmationModal';

const LoanCategoryPage = () => {
  // State for the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingLoanCategory, setEditingLoanCategory] = useState(null);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  const [statusItem, setStatusItem] = useState(null);
  
  // Get data and methods from custom hooks
  const {
    loanCategories,
    loading,
    error,
    clearError,
    addLoanCategory,
    updateLoanCategory,
    toggleStatus
  } = useLoanCategoryRTK();
  
  const {
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange,
    filteredLoanCategories
  } = useLoanCategoryFilters(loanCategories);
  
  // Form handlers
  const handleOpenForm = (loanCategory = null) => {
    setEditingLoanCategory(loanCategory);
    setIsFormVisible(true);
    clearError();
  };
  
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingLoanCategory(null);
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
    
    if (editingLoanCategory) {
      // Update existing loan category
      success = await updateLoanCategory(formData);
    } else {
      // Add new loan category
      success = await addLoanCategory(formData);
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
    toggleStatus(statusItem.loan_category_id);
    setShowStatusConfirmModal(false);
  };
  
  // Table configuration
  const tableConfig = {
    columns: [
      {
        key: 'loan_category_id',
        header: 'ID',
        width: 'w-1/12',
        render: (item) => <span>{item.loan_category_id}</span>
      },
      {
        key: 'loan_category_name',
        header: 'Loan Category',
        width: 'w-3/12',
        render: (item) => <span className="font-medium">{item.loan_category_name}</span>
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
        key: 'actions',
        header: '', // Removed "Actions" text from header
        width: 'w-2/12',
      }
    ],
    idField: 'loan_category_id',
    nameField: 'loan_category_name',
    activeField: 'is_active',
    itemName: 'Loan Category',
    itemNamePlural: 'Loan Categories'
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Loan Categories</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage loan categories for different types of loans
        </p>
      </div>
      
      {/* Modified Filters - just the Add/Close button */}
      <LoanCategoryFilters
        isFormVisible={isFormVisible}
        onAddClick={handleToggleForm}
      />
      
      {/* Inline Form */}
      <InlineLoanCategoryForm
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingLoanCategory}
        isLoading={loading}
        error={error}
      />
      
      {/* Table with integrated search and filters */}
      <DataTable
        data={filteredLoanCategories}
        loading={loading}
        error={error}
        onEditClick={handleOpenForm}
        onStatusToggleClick={handleStatusToggleClick}
        tableConfig={tableConfig}
        emptyStateMessage="No loan categories found. Try adjusting your filters or add a new loan category."
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
          ? `Are you sure you want to ${statusItem.is_active ? 'deactivate' : 'activate'} "${statusItem.loan_category_name}"?` 
          : 'Are you sure you want to change the status?'}
        confirmText={statusItem?.is_active ? "Deactivate" : "Activate"}
        isLoading={loading}
      />
    </div>
  );
};
  
export default LoanCategoryPage;
