// src/utils/dateUtils.js

/**
 * Format a date string to localized format
 * @param {string} dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date)) return dateString;
    
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  /**
   * Get the current date in ISO format (YYYY-MM-DD)
   * @returns {string} Current date in ISO format
   */
  export const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  /**
   * Format a date for display in a report header
   * @param {string} dateString - Date string in ISO format (YYYY-MM-DD)
   * @returns {string} Formatted date string for report
   */
  export const formatReportDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date)) return dateString;
    
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  /**
   * Get a date for N days ago in ISO format
   * @param {number} days - Number of days to go back
   * @returns {string} Past date in ISO format
   */
  export const getDateDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };
  
  /**
   * Get an array of dates between two dates
   * @param {string} startDate - Start date in ISO format
   * @param {string} endDate - End date in ISO format
   * @returns {Array} Array of dates in ISO format
   */
  export const getDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    
    // Clone the start date
    const current = new Date(start);
    
    // Loop until we reach the end date
    while (current <= end) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };