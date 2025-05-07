import React , { lazy } from 'react';

const Dashboard = lazy(() => import('../../pages/dashboard'));

const dashboardRoutes = [
  {
    path: '/',
    element: <Dashboard />,
    title: 'Core Banking & Financial Services Solution'
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    title: 'Core Banking & Financial Services Solution'
  }
];

export default dashboardRoutes;