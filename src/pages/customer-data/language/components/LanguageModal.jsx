// src/pages/customer-data/language/components/LanguageModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Check, Plus, AlertCircle } from 'lucide-react';

const LanguageModal = ({
  type = 'add',
  isOpen,
  onClose,
  onSubmit,
  language = null,
  error = null
}) => {
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (type === 'edit' && language) {
      setName(language.language_name);
    } else {
      setName('');
    }
  }, [type, language, isOpen]);
  
  if (!isOpen) return null;
  
  const handleSubmit = () => {
    if (!name.trim()) return;
    
    if (type === 'add') {
      onSubmit({ language_name: name });
    } else if (type === 'edit') {
      onSubmit({ language_id: language.language_id, language_name: name });
    } else if (type === 'status') {
      onSubmit(language.language_id);
    }
  };
  
  // Different content based on modal type
  const renderContent = () => {
    switch (type) {
      case 'add':
      case 'edit':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {type === 'add' ? 'Add New Language' : 'Edit Language'}
            </h2>
            
            {error && (
              <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start">
                <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Language Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter language name"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center"
              >
                <X size={18} className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                disabled={!name.trim()}
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
          </>
        );
      case 'status':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {language?.is_active ? 'Deactivate' : 'Reactivate'} Language
            </h2>
            <p className="mb-4">
              Are you sure you want to {language?.is_active ? 'deactivate' : 'reactivate'} <strong>{language?.language_name}</strong>?
              {language?.is_active
                ? ' This will hide it from selection in forms and dropdowns.'
                : ' This will make it available again for selection.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center"
              >
                <X size={18} className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={language?.is_active
                  ? "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                  : "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                }
              >
                {language?.is_active ? 'Deactivate' : 'Reactivate'}
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default LanguageModal;