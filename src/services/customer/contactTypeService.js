const mockContactTypes = [
    { contact_type_id: 1, contact_type: 'Mobile', is_active: true, tenant_id: 1 },
    { contact_type_id: 2, contact_type: 'Email', is_active: true, tenant_id: 1 },
    { contact_type_id: 3, contact_type: 'Home Phone', is_active: false, tenant_id: 1 },
    { contact_type_id: 4, contact_type: 'Work Phone', is_active: true, tenant_id: 1 },
    { contact_type_id: 5, contact_type: 'WhatsApp', is_active: true, tenant_id: 1 },
    { contact_type_id: 6, contact_type: 'Telegram', is_active: true, tenant_id: 1 },
    { contact_type_id: 7, contact_type: 'Fax', is_active: false, tenant_id: 1 }
  ];
  
  const contactTypeService = {
    // Get all contact types with optional filters
    async getContactTypes(filters = {}) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters if provided
      let filteredData = [...mockContactTypes];
      
      if (filters.searchTerm) {
        filteredData = filteredData.filter(type =>
          type.contact_type.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }
      
      if (filters.isActive !== undefined) {
        filteredData = filteredData.filter(type => type.is_active === filters.isActive);
      }
      
      if (filters.tenantId) {
        filteredData = filteredData.filter(type => type.tenant_id === filters.tenantId);
      }
      
      return filteredData;
    },
    
    // Get contact type by ID
    async getContactTypeById(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const contactType = mockContactTypes.find(type => type.contact_type_id === id);
      
      if (!contactType) {
        throw new Error('Contact type not found');
      }
      
      return contactType;
    },
    
    // Add new contact type
    async addContactType(contactTypeData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicates
      const isDuplicate = mockContactTypes.some(type =>
        type.contact_type.toLowerCase() === contactTypeData.contact_type.toLowerCase() &&
        type.tenant_id === contactTypeData.tenant_id
      );
      
      if (isDuplicate) {
        throw new Error('A contact type with this name already exists');
      }
      
      // Create new contact type with ID
      const newId = Math.max(...mockContactTypes.map(type => type.contact_type_id)) + 1;
      
      const newContactType = {
        contact_type_id: newId,
        contact_type: contactTypeData.contact_type,
        is_active: true,
        tenant_id: contactTypeData.tenant_id || 1
      };
      
      // In a real app, this would be a POST request
      // Here we just add to our mock data
      mockContactTypes.push(newContactType);
      
      return newContactType;
    },
    
    // Update contact type
    async updateContactType(id, contactTypeData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockContactTypes.findIndex(type => type.contact_type_id === id);
      
      if (index === -1) {
        throw new Error('Contact type not found');
      }
      
      // Check for duplicates (excluding current contact type)
      const isDuplicate = mockContactTypes.some(type =>
        type.contact_type.toLowerCase() === contactTypeData.contact_type.toLowerCase() &&
        type.tenant_id === contactTypeData.tenant_id &&
        type.contact_type_id !== id
      );
      
      if (isDuplicate) {
        throw new Error('A contact type with this name already exists');
      }
      
      // Update contact type
      const updatedContactType = {
        ...mockContactTypes[index],
        contact_type: contactTypeData.contact_type
      };
      
      // In a real app, this would be a PUT request
      // Here we just update our mock data
      mockContactTypes[index] = updatedContactType;
      
      return updatedContactType;
    },
    
    // Toggle contact type status
    async toggleStatus(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockContactTypes.findIndex(type => type.contact_type_id === id);
      
      if (index === -1) {
        throw new Error('Contact type not found');
      }
      
      // Toggle status
      mockContactTypes[index].is_active = !mockContactTypes[index].is_active;
      
      return { success: true };
    }
  };
  
  export default contactTypeService;
  