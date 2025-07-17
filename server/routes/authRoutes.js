import express from 'express';
import { isAuthenticated, loginController, logoutController, registerController, 
        sendResetOtp, sendVerifyOtp, verifyEmail, resetPasswordController,
        deleteAccountController, 
        sendDeleteAccountOtp} from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
const authRoutes = express.Router();

// Register
authRoutes.post('/register', registerController);
// Login
authRoutes.post('/login', loginController);
// Logout
authRoutes.post('/logout', logoutController);
//send verify otp
authRoutes.post('/send-verify-otp', userAuth, sendVerifyOtp);
// Verify Email using OTP
authRoutes.post('/verify-account', userAuth, verifyEmail )
// This function checks if the user is authenticated
authRoutes.post('/is-auth', userAuth, isAuthenticated)
// send reset password otp
authRoutes.post('/send-reset-otp', sendResetOtp);
// Reset Password
authRoutes.post('/reset-password', resetPasswordController);
// send delete account otp
authRoutes.post('/send-delete-account-otp', userAuth, sendDeleteAccountOtp);
// delet account
authRoutes.delete("/delete-account", userAuth, deleteAccountController);


export default authRoutes;


