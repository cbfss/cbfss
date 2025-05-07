// src/utils/formatters.js
// Utilities for formatting dates, currency, etc.

// Format date to a readable format
// If includeTime is true, also include time
export const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return date.toLocaleDateString('en-US', options);
  };
  
  // Format number as currency (₹)
  export const formatCurrency = (value) => {
    if (value === undefined || value === null) return 'N/A';
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };