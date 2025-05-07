import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  selectAllDashboardStats,
  selectDashboardStatus,
  selectDashboardError
} from '../../store/slices/dashboard/dashboardSlice';
import DashboardPage from './DashboardPage';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const stats = useSelector(selectAllDashboardStats);
  const status = useSelector(selectDashboardStatus);
  const error = useSelector(selectDashboardError);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboardStats());
    }
  }, [dispatch, status]);
  
  if (status === 'loading') {
    return <Loader />;
  }
  
  if (status === 'failed') {
    return <Alert message={error} type="error" />;
  }
  
  return <DashboardPage stats={stats} />;
};

export default Dashboard;