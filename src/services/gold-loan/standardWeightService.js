// Mock data for standard weights
const mockStandardWeights = [
    { weight_id: 1, ornament_id: 1, standard_weight: 7.5, tenant_id: 1 },
    { weight_id: 2, ornament_id: 2, standard_weight: 4.2, tenant_id: 1 },
    { weight_id: 3, ornament_id: 3, standard_weight: 12.8, tenant_id: 1 },
    { weight_id: 4, ornament_id: 4, standard_weight: 3.5, tenant_id: 1 },
    { weight_id: 5, ornament_id: 5, standard_weight: 6.2, tenant_id: 1 }
  ];
  
  // Mock data for ornaments (would normally come from ornamentService)
  const mockOrnaments = [
    { ornament_id: 1, ornament_name: 'Gold Chain', description: '22K chain', is_active: true, tenant_id: 1 },
    { ornament_id: 2, ornament_name: 'Gold Ring', description: '22K ring', is_active: true, tenant_id: 1 },
    { ornament_id: 3, ornament_name: 'Gold Bangle', description: '22K bangle', is_active: true, tenant_id: 1 },
    { ornament_id: 4, ornament_name: 'Gold Earrings', description: '22K earrings', is_active: true, tenant_id: 1 },
    { ornament_id: 5, ornament_name: 'Gold Necklace', description: '22K necklace', is_active: true, tenant_id: 1 },
    { ornament_id: 6, ornament_name: 'Gold Bracelet', description: '22K bracelet', is_active: true, tenant_id: 1 }
  ];
  
  const standardWeightService = {
    // Get all standard weights with optional filters
    async getStandardWeights(filters = {}) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters if provided
      let filteredData = [...mockStandardWeights];
      
      if (filters.ornamentId) {
        filteredData = filteredData.filter(weight => 
          weight.ornament_id === parseInt(filters.ornamentId)
        );
      }
      
      if (filters.tenantId) {
        filteredData = filteredData.filter(weight => weight.tenant_id === filters.tenantId);
      }
      
      // Enrich with ornament details for display
      return filteredData.map(weight => {
        const ornament = mockOrnaments.find(o => o.ornament_id === weight.ornament_id) || {};
        return {
          ...weight,
          ornament_name: ornament.ornament_name || 'Unknown Ornament',
          ornament_description: ornament.description || ''
        };
      });
    },
    
    // Get standard weight by ID
    async getStandardWeightById(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const standardWeight = mockStandardWeights.find(weight => weight.weight_id === parseInt(id));
      
      if (!standardWeight) {
        throw new Error('Standard weight not found');
      }
      
      // Enrich with ornament details
      const ornament = mockOrnaments.find(o => o.ornament_id === standardWeight.ornament_id) || {};
      
      return {
        ...standardWeight,
        ornament_name: ornament.ornament_name || 'Unknown Ornament',
        ornament_description: ornament.description || ''
      };
    },
    
    // Get standard weight by ornament ID
    async getStandardWeightByOrnamentId(ornamentId) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const standardWeight = mockStandardWeights.find(
        weight => weight.ornament_id === parseInt(ornamentId)
      );
      
      if (!standardWeight) {
        throw new Error('Standard weight not found for this ornament');
      }
      
      return standardWeight;
    },
    
    // Add new standard weight
    async addStandardWeight(standardWeightData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate required fields
      if (!standardWeightData.ornament_id || !standardWeightData.standard_weight) {
        throw new Error('Ornament ID and Standard Weight are required');
      }
      
      // Check if ornament exists
      const ornamentExists = mockOrnaments.some(
        o => o.ornament_id === parseInt(standardWeightData.ornament_id)
      );
      
      if (!ornamentExists) {
        throw new Error('Invalid ornament ID');
      }
      
      // Check if standard weight already exists for this ornament
      const existingWeight = mockStandardWeights.find(
        weight => weight.ornament_id === parseInt(standardWeightData.ornament_id)
      );
      
      if (existingWeight) {
        throw new Error('A standard weight already exists for this ornament');
      }
      
      // Create new standard weight with ID
      const newId = Math.max(...mockStandardWeights.map(weight => weight.weight_id)) + 1;
      
      const newStandardWeight = {
        weight_id: newId,
        ornament_id: parseInt(standardWeightData.ornament_id),
        standard_weight: parseFloat(standardWeightData.standard_weight),
        tenant_id: standardWeightData.tenant_id || 1
      };
      
      // In a real app, this would be a POST request
      // Here we just add to our mock data
      mockStandardWeights.push(newStandardWeight);
      
      return newStandardWeight;
    },
    
    // Update standard weight
    async updateStandardWeight(id, standardWeightData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockStandardWeights.findIndex(weight => weight.weight_id === parseInt(id));
      
      if (index === -1) {
        throw new Error('Standard weight not found');
      }
      
      // Validate required field
      if (!standardWeightData.standard_weight) {
        throw new Error('Standard Weight is required');
      }
      
      // Update standard weight
      const updatedStandardWeight = {
        ...mockStandardWeights[index],
        standard_weight: parseFloat(standardWeightData.standard_weight)
      };
      
      // In a real app, this would be a PUT request
      // Here we just update our mock data
      mockStandardWeights[index] = updatedStandardWeight;
      
      return updatedStandardWeight;
    },
    
    // Get all ornaments (for dropdown selection)
    async getOrnaments(filters = {}) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Apply filters if provided
      let filteredData = [...mockOrnaments];
      
      if (filters.isActive !== undefined) {
        filteredData = filteredData.filter(ornament => ornament.is_active === filters.isActive);
      }
      
      if (filters.tenantId) {
        filteredData = filteredData.filter(ornament => ornament.tenant_id === filters.tenantId);
      }
      
      // Check if we need to exclude ornaments that already have standard weights
      if (filters.excludeWithStandardWeights) {
        const ornamentIdsWithWeights = mockStandardWeights.map(weight => weight.ornament_id);
        filteredData = filteredData.filter(ornament => 
          !ornamentIdsWithWeights.includes(ornament.ornament_id)
        );
      }
      
      return filteredData;
    }
  };
  
  export default standardWeightService;