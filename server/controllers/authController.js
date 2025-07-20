import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

// Controller functions for user authentication

// This function handle user registration
const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Send welcome email
    // await sendEmail(
    //   newUser.email,
    //   "Welcome to Mernstack Auth 🎉",
    //   `<p>Hi ${newUser.name},<br>Your account has been created successfully. Welcome aboard!</p>`
    // );

   
    // Send response (No password in response!)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// This function handles user login
const loginController = async (req, res) => {
  // Login logic here
  const { email, password } = req.body;
  // checking if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    console.log("User found:", user);

    // checking if user e xists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }
    // checking if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }
    // creating jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

      // Step 5: Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Step 6: Send clean response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isAccountVerified,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// This function handles user logout
// send password reset otp
const logoutController = (req, res) => {
  // Logout logic here
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

// This function sends a reset OTP to the user's email
const sendResetOtp = async (req, res) => {

  const { email } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP and expiration time in user document
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

   // Send OTP via email
    await sendEmail(
      user.email,
      "Password Reset Request",
      `<p>Hi ${user.name},</p>
       <p>Your password reset OTP is: <b>${otp}</b>. It is valid for 10 minutes.</p>
       <p>If you did not request this, please ignore this email.</p>`
    );
    // Send success response
    return res.status(200).json({
      success: true,
      message: "Reset OTP sent successfully",
    });

  } catch (error) {
    console.error("Error sending reset OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send reset OTP",
    });
  }
};

// reset password controller
const resetPasswordController = async (req, res) => {

  const { email, otp, newPassword } = req.body;

  // Validate email, otp, and newPassword
  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

       // Step 3: Validate OTP
    if (user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // if otp is expired
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0; // Clear OTP and expiration time
    await user.save();

    // Send confirmation email
    await sendEmail(
      user.email,
      "Password Changed Successfully",
      `<p>Hi ${user.name},</p>
       <p>Your password has been changed successfully. If this wasn't you, please contact support immediately.</p>`
    );

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "Password reset failed",
    });
  }
};

// This function sends a verification OTP to the user's email
const sendVerifyOtp = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Your account is already verified",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    await sendEmail(
      user.email,
      "Verify Your Account",
      `<p>Hi ${user.name},</p>
       <p>Your account verification OTP is: <b>${otp}</b>. It is valid for 10 minutes.</p>
       <p>If you did not request this, please ignore it.</p>`
    );

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent to your email",
    });
  } catch (error) {
    console.error("Send Verify OTP Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send verification OTP. Please try again later.",
    });
  }
};

// This function verifies the user's email using the OTP
const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  // Step 1: Validate input
  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "User ID and OTP are required",
    });
  }

  try {
    // Step 2: Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Step 3: Check OTP validity
    if (user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Step 4: Mark user as verified
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    // Optional: Confirmation email
    await sendEmail(
      user.email,
      "Your Account Has Been Verified ✅",
      `<p>Hi ${user.name},</p><p>Your account has been verified successfully. You can now access all features.</p>`
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify Email Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to verify email. Please try again later.",
    });
  }
};


// This function checks if the user is authenticated
const isAuthenticated = (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User is authenticated",
      userId,
    });
  } catch (error) {
    console.error("isAuthenticated Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Authentication check failed",
    });
  }
};


// Send OTP for account deletion
const sendDeleteAccountOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Use verifyOtp fields for deletion
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // valid 10 min
    await user.save();

    // Send OTP via email
    const subject = "Delete Account OTP";
    const html = `<p>Your OTP to delete your account is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;

    await sendEmail(user.email, subject, html);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("Error sending delete account OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send delete account OTP",
    });
  }
};

// DELETE ACCOUNT CONTROLLER
const deleteAccountController = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //     if (user.verifyOtp !== otp || user.verifyOtpExpireAt < Date.now()) {
    //       return res.status(400).json({
    //         success: false,
    //         message: "Invalid or expired OTP",
    //       });
    //     }

    //     await User.findByIdAndDelete(userId);
    //     res.clearCookie("token");

    //     return res.status(200).json({
    //       success: true,
    //       message: "User account deleted successfully",
    //     });
    //   } catch (error) {
    //     console.error("Error deleting account:", error);
    //     return res.status(500).json({
    //       success: false,
    //       message: "Failed to delete account",
    //     });
    //   }
    // };
    const isOtpExpired = user.resetOtpExpireAt < Date.now();
    const isOtpMatched = user.resetOtp === otp;

    if (!isOtpMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (isOtpExpired) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    await User.deleteOne({ _id: user._id });

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
};

// Exporting the controller functions
export {
  registerController,
  loginController,
  logoutController,
  sendResetOtp,
  resetPasswordController,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendDeleteAccountOtp,
  deleteAccountController,
};
