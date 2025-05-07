// Mock tax category data
const mockTaxCategories = [
    { id: 1, name: 'Individual', description: 'Personal Income Tax', is_active: true, tenant_id: 1 },
    { id: 2, name: 'Corporate', description: 'Business Income Tax', is_active: true, tenant_id: 1 },
    { id: 3, name: 'Partnership', description: 'Partnership Income Tax', is_active: false, tenant_id: 1 },
    { id: 4, name: 'Non-Profit', description: 'Tax Exemption for Non-Profit', is_active: true, tenant_id: 1 }
  ];
  
  const taxCategoryService = {
    // Get all tax categories
    async getTaxCategories(filters = {}) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let results = [...mockTaxCategories];
      
      if (filters.searchTerm) {
        results = results.filter(cat => 
          cat.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          cat.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }
      
      if (filters.isActive !== undefined) {
        results = results.filter(cat => cat.is_active === filters.isActive);
      }
      
      return results;
    },
    
    // Add new tax category
    async addTaxCategory(taxCategoryData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicates
      const isDuplicate = mockTaxCategories.some(cat => 
        cat.name.toLowerCase() === taxCategoryData.name.toLowerCase()
      );
      
      if (isDuplicate) {
        throw new Error('A tax category with this name already exists');
      }
      
      const newTaxCategory = {
        id: Math.max(...mockTaxCategories.map(cat => cat.id)) + 1,
        ...taxCategoryData,
        is_active: true,
        tenant_id: taxCategoryData.tenant_id || 1
      };
      
      mockTaxCategories.push(newTaxCategory);
      return newTaxCategory;
    },
    
    // Update tax category
    async updateTaxCategory(id, taxCategoryData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockTaxCategories.findIndex(cat => cat.id === id);
      
      if (index === -1) {
        throw new Error('Tax category not found');
      }
      
      // Check for duplicates
      const isDuplicate = mockTaxCategories.some(cat => 
        cat.name.toLowerCase() === taxCategoryData.name.toLowerCase() &&
        cat.id !== id
      );
      
      if (isDuplicate) {
        throw new Error('A tax category with this name already exists');
      }
      
      mockTaxCategories[index] = {
        ...mockTaxCategories[index],
        ...taxCategoryData
      };
      
      return mockTaxCategories[index];
    },
    
    // Toggle tax category status
    async toggleStatus(id) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockTaxCategories.findIndex(cat => cat.id === id);
      
      if (index === -1) {
        throw new Error('Tax category not found');
      }
      
      mockTaxCategories[index].is_active = !mockTaxCategories[index].is_active;
      return { success: true };
    }
  };
  
  export default taxCategoryService;