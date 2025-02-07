import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Transactions from './pages/Transactions';
import Calendar from './pages/Calendar';
import SettingsPage from './pages/Settings';
import Groups from './pages/Groups';
import GroupDetails from './pages/GroupDetails';
import Communications from './pages/Communications';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path="/dashboard/groups" element={<DashboardLayout><Groups /></DashboardLayout>} />
      <Route path="/dashboard/groups/:id" element={<DashboardLayout><GroupDetails /></DashboardLayout>} />
      <Route path="/dashboard/members" element={<DashboardLayout><Members /></DashboardLayout>} />
      <Route path="/dashboard/transactions" element={<DashboardLayout><Transactions /></DashboardLayout>} />
      <Route path="/dashboard/calendar" element={<DashboardLayout><Calendar /></DashboardLayout>} />
      <Route path="/dashboard/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
      <Route path="/dashboard/communications" element={<DashboardLayout><Communications /></DashboardLayout>} />
    </Routes>
  );
}

export default App;