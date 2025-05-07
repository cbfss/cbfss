import React from 'react';
import StatCard from './components/StatCard';

const DashboardPage = ({ stats }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600">Master Data Management Overview</p>
      </div>
      
      {/* Dashboard stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.count}
            label={stat.label}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
      
      {/* Additional dashboard content */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-center py-6">
            No recent activity to display
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;