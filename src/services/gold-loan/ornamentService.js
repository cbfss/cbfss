// src/services/gold-loan/ornamentService.js
// Mock ornament data
const mockOrnaments = [
  { ornament_id: 1, ornament_name: 'Ring', is_active: true, tenant_id: 1 },
  { ornament_id: 2, ornament_name: 'Necklace', is_active: true, tenant_id: 1 },
  { ornament_id: 3, ornament_name: 'Bracelet', is_active: true, tenant_id: 1 },
  { ornament_id: 4, ornament_name: 'Earrings', is_active: false, tenant_id: 1 },
  { ornament_id: 5, ornament_name: 'Bangle', is_active: true, tenant_id: 1 },
  { ornament_id: 6, ornament_name: 'Pendant', is_active: true, tenant_id: 1 },
  { ornament_id: 7, ornament_name: 'Anklet', is_active: false, tenant_id: 1 }
];

const ornamentService = {
  // Get all ornaments with optional filters
  async getOrnaments(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Apply filters if provided
    let filteredData = [...mockOrnaments];
    
    if (filters.searchTerm) {
      filteredData = filteredData.filter(ornament =>
        ornament.ornament_name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    if (filters.isActive !== undefined) {
      filteredData = filteredData.filter(ornament => ornament.is_active === filters.isActive);
    }
    
    if (filters.tenantId) {
      filteredData = filteredData.filter(ornament => ornament.tenant_id === filters.tenantId);
    }
    
    return filteredData;
  },
  
  // Get ornament by ID
  async getOrnamentById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const ornament = mockOrnaments.find(ornament => ornament.ornament_id === id);
    
    if (!ornament) {
      throw new Error('Ornament not found');
    }
    
    return ornament;
  },
  
  // Add new ornament
  async addOrnament(ornamentData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for duplicates
    const isDuplicate = mockOrnaments.some(ornament =>
      ornament.ornament_name.toLowerCase() === ornamentData.ornament_name.toLowerCase() &&
      ornament.tenant_id === ornamentData.tenant_id
    );
    
    if (isDuplicate) {
      throw new Error('An ornament with this name already exists');
    }
    
    // Create new ornament with ID
    const newId = Math.max(...mockOrnaments.map(ornament => ornament.ornament_id)) + 1;
    
    const newOrnament = {
      ornament_id: newId,
      ornament_name: ornamentData.ornament_name,
      is_active: true,
      tenant_id: ornamentData.tenant_id || 1
    };
    
    // In a real app, this would be a POST request
    // Here we just add to our mock data
    mockOrnaments.push(newOrnament);
    
    return newOrnament;
  },
  
  // Update ornament
  async updateOrnament(id, ornamentData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockOrnaments.findIndex(ornament => ornament.ornament_id === id);
    
    if (index === -1) {
      throw new Error('Ornament not found');
    }
    
    // Check for duplicates (excluding current ornament)
    const isDuplicate = mockOrnaments.some(ornament =>
      ornament.ornament_name.toLowerCase() === ornamentData.ornament_name.toLowerCase() &&
      ornament.tenant_id === ornamentData.tenant_id &&
      ornament.ornament_id !== id
    );
    
    if (isDuplicate) {
      throw new Error('An ornament with this name already exists');
    }
    
    // Update ornament
    const updatedOrnament = {
      ...mockOrnaments[index],
      ornament_name: ornamentData.ornament_name
    };
    
    // In a real app, this would be a PUT request
    // Here we just update our mock data
    mockOrnaments[index] = updatedOrnament;
    
    return updatedOrnament;
  },
  
  // Toggle ornament status
  async toggleStatus(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockOrnaments.findIndex(ornament => ornament.ornament_id === id);
    
    if (index === -1) {
      throw new Error('Ornament not found');
    }
    
    // Toggle status
    mockOrnaments[index].is_active = !mockOrnaments[index].is_active;
    
    return { success: true };
  }
};

export default ornamentService;