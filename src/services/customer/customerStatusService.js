// src/services/customer-management/customerStatusService.js
// Mock customer status data to match the database structure
const mockCustomerStatuses = [
  { 
    status_id: 1, 
    tenant_id: 1,
    status_name: 'Active', 
    description: 'Customer account is currently active and can perform all operations', 
    is_active: true, 
    created_by: 1,
    created_at: '2025-04-28T10:00:00Z',
    updated_by: null,
    updated_at: '2025-04-28T10:00:00Z'
  },
  { 
    status_id: 2, 
    tenant_id: 1,
    status_name: 'Inactive', 
    description: 'Customer account is temporarily inactive', 
    is_active: true, 
    created_by: 1,
    created_at: '2025-04-28T10:15:00Z',
    updated_by: null,
    updated_at: '2025-04-28T10:15:00Z'
  },
  { 
    status_id: 3, 
    tenant_id: 1,
    status_name: 'Blocked', 
    description: 'Customer account has been blocked due to suspicious activity', 
    is_active: true, 
    created_by: 1,
    created_at: '2025-04-28T10:30:00Z',
    updated_by: null,
    updated_at: '2025-04-28T10:30:00Z'
  },
  { 
    status_id: 4, 
    tenant_id: 1,
    status_name: 'Pending Verification', 
    description: 'Customer account waiting for KYC verification', 
    is_active: true, 
    created_by: 1,
    created_at: '2025-04-28T10:45:00Z',
    updated_by: null,
    updated_at: '2025-04-28T10:45:00Z'
  },
  { 
    status_id: 5, 
    tenant_id: 1,
    status_name: 'Archived', 
    description: 'Customer account has been archived', 
    is_active: false, 
    created_by: 1,
    created_at: '2025-04-28T11:00:00Z',
    updated_by: 2,
    updated_at: '2025-04-29T14:20:00Z'
  },
  { 
    status_id: 6, 
    tenant_id: 2, // Different tenant
    status_name: 'Active', 
    description: 'Customer account is active', 
    is_active: true, 
    created_by: 3,
    created_at: '2025-04-28T11:15:00Z',
    updated_by: null,
    updated_at: '2025-04-28T11:15:00Z'
  }
];

const customerStatusService = {
  // Get all customer statuses with optional filters
  async getCustomerStatuses(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Apply filters if provided
    let filteredData = [...mockCustomerStatuses];
    
    if (filters.searchTerm) {
      filteredData = filteredData.filter(status =>
        status.status_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (status.description && status.description.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      );
    }
    
    if (filters.isActive !== undefined) {
      filteredData = filteredData.filter(status => status.is_active === filters.isActive);
    }
    
    if (filters.tenantId) {
      filteredData = filteredData.filter(status => status.tenant_id === filters.tenantId);
    }
    
    return filteredData;
  },
  
  // Get customer status by ID
  async getCustomerStatusById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const status = mockCustomerStatuses.find(status => status.status_id === id);
    
    if (!status) {
      throw new Error('Customer status not found');
    }
    
    return status;
  },
  
  // Add new customer status
  async addCustomerStatus(statusData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for duplicates (case-insensitive)
    const isDuplicate = mockCustomerStatuses.some(status =>
      status.status_name.toLowerCase() === statusData.status_name.toLowerCase() &&
      status.tenant_id === statusData.tenant_id
    );
    
    if (isDuplicate) {
      throw new Error('A customer status with this name already exists');
    }
    
    // Create new customer status with ID
    const newId = Math.max(...mockCustomerStatuses.map(status => status.status_id)) + 1;
    
    // Current timestamp
    const now = new Date().toISOString();
    
    const newCustomerStatus = {
      status_id: newId,
      tenant_id: statusData.tenant_id || 1,
      status_name: statusData.status_name,
      description: statusData.description || null,
      is_active: true,
      created_by: 1, // In real app would be from current user
      created_at: now,
      updated_by: null,
      updated_at: now
    };
    
    // In a real app, this would be a POST request
    // Here we just add to our mock data
    mockCustomerStatuses.push(newCustomerStatus);
    
    return newCustomerStatus;
  },
  
  // Update customer status
  async updateCustomerStatus(id, statusData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockCustomerStatuses.findIndex(status => status.status_id === id);
    
    if (index === -1) {
      throw new Error('Customer status not found');
    }
    
    // Check for duplicates (excluding current status) - case insensitive
    const isDuplicate = mockCustomerStatuses.some(status =>
      status.status_name.toLowerCase() === statusData.status_name.toLowerCase() &&
      status.tenant_id === mockCustomerStatuses[index].tenant_id &&
      status.status_id !== id
    );
    
    if (isDuplicate) {
      throw new Error('A customer status with this name already exists');
    }
    
    // Current timestamp and user ID for update tracking
    const now = new Date().toISOString();
    const currentUserId = 2; // In real app would be from current user
    
    // Update customer status
    const updatedCustomerStatus = {
      ...mockCustomerStatuses[index],
      status_name: statusData.status_name,
      description: statusData.description !== undefined 
        ? statusData.description 
        : mockCustomerStatuses[index].description,
      updated_by: currentUserId,
      updated_at: now
    };
    
    // In a real app, this would be a PUT request
    // Here we just update our mock data
    mockCustomerStatuses[index] = updatedCustomerStatus;
    
    return updatedCustomerStatus;
  },
  
  // Toggle customer status active state
  async toggleStatus(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockCustomerStatuses.findIndex(status => status.status_id === id);
    
    if (index === -1) {
      throw new Error('Customer status not found');
    }
    
    // Toggle status
    mockCustomerStatuses[index].is_active = !mockCustomerStatuses[index].is_active;
    
    return { success: true };
  }
};

export default customerStatusService;