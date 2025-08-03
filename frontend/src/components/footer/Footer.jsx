// src/components/Footer.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiGithub, FiMail, FiGlobe } from 'react-icons/fi';

const Footer = () => {
  const { pathname } = useLocation();

  // Optional: hide footer on protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">MernAuth</h2>
            <p className="text-sm text-gray-400">
              Secure authentication made simple. Built with MongoDB, Express, React & Node.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
              <li><Link to="/reset-password" className="hover:text-white transition">Reset Password</Link></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
              Connect
            </h3>
            <div className="flex space-x-4 text-lg">
              <a
                href="mailto:support@mernauth.com"
                aria-label="Email"
                className="hover:text-white transition"
              >
                <FiMail />
              </a>
              <a
                href="https://github.com/your-org/mern-auth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-white transition"
              >
                <FiGithub />
              </a>
              <a
                href="https://mernauth.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="hover:text-white transition"
              >
                <FiGlobe />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MernAuth. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;