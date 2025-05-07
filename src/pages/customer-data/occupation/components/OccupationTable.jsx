import React from 'react';
import DataTable from '../../../../components/common/DataTable';

const OccupationTable = ({ 
  occupations, 
  loading, 
  error,
  onEditClick, 
  onStatusToggleClick 
}) => {
  const tableConfig = {
    idField: 'occupation_id',
    nameField: 'occupation_name',
    activeField: 'is_active',
    itemName: 'Occupation',
    itemNamePlural: 'Occupations',
    columns: [
      {
        key: 'occupation_id',
        header: 'ID',
        width: 'w-1/6'
      },
      {
        key: 'occupation_name',
        header: 'Occupation',
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
      data={occupations}
      loading={loading}
      error={error}
      tableConfig={tableConfig}
      onEditClick={onEditClick}
      onStatusToggleClick={onStatusToggleClick}
    />
  );
};

export default OccupationTable;