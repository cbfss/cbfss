import React, { useState } from 'react';
import ContactTypeTable from './components/ContactTypeTable';
import ContactTypeFilters from './components/ContactTypeFilters';
import ContactTypeModal from './components/ContactTypeModal';
import ErrorAlert from '../../../components/common/Alert';

const ContactTypePage = ({
  contactTypes,
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
  const [currentContactType, setCurrentContactType] = useState(null);

  // Handle UI interactions
  const handleAddClick = () => setShowAddModal(true);
  
  const handleEditClick = (contactType) => {
    setCurrentContactType(contactType);
    setShowEditModal(true);
  };
  
  const handleStatusClick = (contactType) => {
    setCurrentContactType(contactType);
    setShowStatusModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Contact Type Master Data</h1>
      
      {error && <ErrorAlert message={error} type="error" />}
      
      <ContactTypeFilters
        searchTerm={searchTerm}
        filterActive={filterActive}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onAddClick={handleAddClick}
      />
      
      <ContactTypeTable
        contactTypes={contactTypes}
        loading={loading}
        onEditClick={handleEditClick}
        onStatusToggleClick={handleStatusClick}
      />
      
      {/* Modals */}
      <ContactTypeModal
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
      
      <ContactTypeModal
        type="edit"
        isOpen={showEditModal}
        contactType={currentContactType}
        onClose={() => setShowEditModal(false)}
        onSubmit={onEdit}
        error={error}
      />
      
      <ContactTypeModal
        type="status"
        isOpen={showStatusModal}
        contactType={currentContactType}
        onClose={() => setShowStatusModal(false)}
        onSubmit={onToggleStatus}
      />
    </div>
  );
};

export default ContactTypePage;
