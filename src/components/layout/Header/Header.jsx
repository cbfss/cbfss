import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, User, Menu, Search, X } from 'lucide-react';
import { selectSidebarIsOpen, toggleSidebar } from '../../../store/slices/ui/sidebarSlice';
import ThemeDropdown from '../../theme/ThemeDropdown';
import useTheme from '../../../hooks/useTheme';

const Header = ({ title = "Role Management Dashboard" }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  
  // Get sidebar state from Redux
  const isSidebarOpen = useSelector(selectSidebarIsOpen);
  
  // State for mobile search toggle
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // Toggle mobile search
  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };
  
  // Toggle sidebar (for mobile)
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // Theme-specific styles
  const headerBg = isDarkMode ? '' : '';
  const headerBorder = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const headerText = isDarkMode ? 'text-gray-200' : 'text-gray-800';
  const iconColor = isDarkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600';
  const searchBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const searchText = isDarkMode ? 'text-gray-300' : 'text-gray-800';
  const searchPlaceholder = isDarkMode ? 'text-gray-500' : 'text-gray-400';
  const avatarBg = 'bg-primary-600';
  
  return (
    <header
      className={` fixed top-0 right-0 h-16 flex items-center justify-end px-4 sm:px-6
        transition-all duration-300 z-10 ${headerBg}  ${headerBorder}
        ${isSidebarOpen ? 'md:left-64' : 'md:left-20'}
        left-0`}
    >
      {/* Mobile menu toggle button (only visible on small screens) */}
      <button
        className={`md:hidden ${iconColor} mr-2`}
        onClick={handleToggleSidebar}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>
      
      {/* Page title - hide when search is open on mobile */}
      {/* <h1
        className={`text-lg sm:text-xl font-semibold ${headerText} truncate mr-auto
          ${isMobileSearchOpen ? 'hidden' : 'block'}`}
      >
        {title}
      </h1> */}
      
      {/* Mobile search (full width when open) */}
      {isMobileSearchOpen && (
        <div className={`absolute inset-x-0 top-0 h-16 ${headerBg} px-4 flex items-center z-20`}>
          {/* <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className={searchPlaceholder} size={18} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className={`w-full py-2 pl-10 pr-4 rounded-md border ${headerBorder} ${searchBg} ${searchText} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              autoFocus
            />
          </div> */}
          <button
            className={iconColor + " ml-2"}
            onClick={toggleMobileSearch}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <div className="flex items-center">
        {/* Desktop search input - hidden on mobile */}
        {/* <div className="relative hidden md:block mr-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className={searchPlaceholder} size={18} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className={`py-2 pl-10 pr-4 rounded-md border ${headerBorder} ${searchBg} ${searchText} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
          />
        </div> */}
        
        {/* Mobile search toggle button */}
        <button
          className={`md:hidden ${iconColor} ml-auto mr-4`}
          onClick={toggleMobileSearch}
          aria-label="Open search"
        >
          <Search size={20} />
        </button>
        
        {/* Theme dropdown */}
        <ThemeDropdown className="mr-4" />
        
        {/* Notification icon */}
        <button className={`${iconColor} relative mx-4`}>
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-error-500 rounded-full"></span>
        </button>
        
        {/* User profile */}
        <div className={`h-8 w-8 rounded-full ${avatarBg} flex items-center justify-center text-white font-medium`}>
          <User size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;