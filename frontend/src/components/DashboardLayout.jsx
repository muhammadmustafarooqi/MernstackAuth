// src/components/DashboardLayout.jsx
import React from 'react';
import SidebarNav from './SidebarNav';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <SidebarNav />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default DashboardLayout;