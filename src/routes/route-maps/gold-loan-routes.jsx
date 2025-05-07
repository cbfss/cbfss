// src/routes/route-maps/gold-loan-routes.js
import React, { lazy } from 'react';
import GoldRateManagement from '../../pages/gold-loan/daily-rates';
import GoldRateTrends from '../../pages/gold-loan/daily-rates/components/GoldRateTrends';
import GoldRateReport from '../../pages/gold-loan/daily-rates/components/GoldRateReport';

const OrnamentManagement = lazy(() => import('../../pages/gold-loan/ornament'));
const StandardWeightManagement = lazy(() => import('../../pages/gold-loan/standard-weight'));

const goldLoanRoutes = [
  {
    path: '/gold-loan/rates',
    element: <GoldRateManagement  />,
    name: 'Daily Gold Rates',
    permission: 'view_gold_loan'
  },
  {
    path: '/gold-loan/rates/report',
    element: <GoldRateReport />,
    title: 'Gold Rate Reports',
    permission: 'view_gold_loan'
  },
  {
    path: '/gold-loan/rates/trends',
    element: <GoldRateTrends />,
    title: 'Gold Rate Trends',
    permission: 'view_gold_loan'
  },
  {
    path: '/gold-loan/ornament',
    element: <OrnamentManagement/>,
    title: 'Ornament Master'
  },
  {
    path: '/gold-loan/standard-weight',
    element: <StandardWeightManagement />,
    breadcrumb: 'Standard Weight Management',
    parent: '/gold-loan'
  }
];

export default goldLoanRoutes;