import React from 'react';

interface ActivityProps {
  title: string;
  description: string;
  time: string;
  type: string;
}

export const Activity: React.FC<ActivityProps> = ({ title, description, time, type }) => {
  const getTypeStyles = () => {
    switch (type) {
      case "new_member":
        return "bg-green-100 text-green-800";
      case "payment":
        return "bg-blue-100 text-blue-800";
      case "new_tontine":
        return "bg-purple-100 text-purple-800";
      case "distribution":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`flex-shrink-0 rounded-full p-2 ${getTypeStyles()}`}>
        <div className="h-2 w-2 rounded-full" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};
