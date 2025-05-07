import React from 'react';
import DataTable from '../../../../components/common/DataTable';

const RelationshipTable = ({
  relationships,
  loading,
  error,
  onEditClick,
  onStatusToggleClick
}) => {
  const tableConfig = {
    idField: 'relationship_id',
    nameField: 'relationship',
    activeField: 'is_active',
    itemName: 'Relationship',
    itemNamePlural: 'Relationships',
    columns: [
      {
        key: 'relationship_id',
        header: 'ID',
        width: 'w-1/6'
      },
      {
        key: 'relationship',
        header: 'Relationship',
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
      data={relationships}
      loading={loading}
      error={error}
      tableConfig={tableConfig}
      onEditClick={onEditClick}
      onStatusToggleClick={onStatusToggleClick}
      emptyStateMessage="No relationships found. Try adjusting your filters or add a new relationship."
    />
  );
};

export default RelationshipTable;