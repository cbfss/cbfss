// src/components/layout/Sidebar/SidebarItem.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getIconComponent } from '../../../utils/helpers/iconHelper';
import { ChevronDown } from 'lucide-react';
import useTheme from '../../../hooks/useTheme';

const SidebarItem = ({
  item,
  isSidebarOpen,
  isExpanded,
  onToggleExpand
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  // Theme-based styling
  const activeItemBg = isDarkMode ? 'bg-primary-800' : 'bg-primary-600';
  const hoverItemBg = isDarkMode ? 'hover:bg-primary-800' : 'hover:bg-primary-600';
  const iconColor = 'text-primary-100';

  const handleItemClick = () => {
    if (item.submenu && isSidebarOpen) {
      onToggleExpand(item.title);
    } else if (item.href) {
      navigate(item.href);
    }
  };

  const isActive = location.pathname.startsWith(item.href);

  return (
    <div className="mb-1 mx-2">
      <div
        className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md
          ${isActive ? activeItemBg : ''}
          ${isSidebarOpen ? 'pr-2 ' + hoverItemBg : 'justify-center ' + hoverItemBg}
          transition-all duration-200`}
        onClick={handleItemClick}
      >
        <div className="flex items-center">
          <span className={`${isSidebarOpen ? 'mr-3' : ''} ${iconColor}`}>
            {getIconComponent(item.icon, 20)}
          </span>
          {isSidebarOpen && <span className="whitespace-nowrap text-white">{item.title}</span>}
        </div>
        {isSidebarOpen && item.submenu && (
          <ChevronDown
            size={16}
            className={`transform transition-transform duration-300 ${iconColor} ${isExpanded ? 'rotate-180' : ''}`}
          />
        )}
      </div>

      {/* Submenu items */}
      {isSidebarOpen && item.submenu && (
        <div
          className={`overflow-hidden rounded-md ml-2 my-1 transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {item.submenu.map((subItem) => (
            <div
              key={subItem.id}
              onClick={() => navigate(subItem.href)}
              className={`flex items-center py-2 px-4 text-sm text-primary-100 
                ${isDarkMode ? 'hover:bg-primary-800 hover:text-white' : 'hover:bg-primary-50 hover:text-primary-800'} 
                rounded-md mx-2 my-1 transition-colors duration-200 cursor-pointer
                ${location.pathname === subItem.href ? 
                  (isDarkMode ? 'bg-primary-800 text-white' : 'bg-primary-50 text-primary-800') : ''}`}
            >
              <span className="whitespace-nowrap ml-4">{subItem.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
