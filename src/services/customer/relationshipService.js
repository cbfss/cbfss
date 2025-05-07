const mockRelationships = [
    { relationship_id: 1, relationship: 'Father', is_active: true, tenant_id: 1 },
    { relationship_id: 2, relationship: 'Mother', is_active: true, tenant_id: 1 },
    { relationship_id: 3, relationship: 'Spouse', is_active: true, tenant_id: 1 },
    { relationship_id: 4, relationship: 'Child', is_active: false, tenant_id: 1 },
    { relationship_id: 5, relationship: 'Sibling', is_active: true, tenant_id: 1 },
    { relationship_id: 6, relationship: 'Guardian', is_active: true, tenant_id: 1 },
    { relationship_id: 7, relationship: 'Friend', is_active: false, tenant_id: 1 }
  ];
  
  const relationshipService = {
    // Get all relationships with optional filters
    async getRelationships(filters = {}) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters if provided
      let filteredData = [...mockRelationships];
      
      if (filters.searchTerm) {
        filteredData = filteredData.filter(rel =>
          rel.relationship.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }
      
      if (filters.isActive !== undefined) {
        filteredData = filteredData.filter(rel => rel.is_active === filters.isActive);
      }
      
      if (filters.tenantId) {
        filteredData = filteredData.filter(rel => rel.tenant_id === filters.tenantId);
      }
      
      return filteredData;
    },
    
    // Get relationship by ID
    async getRelationshipById(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const relationship = mockRelationships.find(rel => rel.relationship_id === id);
      
      if (!relationship) {
        throw new Error('Relationship not found');
      }
      
      return relationship;
    },
    
    // Add new relationship
    async addRelationship(relationshipData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicates
      const isDuplicate = mockRelationships.some(rel =>
        rel.relationship.toLowerCase() === relationshipData.relationship.toLowerCase() &&
        rel.tenant_id === relationshipData.tenant_id
      );
      
      if (isDuplicate) {
        throw new Error('A relationship with this name already exists');
      }
      
      // Create new relationship with ID
      const newId = Math.max(...mockRelationships.map(rel => rel.relationship_id)) + 1;
      
      const newRelationship = {
        relationship_id: newId,
        relationship: relationshipData.relationship,
        is_active: true,
        tenant_id: relationshipData.tenant_id || 1
      };
      
      // In a real app, this would be a POST request
      // Here we just add to our mock data
      mockRelationships.push(newRelationship);
      
      return newRelationship;
    },
    
    // Update relationship
    async updateRelationship(id, relationshipData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockRelationships.findIndex(rel => rel.relationship_id === id);
      
      if (index === -1) {
        throw new Error('Relationship not found');
      }
      
      // Check for duplicates (excluding current relationship)
      const isDuplicate = mockRelationships.some(rel =>
        rel.relationship.toLowerCase() === relationshipData.relationship.toLowerCase() &&
        rel.tenant_id === relationshipData.tenant_id &&
        rel.relationship_id !== id
      );
      
      if (isDuplicate) {
        throw new Error('A relationship with this name already exists');
      }
      
      // Update relationship
      const updatedRelationship = {
        ...mockRelationships[index],
        relationship: relationshipData.relationship
      };
      
      // In a real app, this would be a PUT request
      // Here we just update our mock data
      mockRelationships[index] = updatedRelationship;
      
      return updatedRelationship;
    },
    
    // Toggle relationship status
    async toggleStatus(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockRelationships.findIndex(rel => rel.relationship_id === id);
      
      if (index === -1) {
        throw new Error('Relationship not found');
      }
      
      // Toggle status
      mockRelationships[index].is_active = !mockRelationships[index].is_active;
      
      return { success: true };
    }
  };
  
  export default relationshipService;