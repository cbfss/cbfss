// src/services/gold/goldRateService.js
// Mock service for gold rate data

// Mock carat type data
const mockCaratTypes = [
  {
    carat_id: 1,
    carat_name: '24K',
    carat_value: 24,
    purity_percentage: 99.9,
    tenant_id: 1,
    is_active: true
  },
  {
    carat_id: 2,
    carat_name: '22K',
    carat_value: 22,
    purity_percentage: 91.6,
    tenant_id: 1,
    is_active: true
  },
  {
    carat_id: 3,
    carat_name: '18K',
    carat_value: 18,
    purity_percentage: 75.0,
    tenant_id: 1,
    is_active: true
  },
  {
    carat_id: 4,
    carat_name: '14K',
    carat_value: 14,
    purity_percentage: 58.5,
    tenant_id: 1,
    is_active: true
  },
  {
    carat_id: 5,
    carat_name: '9K',
    carat_value: 9,
    purity_percentage: 37.5,
    tenant_id: 1,
    is_active: false
  }
];

// Mock gold rate data
const mockGoldRates = [
  {
    gold_rate_id: 1,
    tenant_id: 1,
    carat_id: 1,
    carat_name: '24K',
    rate_per_gram: 5950.50,
    rate_date: '2025-05-06',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d490',
    created_by: 1,
    created_at: '2025-05-06T10:00:00Z',
    updated_by: null,
    updated_at: '2025-05-06T10:00:00Z'
  },
  {
    gold_rate_id: 2,
    tenant_id: 1,
    carat_id: 2,
    carat_name: '22K',
    rate_per_gram: 5452.15,
    rate_date: '2025-05-06',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d491',
    created_by: 1,
    created_at: '2025-05-06T10:15:00Z',
    updated_by: null,
    updated_at: '2025-05-06T10:15:00Z'
  },
  {
    gold_rate_id: 3,
    tenant_id: 1,
    carat_id: 3,
    carat_name: '18K',
    rate_per_gram: 4462.88,
    rate_date: '2025-05-06',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d492',
    created_by: 1,
    created_at: '2025-05-06T10:30:00Z',
    updated_by: null,
    updated_at: '2025-05-06T10:30:00Z'
  },
  {
    gold_rate_id: 4,
    tenant_id: 1,
    carat_id: 1,
    carat_name: '24K',
    rate_per_gram: 5975.25,
    rate_date: '2025-05-05',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d493',
    created_by: 1,
    created_at: '2025-05-05T10:00:00Z',
    updated_by: null,
    updated_at: '2025-05-05T10:00:00Z'
  },
  {
    gold_rate_id: 5,
    tenant_id: 1,
    carat_id: 2,
    carat_name: '22K',
    rate_per_gram: 5477.35,
    rate_date: '2025-05-05',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d494',
    created_by: 1,
    created_at: '2025-05-05T10:00:00Z',
    updated_by: null,
    updated_at: '2025-05-05T10:00:00Z'
  },
  {
    gold_rate_id: 6,
    tenant_id: 1,
    carat_id: 3,
    carat_name: '18K',
    rate_per_gram: 4481.44,
    rate_date: '2025-05-05',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d495',
    created_by: 1,
    created_at: '2025-05-05T10:00:00Z',
    updated_by: null,
    updated_at: '2025-05-05T10:00:00Z'
  },
  {
    gold_rate_id: 7,
    tenant_id: 1,
    carat_id: 1,
    carat_name: '24K',
    rate_per_gram: 5925.75,
    rate_date: '2025-05-04',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d496',
    created_by: 1,
    created_at: '2025-05-04T10:00:00Z',
    updated_by: null,
    updated_at: '2025-05-04T10:00:00Z'
  },
  {
    gold_rate_id: 8,
    tenant_id: 1,
    carat_id: 2,
    carat_name: '22K',
    rate_per_gram: 5423.60,
    rate_date: '2025-05-04',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d497',
    created_by: 1,
    created_at: '2025-05-04T10:00:00Z',
    updated_by: null,
    updated_at: '2025-05-04T10:00:00Z'
  },
  {
    gold_rate_id: 9,
    tenant_id: 1,
    carat_id: 3,
    carat_name: '18K',
    rate_per_gram: 4444.31,
    rate_date: '2025-05-04',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d498',
    created_by: 1,
    created_at: '2025-05-04T10:00:00Z',
    updated_by: null,
    updated_at: '2025-05-04T10:00:00Z'
  },
  {
    gold_rate_id: 10,
    tenant_id: 1,
    carat_id: 4,
    carat_name: '14K',
    rate_per_gram: 3482.42,
    rate_date: '2025-05-06',
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d499',
    created_by: 1,
    created_at: '2025-05-06T10:45:00Z',
    updated_by: null,
    updated_at: '2025-05-06T10:45:00Z'
  }
];

