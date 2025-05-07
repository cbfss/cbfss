import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const StandardWeightModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  ornaments = [],
  isLoading = false,
  error = null
}) => {
  const [formData, setFormData] = useState({
    ornament_id: '',
    standard_weight: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  
  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ornament_id: initialData.ornament_id.toString(),
          standard_weight: initialData.standard_weight.toString()
        });
      } else {
        setFormData({
          ornament_id: '',
          standard_weight: ''
        });
      }
      setValidationErrors({});
    }
  }, [isOpen, initialData]);
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.ornament_id) {
      errors.ornament_id = 'Ornament is required';
    }
    
    if (!formData.standard_weight) {
      errors.standard_weight = 'Standard weight is required';
    } else if (isNaN(parseFloat(formData.standard_weight)) || parseFloat(formData.standard_weight) <= 0) {
      errors.standard_weight = 'Standard weight must be a positive number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare data for submission
      const submitData = {
        ...formData,
        standard_weight: parseFloat(formData.standard_weight)
      };
      
      if (initialData?.weight_id) {
        submitData.weight_id = initialData.weight_id;
      }
      
      onSubmit(submitData);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {initialData ? 'Edit Standard Weight' : 'Add New Standard Weight'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Ornament Type
            </label>
            {initialData ? (
              // In edit mode, show the ornament name but don't allow changing it
              <div className="px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {ornaments.find(o => o.ornament_id === parseInt(formData.ornament_id))?.ornament_name || 'Unknown Ornament'}
              </div>
            ) : (
              // In add mode, show dropdown to select ornament
              <div>
                <select
                  name="ornament_id"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    validationErrors.ornament_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  value={formData.ornament_id}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value="">Select an ornament</option>
                  {ornaments.map(ornament => (
                    <option key={ornament.ornament_id} value={ornament.ornament_id}>
                      {ornament.ornament_name}
                    </option>
                  ))}
                </select>
                {validationErrors.ornament_id && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.ornament_id}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Standard Weight (grams)
            </label>
            <input
              type="number"
              name="standard_weight"
              step="0.01"
              min="0.01"
              className={`w-full px-3 py-2 border rounded-lg ${
                validationErrors.standard_weight ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              value={formData.standard_weight}
              onChange={handleChange}
              placeholder="Enter standard weight in grams"
              disabled={isLoading}
            />
            {validationErrors.standard_weight && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.standard_weight}</p>
            )}
          </div>
          
          {/* API Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
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
    </div>
  );
};

export default StandardWeightModal;