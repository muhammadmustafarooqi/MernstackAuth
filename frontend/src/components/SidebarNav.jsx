// src/components/SidebarNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { to: '/profile', label: 'Profile', icon: <FiUser /> },
];

const SidebarNav = () => {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-white shadow p-6 space-y-6">
      <h2 className="text-xl font-bold text-blue-600">MernAuth</h2>

      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === item.to
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
      >
        <FiLogOut />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default SidebarNav;