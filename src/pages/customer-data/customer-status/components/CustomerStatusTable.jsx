import React from 'react';
import DataTable from '../../../../components/common/DataTable';

const CustomerStatusTable = ({
  customerStatuses,
  loading,
  error,
  onEditClick,
  onStatusToggleClick
}) => {
  const tableConfig = {
    idField: 'status_id',
    nameField: 'status_name',
    activeField: 'is_active',
    itemName: 'Customer Status',
    itemNamePlural: 'Customer Statuses',
    columns: [
      {
        key: 'status_id',
        header: 'ID',
        width: 'w-1/6'
      },
      {
        key: 'status_name',
        header: 'Status Name',
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
      data={customerStatuses}
      loading={loading}
      error={error}
      tableConfig={tableConfig}
      onEditClick={onEditClick}
      onStatusToggleClick={onStatusToggleClick}
      emptyStateMessage="No customer statuses found. Try adjusting your filters or add a new customer status."
    />
  );
};

export default CustomerStatusTable;