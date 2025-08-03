import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';
import { FiArrowRight, FiShield, FiMail, FiUsers, FiLock } from 'react-icons/fi';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure Authentication
            <span className="text-blue-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A complete MERN stack authentication system with email verification, 
            password recovery, and secure user management.
          </p>
          
          {user ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                Welcome back, <span className="font-semibold text-blue-600">{user.name}</span>!
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/profile"
                  className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Authentication Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with modern security practices and user experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-blue-50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Authentication</h3>
              <p className="text-gray-600 text-sm">
                JWT-based authentication with secure cookie storage
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-green-50">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-green-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Verification</h3>
              <p className="text-gray-600 text-sm">
                OTP-based email verification for account security
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-purple-50">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiLock className="text-purple-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Password Recovery</h3>
              <p className="text-gray-600 text-sm">
                Secure password reset with email OTP verification
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-orange-50">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-orange-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600 text-sm">
                Complete user profile and account management system
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our secure authentication system
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      )}
    </div>

  );
};

export default Home;