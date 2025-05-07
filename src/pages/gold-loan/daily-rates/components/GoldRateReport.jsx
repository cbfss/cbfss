// src/pages/gold-loan/gold-rate/components/GoldRateReport.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Printer, FileText, RefreshCw } from 'lucide-react';
import { formatDate } from '../../../../utils/dateUtils';

/**
 * Component to generate daily gold rate reports
 */
const GoldRateReport = () => {
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [goldRates, setGoldRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to fetch report data
  const fetchReportData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock report data
      // In a real app, this would come from the API
      const mockReportData = [
        {
          gold_rate_id: 1,
          carat_id: 1,
          carat_name: '24K',
          purity_percentage: 99.9,
          rate_per_gram: 5950.50,
          rate_date: reportDate,
          updated_at: new Date().toISOString()
        },
        {
          gold_rate_id: 2,
          carat_id: 2,
          carat_name: '22K',
          purity_percentage: 91.6,
          rate_per_gram: 5452.15,
          rate_date: reportDate,
          updated_at: new Date().toISOString()
        },
        {
          gold_rate_id: 3,
          carat_id: 3,
          carat_name: '18K',
          purity_percentage: 75.0,
          rate_per_gram: 4462.88,
          rate_date: reportDate,
          updated_at: new Date().toISOString()
        },
        {
          gold_rate_id: 10,
          carat_id: 4,
          carat_name: '14K',
          purity_percentage: 58.5,
          rate_per_gram: 3482.42,
          rate_date: reportDate,
          updated_at: new Date().toISOString()
        }
      ];
      
      setGoldRates(mockReportData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load report data');
      setIsLoading(false);
    }
  };
  
  // Fetch data on component mount and when report date changes
  useEffect(() => {
    fetchReportData();
  }, [reportDate]);
  
  // Handle date change
  const handleDateChange = (e) => {
    setReportDate(e.target.value);
  };
  
  // Handle print button click
  const handlePrint = () => {
    window.print();
  };
  
  // Handle export button click
  const handleExport = () => {
    // In a real app, this would generate a CSV or PDF
    alert('Export functionality would be implemented here');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 print:p-0">
      <div className="mb-6 print:mb-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Daily Gold Rate Report</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          View and export gold rates for all carat types on a specific date
        </p>
      </div>
      
      {/* Controls - hidden when printing */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 print:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Calendar size={18} className="text-gray-400" />
          </div>
          <input
            type="date"
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
            value={reportDate}
            onChange={handleDateChange}
          />
        </div>
        
        <button 
          onClick={fetchReportData}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg border border-primary-600 hover:bg-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-500"
        >
          <RefreshCw size={16} className="mr-2" />
          Generate Report
        </button>
        
        <button 
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <Printer size={16} className="mr-2" />
          Print Report
        </button>
        
        <button 
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <FileText size={16} className="mr-2" />
          Export to CSV
        </button>
      </div>
      
      {/* Report Content */}
      <div className="print:shadow-none shadow-md rounded-lg overflow-hidden">
        {/* Report Header */}
        <div className="bg-gray-50 dark:bg-gray-800 py-4 px-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Gold Rate Report - {formatDate(reportDate)}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Branch: Main Branch (ID: 1)
          </p>
        </div>
        
        {isLoading ? (
          <div className="bg-white dark:bg-gray-900 py-8 px-6 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 py-4 px-6 text-red-700 dark:text-red-300">
            <p>Error: {error}</p>
          </div>
        ) : goldRates.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 py-8 px-6 text-center text-gray-600 dark:text-gray-400">
            <p>No gold rates found for the selected date. Please select a different date or add rates.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="py-3 px-6 font-medium">Carat Type</th>
                  <th className="py-3 px-6 font-medium">Purity (%)</th>
                  <th className="py-3 px-6 font-medium">Rate Per Gram (₹)</th>
                  <th className="py-3 px-6 font-medium">Last Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {goldRates.map((rate) => (
                  <tr key={rate.gold_rate_id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium">{rate.carat_name}</td>
                    <td className="py-4 px-6">{rate.purity_percentage}%</td>
                    <td className="py-4 px-6 font-medium">
                      ₹{parseFloat(rate.rate_per_gram).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                      {new Date(rate.updated_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Report Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 py-3 px-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <p>Report generated on: {new Date().toLocaleString()}</p>
          <p>Authorized by: [Branch Manager]</p>
        </div>
      </div>
      
      {/* Notes */}
      <div className="mt-8 print:mt-4">
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Notes:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>Gold rates are effective for the entire day on the selected date.</li>
          <li>Rates are subject to market fluctuations and may be revised by management.</li>
          <li>For loans against gold, valuation will be calculated based on these rates.</li>
          <li>For any discrepancies, please contact the branch manager.</li>
        </ul>
      </div>
      
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .container, .container * {
            visibility: visible;
          }
          .print\\:hidden {
            display: none !important;
          }
          .container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default GoldRateReport;