// src/pages/gold-loan/ornament/components/OrnamentModal.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const OrnamentModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  error = null
}) => {
  const [ornamentName, setOrnamentName] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      setOrnamentName(initialData?.ornament_name || '');
      setValidationError('');
    }
  }, [isOpen, initialData]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!ornamentName.trim()) {
      setValidationError('Ornament name is required');
      return;
    }
    
    // Submit the form
    const formData = {
      ornament_name: ornamentName.trim()
    };
    
    if (initialData?.ornament_id) {
      formData.ornament_id = initialData.ornament_id;
    }
    
    onSubmit(formData);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Ornament Type' : 'Add New Ornament Type'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Ornament Name
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg ${
                validationError ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={ornamentName}
              onChange={(e) => {
                setOrnamentName(e.target.value);
                setValidationError('');
              }}
              placeholder="Enter ornament name"
              disabled={isLoading}
            />
            {validationError && (
              <p className="text-red-500 text-xs mt-1">{validationError}</p>
            )}
          </div>
          
          {/* API Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
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
    </div>
  );
};

export default OrnamentModal;