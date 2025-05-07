import React, { useState, useEffect } from 'react';
import { X, Check, Plus } from 'lucide-react';

const TaxCategoryModal = ({ 
  type = 'add', 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen && type === 'edit' && initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
    } else if (!isOpen) {
      setName('');
      setDescription('');
      setError(null);
    }
  }, [isOpen, type, initialData]);

  const handleSubmit = async () => {
    // Basic validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    const taxCategoryData = {
      name: name.trim(),
      description: description.trim(),
      ...(type === 'edit' && { id: initialData.id })
    };

    try {
      const result = await onSubmit(taxCategoryData);
      if (result) {
        onClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {type === 'add' ? 'Add Tax Category' : 'Edit Tax Category'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tax category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description (optional)"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            {type === 'add' ? (
              <>
                <Plus size={18} className="mr-2" />
                Add
              </>
            ) : (
              <>
                <Check size={18} className="mr-2" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxCategoryModal;