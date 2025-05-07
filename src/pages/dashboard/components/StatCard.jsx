import React from 'react';
import { getIconComponent } from '../../../utils/helpers/iconHelper';

const StatCard = ({ title, value, label, icon, color = 'blue' }) => {
  const colorStyles = {
    blue: 'bg-blue-100 text-blue-700 border-blue-300',
    green: 'bg-green-100 text-green-700 border-green-300',
    red: 'bg-red-100 text-red-700 border-red-300',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    purple: 'bg-purple-100 text-purple-700 border-purple-300',
    gray: 'bg-gray-100 text-gray-700 border-gray-300'
  };
  
  return (
    <div className={`p-6 rounded-lg border ${colorStyles[color]} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className={`p-2 rounded-full ${color === 'blue' ? 'bg-blue-200' : `bg-${color}-200`}`}>
          {getIconComponent(icon, 24)}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold mb-1">{value}</span>
        <span className="text-sm opacity-75">{label}</span>
      </div>
    </div>
  );
};

export default StatCard;