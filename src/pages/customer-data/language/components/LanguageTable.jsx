import React from 'react';
import DataTable from '../../../../components/common/DataTable';

const LanguageTable = ({
  languages,
  loading,
  error,
  onEditClick,
  onStatusToggleClick
}) => {
  const tableConfig = {
    idField: 'language_id',
    nameField: 'language_name',
    activeField: 'is_active',
    itemName: 'Language',
    itemNamePlural: 'Languages',
    columns: [
      {
        key: 'language_id',
        header: 'ID',
        width: 'w-1/6'
      },
      {
        key: 'language_name',
        header: 'Language',
        width: 'w-3/6'
      },
      {
        key: 'status',
        header: 'Status',
        width: 'w-1/6'
      }
    ]
  };

  return (
    <DataTable
      data={languages}
      loading={loading}
      error={error}
      tableConfig={tableConfig}
      onEditClick={onEditClick}
      onStatusToggleClick={onStatusToggleClick}
      emptyStateMessage="No languages found. Try adjusting your filters or add a new language."
    />
  );
};

export default LanguageTable;