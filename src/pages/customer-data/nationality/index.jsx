import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import NationalityPage from './NationalityPage';
import useNationalityFilters from './hooks/useNationalityFilters';
import useNationalityOperations from './hooks/useNationalityOperations';
import Loader from '../../../components/common/Loader';

const NationalityManagement = () => {
  // Hooks for handling business logic
  const {
    filteredNationalities,
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange
  } = useNationalityFilters();

  const {
    status,
    error,
    handleAddNationality,
    handleEditNationality,
    handleToggleStatus
  } = useNationalityOperations();

  return (
    <Suspense fallback={<Loader />}>
      <NationalityPage
        nationalities={filteredNationalities}
        searchTerm={searchTerm}
        filterActive={filterActive}
        loading={status === 'loading'}
        error={error}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onAdd={handleAddNationality}
        onEdit={handleEditNationality}
        onToggleStatus={handleToggleStatus}
      />
    </Suspense>
  );
};

export default NationalityManagement;