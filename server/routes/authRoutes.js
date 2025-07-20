import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  sendResetOtp,
  resetPasswordController,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendDeleteAccountOtp,
  deleteAccountController
} from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRoutes = express.Router();

// ✅ Public routes
authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);
authRoutes.post('/logout', logoutController);
authRoutes.post('/send-reset-otp', sendResetOtp);
authRoutes.post('/reset-password', resetPasswordController);

// ✅ Protected routes (require authentication)
authRoutes.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRoutes.post('/verify-account', userAuth, verifyEmail);
authRoutes.post('/is-auth', userAuth, isAuthenticated);
authRoutes.post('/send-delete-account-otp', userAuth, sendDeleteAccountOtp);
authRoutes.delete('/delete-account', userAuth, deleteAccountController);

export default authRoutes;
