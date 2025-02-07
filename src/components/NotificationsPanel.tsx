import React from 'react';
import { X, Bell, Circle } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-100';
      case 'success':
        return 'bg-green-50 border-green-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 max-w-lg bg-white shadow-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-amber-100 text-amber-600 text-xs px-2 py-1 rounded-full">
                {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="w-full mb-4 text-sm text-amber-600 hover:text-amber-700"
            >
              Marquer tout comme lu
            </button>
          )}

          <div className="space-y-3">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${getNotificationStyles(notification.type)} relative`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                {!notification.read && (
                  <Circle className="absolute top-3 right-3 h-2 w-2 fill-amber-500 text-amber-500" />
                )}
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-2 block">
                  {notification.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
