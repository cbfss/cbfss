import React, { useState } from 'react';
import GoldRateFilters from './components/GoldRateFilters';
import InlineGoldRateForm from './components/InlineGoldRateForm';
import DataTable from '../../../components/common/DataTable';
import { useGoldRateRTK } from './hooks/useGoldRateRTK';
import { useGoldRateFilters } from './hooks/useGoldRateFilters';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import { formatDate } from '../../../utils/dateUtils';

const GoldRatePage = () => {
  // State for the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingGoldRate, setEditingGoldRate] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  
  // Get data and methods from custom hooks
  const {
    goldRates,
    caratTypes,
    loading,
    error,
    clearError,
    addGoldRate,
    updateGoldRate,
    getCaratTypes
  } = useGoldRateRTK();
  
  const {
    searchDate,
    filterCaratId,
    handleDateChange,
    handleCaratFilterChange,
    handleClearFilters,
    filteredGoldRates
  } = useGoldRateFilters(goldRates);
  
  // Form handlers
  const handleOpenForm = (goldRate = null) => {
    setEditingGoldRate(goldRate);
    setIsFormVisible(true);
    clearError();
    
    // Load carat types if not already loaded
    if (!caratTypes.length) {
      getCaratTypes();
    }
  };
  
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingGoldRate(null);
  };

  const handleToggleForm = () => {
    if (isFormVisible) {
      handleCloseForm();
    } else {
      handleOpenForm();
    }
  };
  
  const handleSubmit = (formData) => {
    // Show confirmation modal
    setConfirmAction(() => async () => {
      let success;
      
      if (editingGoldRate) {
        // Update existing gold rate
        success = await updateGoldRate(formData);
      } else {
        // Add new gold rate
        success = await addGoldRate(formData);
      }
      
      if (success) {
        handleCloseForm();
      }
      
      // Reset confirmation state
      setShowConfirmModal(false);
      setConfirmAction(null);
    });
    
    setShowConfirmModal(true);
  };
  
  // Table configuration
  const tableConfig = {
    columns: [
      {
        key: 'gold_rate_id',
        header: 'ID',
        width: 'w-1/12',
        render: (item) => <span>{item.gold_rate_id}</span>
      },
      {
        key: 'rate_date',
        header: 'Rate Date',
        width: 'w-2/12',
        render: (item) => <span>{formatDate(item.rate_date)}</span>
      },
      {
        key: 'carat_name',
        header: 'Carat Type',
        width: 'w-2/12',
        render: (item) => <span className="font-medium">{item.carat_name}</span>
      },
      {
        key: 'rate_per_gram',
        header: 'Rate Per Gram',
        width: 'w-2/12',
        render: (item) => (
          <span className="font-medium">
            ₹{parseFloat(item.rate_per_gram).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        )
      },
      {
        key: 'created_at',
        header: 'Created At',
        width: 'w-2/12',
        render: (item) => <span>{new Date(item.created_at).toLocaleString()}</span>
      }
    ],
    idField: 'gold_rate_id',
    nameField: 'carat_name',
    activeField: null, // No active status for gold rates
    itemName: 'Gold Rate',
    itemNamePlural: 'Gold Rates'
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Daily Gold Rate Master</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage daily gold rates for different carat types
        </p>
      </div>
      
      {/* Filters component with Add/Close button */}
      
      {/* Inline Form */}
      <InlineGoldRateForm
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingGoldRate}
        isLoading={loading}
        error={error}
        caratTypes={caratTypes}
      />
      <GoldRateFilters
        isFormVisible={isFormVisible}
        onAddClick={handleToggleForm}
        searchDate={searchDate}
        filterCaratId={filterCaratId}
        caratTypes={caratTypes}
        onDateChange={handleDateChange}
        onCaratFilterChange={handleCaratFilterChange}
        onClearFilters={handleClearFilters}
      />
      
      {/* Data Table */}
      <DataTable
        data={filteredGoldRates}
        loading={loading}
        error={error}
        onEditClick={handleOpenForm}
        onStatusToggleClick={null} // No status toggle for gold rates
        tableConfig={tableConfig}
        emptyStateMessage="No gold rates found. Try adjusting your filters or add a new gold rate."
        searchTerm="" // Not using standard search
        filterActive="all" // Not using standard active filter
        onSearchChange={null} // Not using standard search
        onFilterChange={null} // Not using standard filter
      />
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmAction}
        title="Confirm Action"
        message={editingGoldRate 
          ? `Are you sure you want to update the gold rate for ${editingGoldRate.carat_name} on ${formatDate(editingGoldRate.rate_date)}?`
          : "Are you sure you want to add this new gold rate?"}
        confirmText={editingGoldRate ? "Update" : "Add"}
        isLoading={loading}
      />
    </div>
  );
};

export default GoldRatePage;