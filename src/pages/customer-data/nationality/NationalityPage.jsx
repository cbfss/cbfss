import React, { useState } from 'react';
import NationalityTable from './components/NationalityTable';
import NationalityFilters from './components/NationalityFilters';
import NationalityModal from './components/NationalityModal';
import ErrorAlert from '../../../components/common/Alert';

const NationalityPage = ({
  nationalities,
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
  const [currentNationality, setCurrentNationality] = useState(null);

  // Handle UI interactions
  const handleAddClick = () => setShowAddModal(true);
  
  const handleEditClick = (nationality) => {
    setCurrentNationality(nationality);
    setShowEditModal(true);
  };
  
  const handleStatusClick = (nationality) => {
    setCurrentNationality(nationality);
    setShowStatusModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Nationality Master Data</h1>
      
      {error && <ErrorAlert message={error} type="error" />}
      
      <NationalityFilters
        searchTerm={searchTerm}
        filterActive={filterActive}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onAddClick={handleAddClick}
      />
      
      <NationalityTable
        nationalities={nationalities}
        loading={loading}
        onEditClick={handleEditClick}
        onStatusToggleClick={handleStatusClick}
      />
      
      {/* Modals */}
      <NationalityModal
        type="add"
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={async (data) => {
          const success = await onAdd(data);
          if (success) {
            setShowAddModal(false);
          }
        }}
      />
      
      <NationalityModal
        type="edit"
        isOpen={showEditModal}
        nationality={currentNationality}
        onClose={() => setShowEditModal(false)}
        onSubmit={onEdit}
      />
      
      <NationalityModal
        type="status"
        isOpen={showStatusModal}
        nationality={currentNationality}
        onClose={() => setShowStatusModal(false)}
        onSubmit={onToggleStatus}
      />
    </div>
  );
};

export default NationalityPage;