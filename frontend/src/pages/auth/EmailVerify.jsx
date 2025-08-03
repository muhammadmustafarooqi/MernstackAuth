// src/pages/auth/EmailVerify.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

const EmailVerify = () => {
  useEffect(() => {
    document.title = 'Verify Email – MernAuth';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <FiMail className="mx-auto h-12 w-12 text-blue-600" />
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
          Check your email
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We’ve sent a 6-digit OTP to your inbox. Please verify to continue.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default EmailVerify;