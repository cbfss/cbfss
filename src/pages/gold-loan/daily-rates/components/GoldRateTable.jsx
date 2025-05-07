// src/pages/gold-loan/daily-rates/components/GoldRateTable.jsx
import React from 'react';
import DataTable from '../../../../components/common/DataTable';
import { formatDate, formatCurrency } from '../../../../utils/formatters';

const GoldRateTable = ({
  rates,
  loading,
  error,
  onEditClick
}) => {
  // Configure the DataTable for gold rates
  const tableConfig = {
    idField: 'gold_rate_id',
    nameField: 'rate_date',
    itemName: 'Gold Rate',
    itemNamePlural: 'Gold Rates',
    columns: [
      {
        key: 'rate_date',
        header: 'Date',
        width: 'w-1/6',
        render: (item) => formatDate(item.rate_date)
      },
      {
        key: 'carat_name',
        header: 'Carat Type',
        width: 'w-1/6'
      },
      {
        key: 'rate_per_gram',
        header: 'Rate per Gram',
        width: 'w-1/6',
        align: 'text-right',
        render: (item) => formatCurrency(item.rate_per_gram)
      },
      {
        key: 'created_at',
        header: 'Created',
        width: 'w-2/6',
        render: (item) => (
          <div className="text-sm">
            <div>{formatDate(item.created_at, true)}</div>
            <div className="text-gray-500">by User ID: {item.created_by}</div>
          </div>
        )
      }
    ]
  };

  return (
    <DataTable
      data={rates}
      loading={loading}
      error={error}
      tableConfig={tableConfig}
      onEditClick={onEditClick}
      emptyStateMessage="No gold rates found. Try adjusting your filters or add new gold rates."
    />
  );
};

export default GoldRateTable;