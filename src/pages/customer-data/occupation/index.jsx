import React, { Suspense } from 'react';
import OccupationPage from './OccupationPage';
import useOccupationFilters from './hooks/useOccupationFilters';
import useOccupationOperations from './hooks/useOccupationOperations';
import Loader from '../../../components/common/Loader';

const OccupationManagement = () => {
  // Hooks for handling business logic
  const {
    filteredOccupations,
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange
  } = useOccupationFilters();

  const {
    status,
    error,
    handleAddOccupation,
    handleEditOccupation,
    handleToggleStatus
  } = useOccupationOperations();

  return (
    <Suspense fallback={<Loader />}>
      <OccupationPage
        occupations={filteredOccupations}
        searchTerm={searchTerm}
        filterActive={filterActive}
        loading={status === 'loading'}
        error={error}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onAdd={handleAddOccupation}
        onEdit={handleEditOccupation}
        onToggleStatus={handleToggleStatus}
      />
    </Suspense>
  );
};

export default OccupationManagement;