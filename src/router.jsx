import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ErrorPage from './pages/error/ErrorPage.jsx';



import dashboardRoutes from './routes/route-maps/dashboard-routes';
import customerDataRoutes from './routes/route-maps/customer-data-routes.jsx';
import loanManagementRoutes from './routes/route-maps/loan-management-routes.jsx';
import goldLoanRoutes from './routes/route-maps/gold-loan-routes.jsx';




// Combine all routes
const routes = [
  ...dashboardRoutes,
  ...customerDataRoutes,
  ...loanManagementRoutes,
  ...goldLoanRoutes,
//   ...roleRoutes
];



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: routes.map(route => ({
      path: route.path.replace(/^\//, ''),
      element: route.element
    }))
  }
]);

export default router;


