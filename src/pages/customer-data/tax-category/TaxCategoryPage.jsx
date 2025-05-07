import React, { useState } from 'react';
import TaxCategoryTable from './components/TaxCategoryTable';
import TaxCategoryModal from './components/TaxCategoryModal';

const TaxCategoryPage = ({
  taxCategories,
  loading,
  error,
  isAddModalOpen,
  isEditModalOpen,
  currentTaxCategory,
  onOpenAddModal,
  onCloseAddModal,
  onOpenEditModal,
  onCloseEditModal,
  onAddTaxCategory,
  onEditTaxCategory,
  onStatusToggle
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Tax Category Master Data</h1>
        <button
          onClick={onOpenAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          + Add Tax Category
        </button>
      </div>

      <TaxCategoryTable
        taxCategories={taxCategories}
        loading={loading}
        onEditClick={onOpenEditModal}
        onStatusToggleClick={onStatusToggle}
      />

      {/* Add Modal */}
      <TaxCategoryModal
        type="add"
        isOpen={isAddModalOpen}
        onClose={onCloseAddModal}
        onSubmit={onAddTaxCategory}
      />

      {/* Edit Modal */}
      <TaxCategoryModal
        type="edit"
        isOpen={isEditModalOpen}
        initialData={currentTaxCategory}
        onClose={onCloseEditModal}
        onSubmit={onEditTaxCategory}
      />
    </div>
  );
};

export default TaxCategoryPage;