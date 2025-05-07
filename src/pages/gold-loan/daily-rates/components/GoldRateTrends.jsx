// src/pages/gold-loan/gold-rate/components/GoldRateTrends.jsx
import React, { useState, useEffect } from 'react';
import { useGetGoldRateTrendsQuery, useGetCaratTypesQuery } from '../../../../services/gold/goldRateApi';
import { Award, Calendar, RefreshCw } from 'lucide-react';
import { formatDate, getDateDaysAgo } from '../../../../utils/dateUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Component to display gold rate trends over time
 */
const GoldRateTrends = () => {
  const [caratId, setCaratId] = useState(1); // Default to 24K
  const [days, setDays] = useState(30); // Default to 30 days
  
  // Get carat types for dropdown
  const { data: caratTypes = [], isLoading: caratLoading } = useGetCaratTypesQuery();
  
  // For the trend query, we'll use a modified approach similar to our useGoldRateRTK hook
  // since we need to make sure the exports are correctly aligned
  const [trendData, setTrendData] = useState([]);
  const [trendLoading, setTrendLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to fetch trend data
  const fetchTrendData = async () => {
    setTrendLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock trend data based on mockGoldRates from service
      // In a real app, this would come from the API
      const mockTrendData = [
        { rate_date: '2025-05-01', rate_per_gram: 5900.25, carat_id: 1 },
        { rate_date: '2025-05-02', rate_per_gram: 5915.50, carat_id: 1 },
        { rate_date: '2025-05-03', rate_per_gram: 5920.75, carat_id: 1 },
        { rate_date: '2025-05-04', rate_per_gram: 5925.75, carat_id: 1 },
        { rate_date: '2025-05-05', rate_per_gram: 5975.25, carat_id: 1 },
        { rate_date: '2025-05-06', rate_per_gram: 5950.50, carat_id: 1 },
        { rate_date: '2025-05-07', rate_per_gram: 5965.00, carat_id: 1 },
        { rate_date: '2025-05-01', rate_per_gram: 5400.25, carat_id: 2 },
        { rate_date: '2025-05-02', rate_per_gram: 5415.00, carat_id: 2 },
        { rate_date: '2025-05-03', rate_per_gram: 5420.25, carat_id: 2 },
        { rate_date: '2025-05-04', rate_per_gram: 5423.60, carat_id: 2 },
        { rate_date: '2025-05-05', rate_per_gram: 5477.35, carat_id: 2 },
        { rate_date: '2025-05-06', rate_per_gram: 5452.15, carat_id: 2 },
        { rate_date: '2025-05-07', rate_per_gram: 5465.00, carat_id: 2 }
      ];
      
      // Filter by carat ID
      const filteredData = mockTrendData.filter(item => item.carat_id === caratId);
      
      setTrendData(filteredData);
      setTrendLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load trend data');
      setTrendLoading(false);
    }
  };
  
  // Fetch data on component mount and when parameters change
  useEffect(() => {
    fetchTrendData();
  }, [caratId, days]);
  
  // Select the first carat type when loaded if none selected
  useEffect(() => {
    if (caratTypes.length > 0 && !caratId) {
      setCaratId(caratTypes[0].carat_id);
    }
  }, [caratTypes, caratId]);
  
  // Prepare data for chart
  const chartData = trendData.map(item => ({
    date: formatDate(item.rate_date),
    rate: parseFloat(item.rate_per_gram)
  }));
  
  // Calculate min and max for YAxis domain
  const rates = chartData.map(item => item.rate);
  const minRate = rates.length ? Math.floor(Math.min(...rates) * 0.995) : 0;
  const maxRate = rates.length ? Math.ceil(Math.max(...rates) * 1.005) : 0;
  
  // Handle carat type change
  const handleCaratChange = (e) => {
    setCaratId(parseInt(e.target.value));
  };
  
  // Handle date range change
  const handleDaysChange = (e) => {
    setDays(parseInt(e.target.value));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Gold Rate Trends</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          View historical gold rate trends for different carat types
        </p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Carat Type Selection */}
        <div className="w-full md:w-56">
          <div className="flex items-center">
            <Award size={18} className="text-gray-400 mr-2" />
            <select
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              value={caratId}
              onChange={handleCaratChange}
              disabled={caratLoading}
            >
              {caratTypes.map(carat => (
                <option key={carat.carat_id} value={carat.carat_id}>
                  {carat.carat_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Date Range Selection */}
        <div className="w-full md:w-56">
          <div className="flex items-center">
            <Calendar size={18} className="text-gray-400 mr-2" />
            <select
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              value={days}
              onChange={handleDaysChange}
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={180}>Last 6 months</option>
              <option value={365}>Last 1 year</option>
            </select>
          </div>
        </div>
        
        {/* Refresh Button */}
        <button 
          onClick={fetchTrendData}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg border border-primary-600 hover:bg-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-500"
        >
          <RefreshCw size={16} className="mr-2" />
          Refresh Data
        </button>
      </div>
      
      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        {trendLoading ? (
          <div className="flex justify-center items-center h-80">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-80 text-red-500">
            <p>Error loading trend data: {error}</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex justify-center items-center h-80 text-gray-500">
            <p>No trend data available for the selected criteria.</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="date" 
                  angle={-45} 
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[minRate, maxRate]}
                  label={{ 
                    value: 'Rate per gram (₹)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value.toFixed(2)}`, 'Rate per gram']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rate"
                  name={caratTypes.find(c => c.carat_id === caratId)?.carat_name || 'Gold Rate'}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {/* Insights Section */}
      {!trendLoading && !error && chartData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Rate */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Current Rate
              </h3>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ₹{chartData[chartData.length - 1]?.rate.toFixed(2) || 'N/A'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                As of {chartData[chartData.length - 1]?.date || 'N/A'}
              </p>
            </div>
            
            {/* Average Rate */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Average Rate
              </h3>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ₹{(chartData.reduce((sum, item) => sum + item.rate, 0) / chartData.length).toFixed(2) || 'N/A'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Past {days} days
              </p>
            </div>
            
            {/* Rate Change */}
            {chartData.length >= 2 && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Rate Change
                </h3>
                {(() => {
                  const firstRate = chartData[0]?.rate || 0;
                  const lastRate = chartData[chartData.length - 1]?.rate || 0;
                  const change = lastRate - firstRate;
                  const percentChange = (change / firstRate) * 100;
                  const isPositive = change >= 0;
                  
                  return (
                    <>
                      <p className={`text-2xl font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        From {chartData[0]?.date || 'N/A'} to {chartData[chartData.length - 1]?.date || 'N/A'}
                      </p>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoldRateTrends;