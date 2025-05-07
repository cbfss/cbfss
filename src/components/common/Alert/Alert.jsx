import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const Alert = ({ message, type = 'info', onClose }) => {
  const alertStyles = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700'
  };

  const iconMap = {
    info: <Info size={20} />,
    success: <CheckCircle size={20} />,
    warning: <AlertCircle size={20} />,
    error: <XCircle size={20} />
  };

  return (
    <div className={`mb-4 p-4 flex items-start border-l-4 ${alertStyles[type]}`}>
      <span className="mr-3 flex-shrink-0">{iconMap[type]}</span>
      <div className="flex-grow">{message}</div>
      {onClose && (
        <button onClick={onClose} className="ml-auto">
          <XCircle size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;