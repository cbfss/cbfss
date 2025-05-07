import React from 'react';
import DataTable from '../../../../components/common/DataTable';

const TaxCategoryTable = ({ 
  taxCategories, 
  loading, 
  onEditClick, 
  onStatusToggleClick 
}) => {
  const tableConfig = {
    idField: 'id',
    nameField: 'name',
    activeField: 'is_active',
    itemName: 'Tax Category',
    itemNamePlural: 'Tax Categories',
    columns: [
      {
        key: 'id',
        header: 'ID',
        width: 'w-1/6'
      },
      {
        key: 'name',
        header: 'Name',
        width: 'w-2/6'
      },
      {
        key: 'description',
        header: 'Description',
        width: 'w-2/6',
        render: (item) => item.description || 'N/A'
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
      data={taxCategories}
      loading={loading}
      tableConfig={tableConfig}
      onEditClick={onEditClick}
      onStatusToggleClick={onStatusToggleClick}
    />
  );
};

export default TaxCategoryTable;