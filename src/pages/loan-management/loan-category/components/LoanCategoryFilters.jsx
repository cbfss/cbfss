// src/pages/loan-management/loan-category/components/LoanCategoryFilters.jsx
import React from 'react';
import { Plus, X } from 'lucide-react';

const LoanCategoryFilters = ({
  isFormVisible,
  onAddClick
}) => {
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={onAddClick}
        className={`${
          isFormVisible ? 'bg-gray-600 hover:bg-gray-700' : 'bg-primary-600 hover:bg-primary-700'
        } text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center transition-colors`}
      >
        {isFormVisible ? (
          <>
            <X size={18} className="mr-2" />
            Close Form
          </>
        ) : (
          <>
            <Plus size={18} className="mr-2" />
            Add Loan Category
          </>
        )}
      </button>
    </div>
  );
};

export default LoanCategoryFilters;
