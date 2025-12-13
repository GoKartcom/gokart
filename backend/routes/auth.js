import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import { User } from '../models/User.js';

const router = express.Router();

// Initialize clients
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'klickit-secret-key-2024';

// Initialize Twilio Verify client
let twilioClient = null;
  console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  console.log('✓ Twilio Verify initialized');
} else {
  console.warn('⚠ Twilio credentials missing. SMS will not work.');
}

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email,
      phone: user.phone,
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// ==================== GOOGLE AUTH ====================
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        picture,
        googleId,
        authMethod: 'google',
        isVerified: true
      });
      await user.save();
    }

    const authToken = generateToken(user);

    res.json({
      success: true,
      token: authToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({
      success: false,
      message: 'Failed to verify Google token'
    });
  }
});

// ==================== SEND OTP ====================
router.post('/phone/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    if (!twilioClient) {
      return res.status(500).json({
        success: false,
        message: 'SMS service not configured'
      });
    }

    // Send OTP via Twilio Verify
    await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phone,
        channel: 'sms'
      });

    res.json({
      success: true,
      message: 'OTP sent successfully to your phone'
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send OTP'
    });
  }
});

// ==================== VERIFY OTP ====================
router.post('/phone/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone and OTP are required'
      });
    }

    if (!twilioClient) {
      return res.status(500).json({
        success: false,
        message: 'SMS service not configured'
      });
    }

    // Verify OTP with Twilio
    const verificationCheck = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phone,
        code: otp
      });

    if (verificationCheck.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Find or create user
    let user = await User.findOne({ phone });
    const isNewUser = !user;

    if (!user) {
      user = new User({
        phone,
        name: '', // Empty for new users
        authMethod: 'phone',
        isVerified: true
      });
      await user.save();
    }

    // Generate token only if user has name
    const authToken = user.name ? generateToken(user) : null;

    res.json({
      success: true,
      isNewUser,
      token: authToken,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify OTP'
    });
  }
});

// ==================== SAVE NAME (NEW USER) ====================
router.post('/phone/save-name', async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        message: 'User ID and name are required'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, updatedAt: Date.now() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const authToken = generateToken(user);

    res.json({
      success: true,
      token: authToken,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Save name error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save name'
    });
  }
});

export default router;