import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';
import { FiUser, FiMenu, FiX, FiHome, FiLogIn, FiUserPlus, FiLogOut, FiSettings } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">MernAuth</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiHome className="mr-2" />
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiSettings className="mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiUser className="mr-2" />
                  Profile
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hi, {user.name}</span>
                  {!user.isAccountVerified && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Unverified
                    </span>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FiUserPlus className="mr-2" />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiHome className="mr-3" />
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiSettings className="mr-3" />
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiUser className="mr-3" />
                  Profile
                </Link>
                <div className="px-3 py-2 text-gray-700">
                  Hi, {user.name}
                  {!user.isAccountVerified && (
                    <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Unverified
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  <FiLogOut className="mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiLogIn className="mr-3" />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiUserPlus className="mr-3" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;