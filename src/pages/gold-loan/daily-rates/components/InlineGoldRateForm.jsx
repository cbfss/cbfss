import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const InlineGoldRateForm = ({
  isVisible,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  error = null,
  caratTypes = []
}) => {
  const [formData, setFormData] = useState({
    carat_id: '',
    rate_per_gram: '',
    rate_date: new Date().toISOString().split('T')[0] // Today's date as default
  });
  const [validationErrors, setValidationErrors] = useState({});
  
  // Reset form when visibility changes or initialData changes
  useEffect(() => {
    if (isVisible) {
      if (initialData) {
        setFormData({
          gold_rate_id: initialData.gold_rate_id,
          carat_id: initialData.carat_id.toString(),
          rate_per_gram: initialData.rate_per_gram.toString(),
          rate_date: initialData.rate_date,
          tenant_id: initialData.tenant_id
        });
      } else {
        setFormData({
          carat_id: caratTypes.length ? caratTypes[0].carat_id.toString() : '',
          rate_per_gram: '',
          rate_date: new Date().toISOString().split('T')[0],
          tenant_id: 1 // Default tenant ID
        });
      }
      setValidationErrors({});
    }
  }, [isVisible, initialData, caratTypes]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    const errors = {};
    
    if (!formData.carat_id) {
      errors.carat_id = 'Carat type is required';
    }
    
    if (!formData.rate_per_gram) {
      errors.rate_per_gram = 'Rate per gram is required';
    } else if (isNaN(parseFloat(formData.rate_per_gram)) || parseFloat(formData.rate_per_gram) <= 0) {
      errors.rate_per_gram = 'Rate per gram must be a positive number';
    }
    
    if (!formData.rate_date) {
      errors.rate_date = 'Rate date is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    // Submit form data with numeric conversions
    const submitData = {
      ...formData,
      carat_id: parseInt(formData.carat_id),
      rate_per_gram: parseFloat(formData.rate_per_gram),
      tenant_id: formData.tenant_id || 1 // Default tenant ID if not provided
    };
    
    onSubmit(submitData);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md p-6 mb-6 border border-primary-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-primary-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="bg-primary-600 h-6 w-1 rounded-full mr-3"></div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {initialData ? 'Edit Gold Rate' : 'Add New Gold Rate'}
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carat Type Dropdown */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Carat Type <span className="text-red-500">*</span>
          </label>
          <select
            name="carat_id"
            className={`w-full px-4 py-3 border rounded-lg ${
              validationErrors.carat_id ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-primary-200 dark:border-gray-600 bg-white dark:bg-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm transition-all`}
            value={formData.carat_id}
            onChange={handleChange}
            disabled={isLoading}
            required
          >
            <option value="">Select Carat Type</option>
            {caratTypes.map(carat => (
              <option key={carat.carat_id} value={carat.carat_id.toString()}>
                {carat.carat_name}
              </option>
            ))}
          </select>
          {validationErrors.carat_id && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <AlertCircle size={14} className="mr-1" />
              {validationErrors.carat_id}
            </div>
          )}
        </div>
        
        {/* Rate Per Gram */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Rate Per Gram (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="rate_per_gram"
            className={`w-full px-4 py-3 border rounded-lg ${
              validationErrors.rate_per_gram ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-primary-200 dark:border-gray-600 bg-white dark:bg-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm transition-all`}
            value={formData.rate_per_gram}
            onChange={handleChange}
            disabled={isLoading}
            min="0.01"
            step="0.01"
            placeholder="Enter rate per gram"
            required
          />
          {validationErrors.rate_per_gram && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <AlertCircle size={14} className="mr-1" />
              {validationErrors.rate_per_gram}
            </div>
          )}
        </div>
        
        {/* Rate Date */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Rate Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="rate_date"
            className={`w-full px-4 py-3 border rounded-lg ${
              validationErrors.rate_date ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-primary-200 dark:border-gray-600 bg-white dark:bg-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm transition-all`}
            value={formData.rate_date}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          {validationErrors.rate_date && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <AlertCircle size={14} className="mr-1" />
              {validationErrors.rate_date}
            </div>
          )}
        </div>
        
        {/* API Error */}
        {error && (
          <div className="md:col-span-3 p-3 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg flex items-start">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Footer */}
        <div className="md:col-span-3 flex justify-end gap-3 pt-4 mt-2 border-t border-primary-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400 transition-colors shadow-sm flex items-center"
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
  );
};

export default InlineGoldRateForm;