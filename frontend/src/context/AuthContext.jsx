import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.post('/api/user/data');
      if (response.data.success) {
        setUser(response.data.userData);
      }
    } catch (error) {
    console.log('Not authenticated' , error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        // Get user data after login
        const userData = await axios.get('/api/user/data');
        setUser(userData.data.userData);
        toast.success('Login successful!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        // Get user data after registration
        const userData = await axios.get('/api/user/data');
        setUser(userData.data.userData);
        toast.success('Registration successful!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      toast.success('Logged out successfully!');
    } catch (error) {
        console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };

  const sendResetOtp = async (email) => {
    try {
      const response = await axios.post('/api/auth/send-reset-otp', { email });
      if (response.data.success) {
        toast.success('Reset OTP sent to your email');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send OTP';
      toast.error(message);
      return { success: false, message };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await axios.post('/api/auth/reset-password', {
        email,
        otp,
        newPassword
      });

      if (response.data.success) {
        toast.success('Password reset successful!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const sendVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/auth/send-verify-otp', {
        userId: user?.id
      });

      if (response.data.success) {
        toast.success('Verification OTP sent to your email');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send verification OTP';
      toast.error(message);
      return { success: false, message };
    }
  };

  const verifyEmail = async (otp) => {
    try {
      const response = await axios.post('/api/auth/verify-account', {
        userId: user?.id,
        otp
      });

      if (response.data.success) {
        // Update user verification status
        setUser(prev => ({ ...prev, isAccountVerified: true }));
        toast.success('Email verified successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Email verification failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const sendDeleteAccountOtp = async () => {
    try {
      const response = await axios.post('/api/auth/send-delete-account-otp', {
        email: user?.email
      });

      if (response.data.success) {
        toast.success('Delete account OTP sent to your email');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send delete account OTP';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteAccount = async (otp) => {
    try {
      const response = await axios.delete('/api/auth/delete-account', {
        data: {
          email: user?.email,
          otp
        }
      });

      if (response.data.success) {
        setUser(null);
        toast.success('Account deleted successfully');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Account deletion failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    sendResetOtp,
    resetPassword,
    sendVerifyOtp,
    verifyEmail,
    sendDeleteAccountOtp,
    deleteAccount,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};