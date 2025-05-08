// src/services/customer/addressTypeService.js
// Mock address type data
let mockAddressTypes = [
    { address_type_id: 1, address_type_name: 'Permanent', is_active: true, tenant_id: 1 },
    { address_type_id: 2, address_type_name: 'Current', is_active: true, tenant_id: 1 },
    { address_type_id: 3, address_type_name: 'Office', is_active: true, tenant_id: 1 },
    { address_type_id: 4, address_type_name: 'Temporary', is_active: false, tenant_id: 1 },
    { address_type_id: 5, address_type_name: 'Shipping', is_active: true, tenant_id: 1 },
    { address_type_id: 6, address_type_name: 'Billing', is_active: true, tenant_id: 1 },
    { address_type_id: 7, address_type_name: 'Secondary', is_active: false, tenant_id: 1 }
  ];
  
  const addressTypeService = {
    // Get all address types with optional filters
    async getAddressTypes(filters = {}) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters if provided
      let filteredData = [...mockAddressTypes];
      
      if (filters.searchTerm) {
        filteredData = filteredData.filter(type =>
          type.address_type_name.toLowerCase().includes(filters.searchTerm.toLowerCase())
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
    
    // Get address type by ID
    async getAddressTypeById(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const addressType = mockAddressTypes.find(type => type.address_type_id === id);
      
      if (!addressType) {
        throw new Error('Address type not found');
      }
      
      return addressType;
    },
    
    // Add new address type
    async addAddressType(addressTypeData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicates
      const isDuplicate = mockAddressTypes.some(type =>
        type.address_type_name.toLowerCase() === addressTypeData.address_type_name.toLowerCase() &&
        type.tenant_id === addressTypeData.tenant_id
      );
      
      if (isDuplicate) {
        throw new Error('An address type with this name already exists');
      }
      
      // Create new address type with ID
      const newId = Math.max(...mockAddressTypes.map(type => type.address_type_id)) + 1;
      
      const newAddressType = {
        address_type_id: newId,
        address_type_name: addressTypeData.address_type_name,
        is_active: true,
        tenant_id: addressTypeData.tenant_id || 1
      };
      
      // In a real app, this would be a POST request
      // Here we just add to our mock data
      mockAddressTypes.push(newAddressType);
      
      return newAddressType;
    },
    
    // Update address type
    async updateAddressType(id, addressTypeData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockAddressTypes.findIndex(type => type.address_type_id === id);
      
      if (index === -1) {
        throw new Error('Address type not found');
      }
      
      // Check for duplicates (excluding current address type)
      const isDuplicate = mockAddressTypes.some(type =>
        type.address_type_name.toLowerCase() === addressTypeData.address_type_name.toLowerCase() &&
        type.tenant_id === addressTypeData.tenant_id &&
        type.address_type_id !== id
      );
      
      if (isDuplicate) {
        throw new Error('An address type with this name already exists');
      }
      
      // Update address type
      const updatedAddressType = {
        ...mockAddressTypes[index],
        address_type_name: addressTypeData.address_type_name
      };
      
      // In a real app, this would be a PUT request
      // Here we just update our mock data
      mockAddressTypes[index] = updatedAddressType;
      
      return updatedAddressType;
    },
    
    // Toggle address type status
    async toggleStatus(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockAddressTypes.findIndex(type => type.address_type_id === id);
      
      if (index === -1) {
        throw new Error('Address type not found');
      }
      
      // Toggle status
      mockAddressTypes[index].is_active = !mockAddressTypes[index].is_active;
      
      return { success: true };
    }
  };
  
  export default addressTypeService;