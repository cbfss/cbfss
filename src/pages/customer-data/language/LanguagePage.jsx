import React, { useState } from 'react';
import LanguageTable from './components/LanguageTable';
import LanguageFilters from './components/LanguageFilters';
import LanguageModal from './components/LanguageModal';
import ErrorAlert from '../../../components/common/Alert';

const LanguagePage = ({
  languages,
  searchTerm,
  filterActive,
  loading,
  error,
  onSearchChange,
  onFilterChange,
  onAdd,
  onEdit,
  onToggleStatus
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(null);

  // Handle UI interactions
  const handleAddClick = () => setShowAddModal(true);
  
  const handleEditClick = (language) => {
    setCurrentLanguage(language);
    setShowEditModal(true);
  };
  
  const handleStatusClick = (language) => {
    setCurrentLanguage(language);
    setShowStatusModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Supported Languages</h1>
      
      {error && <ErrorAlert message={error} type="error" />}
      
      <LanguageFilters
        searchTerm={searchTerm}
        filterActive={filterActive}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onAddClick={handleAddClick}
      />
      
      <LanguageTable
        languages={languages}
        loading={loading}
        onEditClick={handleEditClick}
        onStatusToggleClick={handleStatusClick}
      />
      
      {/* Modals */}
      <LanguageModal
        type="add"
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={async (data) => {
          const success = await onAdd(data);
          if (success) {
            setShowAddModal(false);
          }
        }}
        error={error}
      />
      
      <LanguageModal
        type="edit"
        isOpen={showEditModal}
        language={currentLanguage}
        onClose={() => setShowEditModal(false)}
        onSubmit={onEdit}
        error={error}
      />
      
      <LanguageModal
        type="status"
        isOpen={showStatusModal}
        language={currentLanguage}
        onClose={() => setShowStatusModal(false)}
        onSubmit={onToggleStatus}
      />
    </div>
  );
};

export default LanguagePage;