/**
 * Service for managing gold rate data
 */
const goldRateService = {
  /**
   * Get all gold rates with optional filters
   * @param {Object} filters - Optional filters for the data
   * @returns {Promise<Array>} Array of gold rates
   */
  async getGoldRates(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Join with carat types to get carat_name
    let result = mockGoldRates.map(rate => {
      const caratType = mockCaratTypes.find(carat => carat.carat_id === rate.carat_id);
      return {
        ...rate,
        carat_name: caratType ? caratType.carat_name : 'Unknown'
      };
    });
    
    // Apply filters if provided
    if (filters.searchDate) {
      result = result.filter(rate => rate.rate_date === filters.searchDate);
    }
    
    if (filters.caratId) {
      result = result.filter(rate => rate.carat_id === parseInt(filters.caratId));
    }
    
    if (filters.tenantId) {
      result = result.filter(rate => rate.tenant_id === filters.tenantId);
    }
    
    // Sort by date (newest first) and then by carat_id
    result.sort((a, b) => {
      if (a.rate_date === b.rate_date) {
        return a.carat_id - b.carat_id;
      }
      return new Date(b.rate_date) - new Date(a.rate_date);
    });
    
    return result;
  },
  
  /**
   * Get carat types for dropdown
   * @returns {Promise<Array>} Array of carat types
   */
  async getCaratTypes() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return only active carat types
    return mockCaratTypes.filter(carat => carat.is_active);
  },
  
  /**
   * Get gold rate by ID
   * @param {number} id - Gold rate ID
   * @returns {Promise<Object>} Gold rate data
   */
  async getGoldRateById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const goldRate = mockGoldRates.find(rate => rate.gold_rate_id === id);
    
    if (!goldRate) {
      throw new Error('Gold rate not found');
    }
    
    // Join with carat type
    const caratType = mockCaratTypes.find(carat => carat.carat_id === goldRate.carat_id);
    return {
      ...goldRate,
      carat_name: caratType ? caratType.carat_name : 'Unknown'
    };
  },
  
  /**
   * Add new gold rate
   * @param {Object} goldRateData - Gold rate data
   * @returns {Promise<Object>} Created gold rate
   */
  async addGoldRate(goldRateData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for duplicate (same carat and date)
    const isDuplicate = mockGoldRates.some(rate => 
      rate.carat_id === goldRateData.carat_id && 
      rate.rate_date === goldRateData.rate_date &&
      rate.tenant_id === goldRateData.tenant_id
    );
    
    if (isDuplicate) {
      throw new Error('A gold rate already exists for this carat type and date. Please update the existing rate instead.');
    }
    
    // Create new gold rate with ID
    const newId = Math.max(...mockGoldRates.map(rate => rate.gold_rate_id)) + 1;
    
    // Generate a UUID
    const uuid = crypto.randomUUID ? crypto.randomUUID() : 'f47ac10b-58cc-4372-a567-0e02b2c3d4' + newId;
    
    // Current timestamp
    const now = new Date().toISOString();
    
    // Get carat name
    const caratType = mockCaratTypes.find(carat => carat.carat_id === goldRateData.carat_id);
    
    const newGoldRate = {
      gold_rate_id: newId,
      tenant_id: goldRateData.tenant_id || 1,
      carat_id: goldRateData.carat_id,
      carat_name: caratType ? caratType.carat_name : 'Unknown',
      rate_per_gram: goldRateData.rate_per_gram,
      rate_date: goldRateData.rate_date,
      identity: uuid,
      created_by: 1, // In real app would be from current user
      created_at: now,
      updated_by: null,
      updated_at: now
    };
    
    // In a real app, this would be a POST request
    // Here we just add to our mock data
    mockGoldRates.push(newGoldRate);
    
    return newGoldRate;
  },
  
  /**
   * Update gold rate
   * @param {number} id - Gold rate ID
   * @param {Object} goldRateData - Gold rate data
   * @returns {Promise<Object>} Updated gold rate
   */
  async updateGoldRate(id, goldRateData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockGoldRates.findIndex(rate => rate.gold_rate_id === id);
    
    if (index === -1) {
      throw new Error('Gold rate not found');
    }
    
    // Check for duplicates if carat or date changed
    if (goldRateData.carat_id !== mockGoldRates[index].carat_id || 
        goldRateData.rate_date !== mockGoldRates[index].rate_date) {
      
      const isDuplicate = mockGoldRates.some(rate => 
        rate.carat_id === goldRateData.carat_id && 
        rate.rate_date === goldRateData.rate_date &&
        rate.tenant_id === mockGoldRates[index].tenant_id &&
        rate.gold_rate_id !== id
      );
      
      if (isDuplicate) {
        throw new Error('A gold rate already exists for this carat type and date. Please update the existing rate instead.');
      }
    }
    
    // Current timestamp and user ID for update tracking
    const now = new Date().toISOString();
    const currentUserId = 2; // In real app would be from current user
    
    // Get carat name if carat changed
    let caratName = mockGoldRates[index].carat_name;
    if (goldRateData.carat_id !== mockGoldRates[index].carat_id) {
      const caratType = mockCaratTypes.find(carat => carat.carat_id === goldRateData.carat_id);
      caratName = caratType ? caratType.carat_name : 'Unknown';
    }
    
    // Update gold rate
    const updatedGoldRate = {
      ...mockGoldRates[index],
      carat_id: goldRateData.carat_id,
      carat_name: caratName,
      rate_per_gram: goldRateData.rate_per_gram,
      rate_date: goldRateData.rate_date,
      updated_by: currentUserId,
      updated_at: now
    };
    
    // In a real app, this would be a PUT request
    // Here we just update our mock data
    mockGoldRates[index] = updatedGoldRate;
    
    return updatedGoldRate;
  },
  
  /**
   * Get gold rates for a specific date (for report)
   * @param {string} date - Date string (YYYY-MM-DD)
   * @param {number} tenantId - Tenant ID
   * @returns {Promise<Array>} Array of gold rates for the date
   */
  async getGoldRateReportByDate(date, tenantId = 1) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filter by date and tenant
    const ratesByDate = mockGoldRates.filter(rate => 
      rate.rate_date === date && rate.tenant_id === tenantId
    );
    
    // Join with carat types and sort by carat value
    const result = ratesByDate.map(rate => {
      const caratType = mockCaratTypes.find(carat => carat.carat_id === rate.carat_id);
      return {
        ...rate,
        carat_name: caratType ? caratType.carat_name : 'Unknown',
        carat_value: caratType ? caratType.carat_value : 0,
        purity_percentage: caratType ? caratType.purity_percentage : 0
      };
    });
    
    // Sort by carat value (highest first)
    result.sort((a, b) => b.carat_value - a.carat_value);
    
    return result;
  },
  
  /**
   * Get gold rate trends (for charts/analytics)
   * @param {number} caratId - Carat ID
   * @param {number} days - Number of days for trend
   * @returns {Promise<Array>} Array of gold rates for trend analysis
   */
  async getGoldRateTrends(caratId, days = 30) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filter by carat
    let rateTrends = mockGoldRates.filter(rate => 
      rate.carat_id === caratId
    );
    
    // Sort by date (oldest first)
    rateTrends.sort((a, b) => new Date(a.rate_date) - new Date(b.rate_date));
    
    // For demo purposes, we'll just return the available data
    // In a real app, this would filter by date range
    
    return rateTrends;
  }
};

export default goldRateService;