import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AlertItemProps {
  message: string;
  type: string;
}

export const AlertItem: React.FC<AlertItemProps> = ({ message, type }) => {
  const getAlertStyles = () => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-50 text-red-800 border-red-200";
      case "info":
        return "bg-blue-50 text-blue-800 border-blue-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg border ${getAlertStyles()}`}>
      <AlertCircle className="h-5 w-5" />
      <p className="text-sm">{message}</p>
    </div>
  );
};
