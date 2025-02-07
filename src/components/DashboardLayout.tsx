import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  PieChart,
  Coins, 
  Calendar,
  Settings, 
  Bell,
  User,
  LogOut,
  Menu,
  X,
  UsersRound,
  Mail
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: "Vue d'ensemble", icon: PieChart, path: '/dashboard' },
    { name: 'Groupes', icon: UsersRound, path: '/dashboard/groups' },
    { name: 'Membres', icon: Users, path: '/dashboard/members' },
    { name: 'Transactions', icon: Coins, path: '/dashboard/transactions' },
    { name: 'Calendrier', icon: Calendar, path: '/dashboard/calendar' },
    { name: 'Communications', icon: Mail, path: '/dashboard/communications' },
    { name: 'Paramètres', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform 
        lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold">Tontine Africaine</span>
          </Link>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-amber-50 text-amber-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-amber-600'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md lg:hidden hover:bg-gray-100"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                {navigation.find(item => item.path === location.pathname)?.name || "Tableau de bord"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-amber-600">
                <Bell className="h-6 w-6" />
              </button>
              <div className="hidden md:flex items-center space-x-2">
                <User className="h-8 w-8 text-gray-400" />
                <span className="text-sm font-medium">Admin</span>
              </div>
              <Link 
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-amber-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline text-sm">Déconnexion</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}