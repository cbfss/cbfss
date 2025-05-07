// src/pages/customer-data/relationship/components/InlineRelationshipForm.jsx
import React, { useState, useEffect } from 'react';
import ConfirmationModal from '../../../../components/common/ConfirmationModal';
import { X, AlertCircle, Users } from 'lucide-react';

const InlineRelationshipForm = ({
  isVisible,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  error = null
}) => {
  const [relationshipName, setRelationshipName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState(null);
  
  // Reset form when visibility changes or initialData changes
  useEffect(() => {
    if (isVisible) {
      setRelationshipName(initialData?.relationship || '');
      setValidationError('');
    }
  }, [isVisible, initialData]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!relationshipName.trim()) {
      setValidationError('Relationship name is required');
      return;
    }
    
    // Prepare form data but don't submit yet
    const data = {
      relationship: relationshipName.trim()
    };
    
    if (initialData?.relationship_id) {
      data.relationship_id = initialData.relationship_id;
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
      <div className="bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md p-8 mb-8 border border-primary-100 dark:border-gray-700 relative overflow-hidden min-h-[400px]">
        {/* Watermark Icon */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-6 pointer-events-none opacity-10">
          <Users size={200} className="text-primary-600 dark:text-primary-400" />
        </div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-primary-200 dark:border-gray-700 relative z-10">
          <div className="flex items-center">
            <div className="bg-primary-600 h-6 w-1 rounded-full mr-3"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {initialData ? 'Edit Relationship' : 'Add New Relationship'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 relative z-10 py-4">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-3">
              Relationship Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full md:w-1/2 px-4 py-4 border rounded-lg ${
                validationError ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-primary-200 dark:border-gray-600 bg-white dark:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm transition-all`}
              value={relationshipName}
              onChange={(e) => {
                setRelationshipName(e.target.value);
                setValidationError('');
              }}
              placeholder="Enter relationship name (e.g., Father, Mother, Spouse)"
              disabled={isLoading}
              maxLength={100}
              required
            />
            {validationError && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <AlertCircle size={14} className="mr-1" />
                {validationError}
              </div>
            )}
          </div>
          
          {/* API Error */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg flex items-start">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-primary-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400 transition-colors shadow-sm flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save'
              )}
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
          ? `Are you sure you want to update the relationship "${relationshipName}"?` 
          : `Are you sure you want to add a new relationship "${relationshipName}"?`}
        confirmText={initialData ? "Update" : "Add"}
        isLoading={isLoading}
      />
    </>
  );
};

export default InlineRelationshipForm;