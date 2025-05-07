import React from 'react';
import DataTable from '../../../../components/common/DataTable';

const NationalityTable = ({ 
  nationalities, 
  loading, 
  onEditClick, 
  onStatusToggleClick 
}) => {
  const tableConfig = {
    idField: 'id',
    nameField: 'name',
    activeField: 'is_active',
    itemName: 'Nationality',
    itemNamePlural: 'Nationalities',
    columns: [
      {
        key: 'id',
        header: 'ID',
        width: 'w-1/6'
      },
      {
        key: 'name',
        header: 'Nationality',
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
      data={nationalities}
      loading={loading}
      tableConfig={tableConfig}
      onEditClick={onEditClick}
      onStatusToggleClick={onStatusToggleClick}
    />
  );
};

export default NationalityTable;