// src/components/layout/Sidebar/SidebarSubmenu.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronsRight } from 'lucide-react';
import useTheme from '../../../hooks/useTheme';

const SidebarSubmenu = ({
  submenu,
  isSidebarOpen,
  isExpanded
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  if (!isSidebarOpen || !isExpanded) return null;

  // Theme-based styling
  const activeItemBg = isDarkMode ? 'bg-primary-800 text-white' : 'bg-primary-50 text-primary-800';
  const hoverItemBg = isDarkMode ? 'hover:bg-primary-800 hover:text-white' : 'hover:bg-primary-50 hover:text-primary-800';

  return (
    <div
      className={`overflow-hidden rounded-md ml-2 my-1 transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      {submenu.map((subItem) => (
        <div
          key={subItem.id}
          onClick={() => navigate(subItem.href)}
          className={`flex items-center py-2 px-4 text-sm text-primary-100 
            ${hoverItemBg} rounded-md mx-2 my-1 transition-colors duration-200 cursor-pointer
            ${location.pathname === subItem.href ? activeItemBg : ''}`}
        >
          <ChevronsRight size={14} className="mr-2 opacity-75" />
          <span className="whitespace-nowrap">{subItem.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SidebarSubmenu;