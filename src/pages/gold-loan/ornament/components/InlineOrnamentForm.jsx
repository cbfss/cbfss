// src/pages/gold-loan/ornament/components/InlineOrnamentForm.jsx
import React, { useState, useEffect } from 'react';
import ConfirmationModal from '../../../../components/common/ConfirmationModal';

const InlineOrnamentForm = ({
  isVisible,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  error = null
}) => {
  const [ornamentName, setOrnamentName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState(null);
  
  // Reset form when visibility changes or initialData changes
  useEffect(() => {
    if (isVisible) {
      setOrnamentName(initialData?.ornament_name || '');
      setValidationError('');
    }
  }, [isVisible, initialData]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!ornamentName.trim()) {
      setValidationError('Ornament name is required');
      return;
    }
    
    // Prepare form data but don't submit yet
    const data = {
      ornament_name: ornamentName.trim()
    };
    
    if (initialData?.ornament_id) {
      data.ornament_id = initialData.ornament_id;
    }
    
    // Store form data and show confirmation modal
    setFormData(data);
    setShowConfirmModal(true);
  };
  
  // Handle confirmation
  const handleConfirm = () => {
    onSubmit(formData);
    setShowConfirmModal(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6 relative border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {initialData ? 'Edit Ornament' : 'Add New Ornament'}
          </h2>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Ornament Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg ${
                validationError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm`}
              value={ornamentName}
              onChange={(e) => {
                setOrnamentName(e.target.value);
                setValidationError('');
              }}
              placeholder="Enter ornament name (e.g., Ring, Necklace)"
              disabled={isLoading}
            />
            {validationError && (
              <p className="text-red-500 text-xs mt-1">{validationError}</p>
            )}
          </div>
          
          {/* API Error */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        title="Confirm Action"
        message={initialData 
          ? `Are you sure you want to update the ornament "${ornamentName}"?` 
          : `Are you sure you want to add a new ornament "${ornamentName}"?`}
        confirmText={initialData ? "Update" : "Add"}
        isLoading={isLoading}
      />
    </>
  );
};

export default InlineOrnamentForm;