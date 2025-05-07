// src/pages/customer-data/contact-type/components/ContactTypeTable.jsx
import React from 'react';
import DataTable from '../../../../components/common/DataTable';

const ContactTypeTable = ({
  contactTypes,
  loading,
  error,
  onEditClick,
  onStatusToggleClick
}) => {
  const tableConfig = {
    idField: 'contact_type_id',
    nameField: 'contact_type',
    activeField: 'is_active',
    itemName: 'Contact Type',
    itemNamePlural: 'Contact Types',
    columns: [
      {
        key: 'contact_type_id',
        header: 'ID',
        width: 'w-1/6'
      },
      {
        key: 'contact_type',
        header: 'Contact Type',
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
      data={contactTypes}
      loading={loading}
      error={error}
      tableConfig={tableConfig}
      onEditClick={onEditClick}
      onStatusToggleClick={onStatusToggleClick}
      emptyStateMessage="No contact types found. Try adjusting your filters or add a new contact type."
    />
  );
};

export default ContactTypeTable;