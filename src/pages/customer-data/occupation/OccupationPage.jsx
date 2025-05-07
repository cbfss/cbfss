// src/pages/customer-data/occupation/OccupationPage.jsx
import React, { useState } from 'react';
import OccupationTable from './components/OccupationTable';
import OccupationFilters from './components/OccupationFilters';
import OccupationModal from './components/OccupationModal';
import ErrorAlert from '../../../components/common/Alert';

const OccupationPage = ({
  occupations,
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
  const [currentOccupation, setCurrentOccupation] = useState(null);

  // Handle UI interactions
  const handleAddClick = () => setShowAddModal(true);
  
  const handleEditClick = (occupation) => {
    setCurrentOccupation(occupation);
    setShowEditModal(true);
  };
  
  const handleStatusClick = (occupation) => {
    setCurrentOccupation(occupation);
    setShowStatusModal(true);
  };

  // Handle modal submissions with success handling
  const handleAddSubmit = async (data) => {
    const success = await onAdd(data);
    if (success) setShowAddModal(false);
  };

  const handleEditSubmit = async (data) => {
    const success = await onEdit(data);
    if (success) setShowEditModal(false);
  };

  const handleStatusSubmit = async (occupationId) => {
    const success = await onToggleStatus(occupationId);
    if (success) setShowStatusModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Occupation Master Data</h1>
      
      {error && <ErrorAlert message={error} type="error" />}
      
      <OccupationFilters
        searchTerm={searchTerm}
        filterActive={filterActive}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onAddClick={handleAddClick}
      />
      
      <OccupationTable
        occupations={occupations}
        loading={loading}
        onEditClick={handleEditClick}
        onStatusToggleClick={handleStatusClick}
      />
      
      {/* Modals */}
      <OccupationModal
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
      
      <OccupationModal
        type="edit"
        isOpen={showEditModal}
        occupation={currentOccupation}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        error={error}
      />
      
      <OccupationModal
        type="status"
        isOpen={showStatusModal}
        occupation={currentOccupation}
        onClose={() => setShowStatusModal(false)}
        onSubmit={handleStatusSubmit}
        error={error}
      />
    </div>
  );
};

export default OccupationPage;