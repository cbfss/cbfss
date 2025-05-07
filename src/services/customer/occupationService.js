// src/services/customer/occupationService.js

// Mock occupation data
const mockOccupations = [
    { occupation_id: 1, occupation_name: 'Software Engineer', is_active: true, tenant_id: 1 },
    { occupation_id: 2, occupation_name: 'Doctor', is_active: true, tenant_id: 1 },
    { occupation_id: 3, occupation_name: 'Teacher', is_active: false, tenant_id: 1 },
    { occupation_id: 4, occupation_name: 'Lawyer', is_active: true, tenant_id: 1 },
    { occupation_id: 5, occupation_name: 'Accountant', is_active: true, tenant_id: 1 },
    { occupation_id: 6, occupation_name: 'Business Owner', is_active: true, tenant_id: 1 },
    { occupation_id: 7, occupation_name: 'Sales Executive', is_active: false, tenant_id: 1 }
  ];
  
  const occupationService = {
    // Get all occupations with optional filters
    async getOccupations(filters = {}) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters if provided
      let filteredData = [...mockOccupations];
      
      if (filters.searchTerm) {
        filteredData = filteredData.filter(occ => 
          occ.occupation_name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }
      
      if (filters.isActive !== undefined) {
        filteredData = filteredData.filter(occ => occ.is_active === filters.isActive);
      }
      
      if (filters.tenantId) {
        filteredData = filteredData.filter(occ => occ.tenant_id === filters.tenantId);
      }
      
      return filteredData;
    },
    
    // Get occupation by ID
    async getOccupationById(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const occupation = mockOccupations.find(occ => occ.occupation_id === id);
      
      if (!occupation) {
        throw new Error('Occupation not found');
      }
      
      return occupation;
    },
    
    // Add new occupation
    async addOccupation(occupationData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicates
      const isDuplicate = mockOccupations.some(occ => 
        occ.occupation_name.toLowerCase() === occupationData.occupation_name.toLowerCase() &&
        occ.tenant_id === occupationData.tenant_id
      );
      
      if (isDuplicate) {
        throw new Error('An occupation with this name already exists');
      }
      
      // Create new occupation with ID
      const newId = Math.max(...mockOccupations.map(occ => occ.occupation_id)) + 1;
      
      const newOccupation = {
        occupation_id: newId,
        occupation_name: occupationData.occupation_name,
        is_active: true,
        tenant_id: occupationData.tenant_id || 1
      };
      
      // In a real app, this would be a POST request
      // Here we just add to our mock data
      mockOccupations.push(newOccupation);
      
      return newOccupation;
    },
    
    // Update occupation
    async updateOccupation(occupationData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockOccupations.findIndex(occ => occ.occupation_id === occupationData.occupation_id);
      
      if (index === -1) {
        throw new Error('Occupation not found');
      }
      
      // Check for duplicates (excluding current occupation)
      const isDuplicate = mockOccupations.some(occ => 
        occ.occupation_name.toLowerCase() === occupationData.occupation_name.toLowerCase() &&
        occ.tenant_id === occupationData.tenant_id &&
        occ.occupation_id !== occupationData.occupation_id
      );
      
      if (isDuplicate) {
        throw new Error('An occupation with this name already exists');
      }
      
      // Update occupation
      const updatedOccupation = {
        ...mockOccupations[index],
        occupation_name: occupationData.occupation_name
      };
      
      // In a real app, this would be a PUT request
      // Here we just update our mock data
      mockOccupations[index] = updatedOccupation;
      
      return updatedOccupation;
    },
    
    // Toggle occupation status
    async toggleStatus(occupationId) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockOccupations.findIndex(occ => occ.occupation_id === occupationId);
      
      if (index === -1) {
        throw new Error('Occupation not found');
      }
      
      // Toggle status
      mockOccupations[index].is_active = !mockOccupations[index].is_active;
      
      return { success: true };
    }
  };
  
  export default occupationService;