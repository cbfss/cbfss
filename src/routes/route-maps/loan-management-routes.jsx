// src/routes/route-maps/loan-management-routes.js
// This file defines all routes related to loan management features
// It uses lazy loading for better performance and code splitting

import React, { lazy } from 'react';

// Lazy-loaded components for loan management features
// This means they only load when the route is accessed
// const LoanDashboard = lazy(() => import('../../pages/loans/dashboard/LoanDashboard'));
// const LoanApplicationList = lazy(() => import('../../pages/loans/applications/LoanApplicationList'));
const LoanCategoryManagement = lazy(() => import('../../pages/loan-management/loan-category'));

// Define the routes for loan management
// Each route has a path and a lazy-loaded component
const loanManagementRoutes = [
  {
    path: '/loans',
    // element: <LoanDashboard />,
    name: 'Loan Dashboard',
    // Permission that would be checked to allow access
    permission: 'view_loan_dashboard'
  },
  {
    path: '/loans/applications',
    // element: <LoanApplicationList />,
    name: 'Loan Applications',
    permission: 'view_loan_applications'
  },
  
  {
    path: '/loans/categories', // or '/loans/categories' depending on which you chose
    // element: <div>Test Loan Categories</div>, 
    element: <LoanCategoryManagement />,
    name: 'Loan Categories',
    permission: 'view_loan_data'
  }
];

export default loanManagementRoutes;