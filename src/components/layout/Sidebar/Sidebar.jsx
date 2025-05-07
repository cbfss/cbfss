import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  LogOut,
  ChevronsRight,
  ArrowLeftCircle,
  ArrowRightCircle
} from 'lucide-react';
import intel from "../../../assets/images/intel.png"
import useTheme from '../../../hooks/useTheme';

// Import Redux actions and selectors
import {
  toggleSidebar,
  selectSidebarIsOpen
} from '../../../store/slices/ui/sidebarSlice';
import {
  fetchMenuItems,
  toggleMenuExpand,
  selectAllMenuItems,
  selectExpandedMenuItems,
  selectMenuStatus
} from '../../../store/slices/ui/menuSlice';

// Import helper functions
import { getIconComponent } from '../../../utils/helpers/iconHelper';

// Import styles
import '../../../styles/scrollbars.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme, isDarkMode } = useTheme();

  // Select state from Redux store
  const isSidebarOpen = useSelector(selectSidebarIsOpen);
  const menuItems = useSelector(selectAllMenuItems);
  const expandedItems = useSelector(selectExpandedMenuItems);
  const menuStatus = useSelector(selectMenuStatus);

  // Fetch menu items on component mount
  useEffect(() => {
    if (menuStatus === 'idle') {
      dispatch(fetchMenuItems());
    }
  }, [dispatch, menuStatus]);

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // Handle menu item expansion
  const handleToggleMenuExpand = (title) => {
    dispatch(toggleMenuExpand(title));
  };

  // Handle navigation when menu item is clicked
  const handleMenuItemClick = (item) => {
    if (item.href) {
      navigate(item.href);

      // On mobile, close the sidebar after navigation
      if (window.innerWidth < 768) {
        dispatch(toggleSidebar());
      }
    }
  };

  // Close sidebar on small screens when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        dispatch(toggleSidebar());
      }
    };

    const handleClickOutside = (event) => {
      const sidebarElement = document.getElementById('sidebar');
      if (window.innerWidth < 768 && isSidebarOpen && sidebarElement && !sidebarElement.contains(event.target)) {
        dispatch(toggleSidebar());
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, isSidebarOpen]);

  // Get theme-based background colors
  const sidebarBgColor = isDarkMode ? 'bg-primary-900' : 'bg-primary-700';
  const activeItemBgColor = isDarkMode ? 'bg-primary-800' : 'bg-primary-600';
  const hoverItemBgColor = isDarkMode ? 'hover:bg-primary-800' : 'hover:bg-primary-600';
  const submenuActiveBgColor = isDarkMode ? 'bg-primary-800 text-white' : 'bg-primary-50 text-primary-800';
  const submenuHoverBgColor = isDarkMode ? 'hover:bg-primary-800 hover:text-white' : 'hover:bg-primary-50 hover:text-primary-800';

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
          onClick={handleToggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <div
        id="sidebar"
        className={`flex flex-col h-screen ${sidebarBgColor} m-2 text-white fixed top-0 left-0 z-20
          transition-all duration-300 ease-in-out rounded-tr-3xl rounded-3xl shadow-xl
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-20'}`}
      >
        {/* Logo section */}
        <div className="flex items-center justify-center">
          {isSidebarOpen ? (
            <div className="flex items-center justify-center w-24 h-20">
              <img src={intel} alt="Logo" />
            </div>
          ) : (
            <div className="w-full flex justify-center p-4">
              <img src={intel} alt="Logo" />
            </div>
          )}
        </div>

        {/* Search input (when sidebar is open) */}
        {isSidebarOpen && (
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Quick Search"
                className={`w-full py-1 pl-8 pr-4 rounded-full text-white 
                  placeholder-primary-200 border border-primary-300 
                  focus:outline-none focus:ring-2 focus:ring-primary-300 
                  transition-all duration-200 bg-transparent`}
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-primary-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>
        )}

        {/* Menu items container */}
        <div className="flex-grow overflow-hidden">
          <nav
            className="h-full overflow-y-auto custom-scrollbar py-2"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Loading state */}
            {menuStatus === 'loading' ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : menuStatus === 'failed' ? (
              <div className="text-center py-4 text-red-300">Failed to load menu</div>
            ) : (
              // Render menu items
              menuItems.map((item) => (
                <div key={item.id} className="mb-1 mx-2">
                  <div
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md
                      ${location.pathname.startsWith(item.href) ? activeItemBgColor : ''}
                      ${isSidebarOpen ? 'pr-2 ' + hoverItemBgColor : 'justify-center ' + hoverItemBgColor}
                      transition-all duration-200`}
                    onClick={() => item.submenu && isSidebarOpen
                      ? handleToggleMenuExpand(item.title)
                      : handleMenuItemClick(item)}
                  >
                    <div className="flex items-center">
                      <span className={`${isSidebarOpen ? 'mr-3' : ''} text-primary-100`}>
                        {getIconComponent(item.icon, 20)}
                      </span>
                      {isSidebarOpen && <span className="whitespace-nowrap">{item.title}</span>}
                    </div>
                    {isSidebarOpen && item.submenu && (
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform duration-300 text-primary-100 ${expandedItems[item.title] ? 'rotate-180' : ''}`}
                      />
                    )}
                  </div>

                  {/* Submenu items */}
                  {isSidebarOpen && item.submenu && (
                    <div
                      className={`overflow-hidden rounded-md ml-2 my-1 transition-all duration-300 ease-in-out
                        ${expandedItems[item.title] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      {item.submenu.map((subItem) => (
                        <div
                          key={subItem.id}
                          onClick={() => handleMenuItemClick(subItem)}
                          className={`flex items-center py-2 px-4 text-sm text-primary-100 
                            ${submenuHoverBgColor} rounded-md mx-2 my-1 transition-colors duration-200 cursor-pointer
                            ${location.pathname === subItem.href ? submenuActiveBgColor : ''}`}
                        >
                          <ChevronsRight size={14} className="mr-2 opacity-75" />
                          <span className="whitespace-nowrap">{subItem.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </nav>
        </div>

        {/* Sidebar toggle button */}
        <div className="flex justify-center p-4">
          <button
            onClick={handleToggleSidebar}
            className="text-primary-100 hover:text-white transition-colors duration-200"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <ArrowLeftCircle size={20} /> : <ArrowRightCircle size={20} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;