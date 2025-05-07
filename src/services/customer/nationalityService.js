// Mock nationality data
const mockNationalities = [
    { id: 1, name: 'Indian', is_active: true, tenant_id: 1 },
    { id: 2, name: 'American', is_active: true, tenant_id: 1 },
    { id: 3, name: 'British', is_active: true, tenant_id: 1 },
    { id: 4, name: 'Canadian', is_active: false, tenant_id: 1 },
    { id: 5, name: 'Australian', is_active: true, tenant_id: 1 },
    { id: 6, name: 'Japanese', is_active: true, tenant_id: 1 },
    { id: 7, name: 'German', is_active: true, tenant_id: 1 },
    { id: 8, name: 'French', is_active: false, tenant_id: 1 },
    { id: 9, name: 'Italian', is_active: true, tenant_id: 1 },
    { id: 10, name: 'Spanish', is_active: true, tenant_id: 1 }
  ];
  
  const nationalityService = {
    // Get all nationalities with optional filters
    async getNationalities(filters = {}) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters if provided
      let filteredData = [...mockNationalities];
      
      if (filters.searchTerm) {
        filteredData = filteredData.filter(nat => 
          nat.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }
      
      if (filters.isActive !== undefined) {
        filteredData = filteredData.filter(nat => nat.is_active === filters.isActive);
      }
      
      if (filters.tenantId) {
        filteredData = filteredData.filter(nat => nat.tenant_id === filters.tenantId);
      }
      
      return filteredData;
    },
    
    // Get nationality by ID
    async getNationalityById(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const nationality = mockNationalities.find(nat => nat.id === id);
      
      if (!nationality) {
        throw new Error('Nationality not found');
      }
      
      return nationality;
    },
    
    // Add new nationality
    async addNationality(nationalityData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicates
      const isDuplicate = mockNationalities.some(nat => 
        nat.name.toLowerCase() === nationalityData.name.toLowerCase() &&
        nat.tenant_id === nationalityData.tenant_id
      );
      
      if (isDuplicate) {
        throw new Error('A nationality with this name already exists');
      }
      
      // Create new nationality with ID
      const newId = Math.max(...mockNationalities.map(nat => nat.id)) + 1;
      
      const newNationality = {
        id: newId,
        name: nationalityData.name,
        is_active: true,
        tenant_id: nationalityData.tenant_id || 1
      };
      
      // In a real app, this would be a POST request
      // Here we just add to our mock data
      mockNationalities.push(newNationality);
      
      return newNationality;
    },
    
    // Update nationality
    async updateNationality(id, nationalityData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockNationalities.findIndex(nat => nat.id === id);
      
      if (index === -1) {
        throw new Error('Nationality not found');
      }
      
      // Check for duplicates (excluding current nationality)
      const isDuplicate = mockNationalities.some(nat => 
        nat.name.toLowerCase() === nationalityData.name.toLowerCase() &&
        nat.tenant_id === nationalityData.tenant_id &&
        nat.id !== id
      );
      
      if (isDuplicate) {
        throw new Error('A nationality with this name already exists');
      }
      
      // Update nationality
      const updatedNationality = {
        ...mockNationalities[index],
        name: nationalityData.name
      };
      
      // In a real app, this would be a PUT request
      // Here we just update our mock data
      mockNationalities[index] = updatedNationality;
      
      return updatedNationality;
    },
    
    // Toggle nationality status
    async toggleStatus(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockNationalities.findIndex(nat => nat.id === id);
      
      if (index === -1) {
        throw new Error('Nationality not found');
      }
      
      // Toggle status
      mockNationalities[index].is_active = !mockNationalities[index].is_active;
      
      return { success: true };
    }
  };
  
  export default nationalityService;