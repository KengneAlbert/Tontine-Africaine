import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  details?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, details }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
          {icon}
        </div>
        <span className={`text-sm font-medium ${change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1 group-hover:text-amber-600 transition-colors">
        {value}
      </p>
      {details && <p className="text-sm text-gray-500 mt-2">{details}</p>}
    </div>
  );
};
