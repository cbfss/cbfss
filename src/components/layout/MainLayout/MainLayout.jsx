import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSidebarIsOpen } from '../../../store/slices/ui/sidebarSlice';
import Header from '../Header';
import Sidebar from '../Sidebar';
import useTheme from '../../../hooks/useTheme';
import '../../../styles/scrollbars.css';

// Import route maps directly
import dashboardRoutes from '../../../routes/route-maps/dashboard-routes';
import customerDataRoutes from '../../../routes/route-maps/customer-data-routes';
// import loanManagementRoutes from '../../../routes/route-maps/loan-management-routes';
// import goldLoanRoutes from '../../../routes/route-maps/gold-loan-routes';
// import roleRoutes from '../../../routes/route-maps/role-routes';

const MainLayout = () => {
  const isSidebarOpen = useSelector(selectSidebarIsOpen);
  const location = useLocation();
  const { currentTheme, isDarkMode } = useTheme();
 
  const getPageTitle = () => {
    // Combine all routes
    const routes = [
      ...dashboardRoutes,
      ...customerDataRoutes,
    //   ...loanManagementRoutes,
    //   ...goldLoanRoutes,
    //   ...roleRoutes
    ];
   
    const route = routes.find(r => r.path === location.pathname);
    return route?.title || 'Core Banking & Financial Services Solution';
  };

  return (
    <div 
      className={`flex min-h-screen overflow-hidden
        ${isDarkMode ? 'dark' : ''}
        bg-theme-primary text-theme-primary`}
    >
      <Sidebar />
     
      <div
        className={`flex-1 transition-all duration-300 flex flex-col
          ${isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-20'}`}
      >
        <Header title={getPageTitle()} />
       
        <main
          className="pt-20 pb-6 px-4 flex-1 overflow-y-auto bg-theme-secondary"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;