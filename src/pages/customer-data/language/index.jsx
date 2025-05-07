import React, { Suspense } from 'react';
import LanguagePage from './LanguagePage';
import useLanguageFilters from './hooks/useLanguageFilters';
import useLanguageOperations from './hooks/useLanguageOperations';
import Loader from '../../../components/common/Loader';

const LanguageManagement = () => {
  // Hooks for handling business logic
  const {
    filteredLanguages,
    searchTerm,
    filterActive,
    handleSearchChange,
    handleFilterChange
  } = useLanguageFilters();

  const {
    status,
    error,
    handleAddLanguage,
    handleEditLanguage,
    handleToggleStatus
  } = useLanguageOperations();

  return (
    <Suspense fallback={<Loader />}>
      <LanguagePage
        languages={filteredLanguages}
        searchTerm={searchTerm}
        filterActive={filterActive}
        loading={status === 'loading'}
        error={error}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onAdd={handleAddLanguage}
        onEdit={handleEditLanguage}
        onToggleStatus={handleToggleStatus}
      />
    </Suspense>
  );
};

export default LanguageManagement;