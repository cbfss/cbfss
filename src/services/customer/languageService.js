const mockLanguages = [
    { language_id: 1, language_name: 'English', is_active: true, tenant_id: 1 },
    { language_id: 2, language_name: 'Hindi', is_active: true, tenant_id: 1 },
    { language_id: 3, language_name: 'Spanish', is_active: true, tenant_id: 1 },
    { language_id: 4, language_name: 'French', is_active: false, tenant_id: 1 },
    { language_id: 5, language_name: 'Mandarin', is_active: true, tenant_id: 1 },
    { language_id: 6, language_name: 'Arabic', is_active: true, tenant_id: 1 },
    { language_id: 7, language_name: 'Japanese', is_active: false, tenant_id: 1 }
  ];
  
  const languageService = {
    // Get all languages with optional filters
    async getLanguages(filters = {}) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters if provided
      let filteredData = [...mockLanguages];
      
      if (filters.searchTerm) {
        filteredData = filteredData.filter(lang =>
          lang.language_name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }
      
      if (filters.isActive !== undefined) {
        filteredData = filteredData.filter(lang => lang.is_active === filters.isActive);
      }
      
      if (filters.tenantId) {
        filteredData = filteredData.filter(lang => lang.tenant_id === filters.tenantId);
      }
      
      return filteredData;
    },
    
    // Get language by ID
    async getLanguageById(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const language = mockLanguages.find(lang => lang.language_id === id);
      
      if (!language) {
        throw new Error('Language not found');
      }
      
      return language;
    },
    
    // Add new language
    async addLanguage(languageData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for duplicates
      const isDuplicate = mockLanguages.some(lang =>
        lang.language_name.toLowerCase() === languageData.language_name.toLowerCase() &&
        lang.tenant_id === languageData.tenant_id
      );
      
      if (isDuplicate) {
        throw new Error('A language with this name already exists');
      }
      
      // Create new language with ID
      const newId = Math.max(...mockLanguages.map(lang => lang.language_id)) + 1;
      
      const newLanguage = {
        language_id: newId,
        language_name: languageData.language_name,
        is_active: true,
        tenant_id: languageData.tenant_id || 1
      };
      
      // In a real app, this would be a POST request
      // Here we just add to our mock data
      mockLanguages.push(newLanguage);
      
      return newLanguage;
    },
    
    // Update language
    async updateLanguage(id, languageData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockLanguages.findIndex(lang => lang.language_id === id);
      
      if (index === -1) {
        throw new Error('Language not found');
      }
      
      // Check for duplicates (excluding current language)
      const isDuplicate = mockLanguages.some(lang =>
        lang.language_name.toLowerCase() === languageData.language_name.toLowerCase() &&
        lang.tenant_id === languageData.tenant_id &&
        lang.language_id !== id
      );
      
      if (isDuplicate) {
        throw new Error('A language with this name already exists');
      }
      
      // Update language
      const updatedLanguage = {
        ...mockLanguages[index],
        language_name: languageData.language_name
      };
      
      // In a real app, this would be a PUT request
      // Here we just update our mock data
      mockLanguages[index] = updatedLanguage;
      
      return updatedLanguage;
    },
    
    // Toggle language status
    async toggleStatus(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockLanguages.findIndex(lang => lang.language_id === id);
      
      if (index === -1) {
        throw new Error('Language not found');
      }
      
      // Toggle status
      mockLanguages[index].is_active = !mockLanguages[index].is_active;
      
      return { success: true };
    }
  };
  
  export default languageService;