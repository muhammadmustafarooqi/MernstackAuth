// src/pages/Profile.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/useAuth';
import { FiMail, FiUser, FiCheckCircle, FiSend } from 'react-icons/fi';

const Profile = () => {
  const { user, sendVerifyOtp, verifyEmail } = useAuth();
  const [otp, setOtp] = useState('');

  const handleSendOtp = async () => {
    await sendVerifyOtp();
  };

  const handleVerify = async () => {
    const res = await verifyEmail(otp);
    if (res.success) setOtp('');
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

      <div className="bg-white p-8 rounded-lg shadow max-w-2xl">
        <div className="flex items-center mb-6">
          <FiUser className="text-3xl mr-4 text-blue-600" />
          <div>
            <p className="text-2xl font-bold">{user?.name}</p>
            <p className="text-gray-600 flex items-center">
              <FiMail className="mr-2" /> {user?.email}
            </p>
          </div>
        </div>

        {user?.isAccountVerified ? (
          <p className="text-green-600 flex items-center">
            <FiCheckCircle className="mr-2" /> Account verified
          </p>
        ) : (
          <div className="space-y-4">
            <p className="text-yellow-600">Your account is not yet verified.</p>
            <button
              onClick={handleSendOtp}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <FiSend className="inline mr-2" /> Send OTP
            </button>
            <div className="flex space-x-2">
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                placeholder="Enter OTP"
                className="border px-3 py-2 rounded"
              />
              <button
                onClick={handleVerify}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;