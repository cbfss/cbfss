import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaxCategoryPage from './TaxCategoryPage';
import {
  fetchTaxCategories,
  addTaxCategory,
  updateTaxCategory,
  toggleTaxCategoryStatus,
  selectTaxCategories,
  selectTaxCategoryStatus,
  selectTaxCategoryError
} from '../../../store/slices/customer/taxCategorySlice';

const TaxCategoryManagement = () => {
  const dispatch = useDispatch();
  
  // Select data from Redux store
  const taxCategories = useSelector(selectTaxCategories);
  const status = useSelector(selectTaxCategoryStatus);
  const error = useSelector(selectTaxCategoryError);
  
  // Local state for modal management
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTaxCategory, setCurrentTaxCategory] = useState(null);
  
  // Fetch tax categories on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTaxCategories());
    }
  }, [dispatch, status]);
  
  // Handle add tax category
  const handleAddTaxCategory = async (taxCategoryData) => {
    try {
      await dispatch(addTaxCategory(taxCategoryData)).unwrap();
      setIsAddModalOpen(false);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  // Handle edit tax category
  const handleEditTaxCategory = async (taxCategoryData) => {
    try {
      await dispatch(updateTaxCategory(taxCategoryData)).unwrap();
      setIsEditModalOpen(false);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  // Handle status toggle
  const handleToggleStatus = async (taxCategory) => {
    try {
      await dispatch(toggleTaxCategoryStatus(taxCategory.id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };
  
  // Open edit modal
  const handleEditClick = (taxCategory) => {
    setCurrentTaxCategory(taxCategory);
    setIsEditModalOpen(true);
  };
  
  return (
    <TaxCategoryPage
      taxCategories={taxCategories}
      loading={status === 'loading'}
      error={error}
      
      // Modal states
      isAddModalOpen={isAddModalOpen}
      isEditModalOpen={isEditModalOpen}
      currentTaxCategory={currentTaxCategory}
      
      // Modal handlers
      onOpenAddModal={() => setIsAddModalOpen(true)}
      onCloseAddModal={() => setIsAddModalOpen(false)}
      onOpenEditModal={handleEditClick}
      onCloseEditModal={() => setIsEditModalOpen(false)}
      
      // CRUD handlers
      onAddTaxCategory={handleAddTaxCategory}
      onEditTaxCategory={handleEditTaxCategory}
      onStatusToggle={handleToggleStatus}
    />
  );
};

export default TaxCategoryManagement;