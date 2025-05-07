import React, { Suspense } from 'react';
import ContactTypePage from './ContactTypePage';
import useContactTypeFilters from './hooks/useContactTypeFilters';
import useContactTypeOperations from './hooks/useContactTypeOperations';
import Loader from '../../../components/common/Loader';

const ContactTypeManagement = () => {
  // Hooks for handling business logic
  const {
    filteredContactTypes,
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange
  } = useContactTypeFilters();

  const {
    status,
    error,
    handleAddContactType,
    handleEditContactType,
    handleToggleStatus
  } = useContactTypeOperations();

  return (
    <Suspense fallback={<Loader />}>
      <ContactTypePage
        contactTypes={filteredContactTypes}
        searchTerm={searchTerm}
        filterActive={filterActive}
        loading={status === 'loading'}
        error={error}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onAdd={handleAddContactType}
        onEdit={handleEditContactType}
        onToggleStatus={handleToggleStatus}
      />
    </Suspense>
  );
};

export default ContactTypeManagement;