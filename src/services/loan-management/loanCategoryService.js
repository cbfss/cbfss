const mockLoanCategories = [
  { 
    loan_category_id: 1, 
    tenant_id: 1,
    loan_category_name: 'Gold Loan', 
    description: 'Loans against gold jewelry', 
    is_active: true, 
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    created_by: 1,
    created_at: '2025-04-28T10:00:00Z',
    updated_by: null,
    updated_at: '2025-04-28T10:00:00Z'
  },
  { 
    loan_category_id: 2, 
    tenant_id: 1,
    loan_category_name: 'Home Loan', 
    description: 'Loans for home purchase or renovation', 
    is_active: true, 
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    created_by: 1,
    created_at: '2025-04-28T10:15:00Z',
    updated_by: null,
    updated_at: '2025-04-28T10:15:00Z'
  },
  { 
    loan_category_id: 3, 
    tenant_id: 1,
    loan_category_name: 'Vehicle Loan', 
    description: 'Loans for purchasing vehicles', 
    is_active: true, 
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    created_by: 1,
    created_at: '2025-04-28T10:30:00Z',
    updated_by: null,
    updated_at: '2025-04-28T10:30:00Z'
  },
  { 
    loan_category_id: 4, 
    tenant_id: 1,
    loan_category_name: 'Personal Loan', 
    description: 'General purpose personal loans', 
    is_active: false, 
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
    created_by: 1,
    created_at: '2025-04-28T10:45:00Z',
    updated_by: 2,
    updated_at: '2025-04-29T14:20:00Z'
  },
  { 
    loan_category_id: 5, 
    tenant_id: 1,
    loan_category_name: 'Education Loan', 
    description: 'Loans for educational purposes', 
    is_active: true, 
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d483',
    created_by: 1,
    created_at: '2025-04-28T11:00:00Z',
    updated_by: null,
    updated_at: '2025-04-28T11:00:00Z'
  },
  { 
    loan_category_id: 6, 
    tenant_id: 1,
    loan_category_name: 'Business Loan', 
    description: 'Loans for business expansion', 
    is_active: true, 
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d484',
    created_by: 1,
    created_at: '2025-04-28T11:15:00Z',
    updated_by: null,
    updated_at: '2025-04-28T11:15:00Z'
  },
  { 
    loan_category_id: 7, 
    tenant_id: 1,
    loan_category_name: 'Micro Loan', 
    description: 'Small amount loans for specific needs', 
    is_active: false, 
    identity: 'f47ac10b-58cc-4372-a567-0e02b2c3d485',
    created_by: 1,
    created_at: '2025-04-28T11:30:00Z',
    updated_by: 2,
    updated_at: '2025-04-30T09:45:00Z'
  }
];

const loanCategoryService = {
  // Get all loan categories with optional filters
  async getLoanCategories(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Apply filters if provided
    let filteredData = [...mockLoanCategories];
    
    if (filters.searchTerm) {
      filteredData = filteredData.filter(category =>
        category.loan_category_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      );
    }
    
    if (filters.isActive !== undefined) {
      filteredData = filteredData.filter(category => category.is_active === filters.isActive);
    }
    
    if (filters.tenantId) {
      filteredData = filteredData.filter(category => category.tenant_id === filters.tenantId);
    }
    
    return filteredData;
  },
  
  // Get loan category by ID
  async getLoanCategoryById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const category = mockLoanCategories.find(category => category.loan_category_id === id);
    
    if (!category) {
      throw new Error('Loan category not found');
    }
    
    return category;
  },
  
  // Add new loan category
  async addLoanCategory(loanCategoryData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for duplicates (case-insensitive)
    const isDuplicate = mockLoanCategories.some(category =>
      category.loan_category_name.toLowerCase() === loanCategoryData.loan_category_name.toLowerCase() &&
      category.tenant_id === loanCategoryData.tenant_id
    );
    
    if (isDuplicate) {
      throw new Error('A loan category with this name already exists');
    }
    
    // Create new loan category with ID
    const newId = Math.max(...mockLoanCategories.map(category => category.loan_category_id)) + 1;
    
    // Generate a UUID
    const uuid = crypto.randomUUID ? crypto.randomUUID() : 'f47ac10b-58cc-4372-a567-0e02b2c3d4' + newId;
    
    // Current timestamp
    const now = new Date().toISOString();
    
    const newLoanCategory = {
      loan_category_id: newId,
      tenant_id: loanCategoryData.tenant_id || 1,
      loan_category_name: loanCategoryData.loan_category_name,
      description: loanCategoryData.description || null,
      is_active: true,
      identity: uuid,
      created_by: 1, // In real app would be from current user
      created_at: now,
      updated_by: null,
      updated_at: now
    };
    
    // In a real app, this would be a POST request
    // Here we just add to our mock data
    mockLoanCategories.push(newLoanCategory);
    
    return newLoanCategory;
  },
  
  // Update loan category
  async updateLoanCategory(id, loanCategoryData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockLoanCategories.findIndex(category => category.loan_category_id === id);
    
    if (index === -1) {
      throw new Error('Loan category not found');
    }
    
    // Check for duplicates (excluding current category) - case insensitive
    const isDuplicate = mockLoanCategories.some(category =>
      category.loan_category_name.toLowerCase() === loanCategoryData.loan_category_name.toLowerCase() &&
      category.tenant_id === mockLoanCategories[index].tenant_id &&
      category.loan_category_id !== id
    );
    
    if (isDuplicate) {
      throw new Error('A loan category with this name already exists');
    }
    
    // Current timestamp and user ID for update tracking
    const now = new Date().toISOString();
    const currentUserId = 2; // In real app would be from current user
    
    // Update loan category
    const updatedLoanCategory = {
      ...mockLoanCategories[index],
      loan_category_name: loanCategoryData.loan_category_name,
      description: loanCategoryData.description !== undefined 
        ? loanCategoryData.description 
        : mockLoanCategories[index].description,
      updated_by: currentUserId,
      updated_at: now
    };
    
    // In a real app, this would be a PUT request
    // Here we just update our mock data
    mockLoanCategories[index] = updatedLoanCategory;
    
    return updatedLoanCategory;
  },
  
  // Toggle loan category status
  async toggleStatus(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockLoanCategories.findIndex(category => category.loan_category_id === id);
    
    if (index === -1) {
      throw new Error('Loan category not found');
    }
    
    // Toggle status
    mockLoanCategories[index].is_active = !mockLoanCategories[index].is_active;
    
    return { success: true };
  }
};

export default loanCategoryService;