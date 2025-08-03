// src/pages/Dashboard.jsx
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FiHome, FiUser, FiShield } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard icon={<FiHome />} title="Welcome" value="MERN Auth" />
        <StatCard icon={<FiUser />} title="Account" value="Active" />
        <StatCard icon={<FiShield />} title="Security" value="Verified" />
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
    <div className="p-3 bg-blue-100 rounded-full text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;