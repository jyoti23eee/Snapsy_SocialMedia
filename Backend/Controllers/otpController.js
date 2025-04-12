import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import twilio from "twilio";
import dotenv from "dotenv";
import validator from "validator";

dotenv.config();

// Constants
const OTP_EXPIRY_MINUTES = 5;
const OTP_EXPIRY_MS = OTP_EXPIRY_MINUTES * 60 * 1000;
const OTPStore = new Map(); // In-memory storage for OTPs (replace with Redis in production)

// Initialize Twilio client with error handling
let twilioClient;
try {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
} catch (error) {
  console.error("Twilio initialization failed:", error.message);
  process.exit(1);
}

// Email transporter setup
const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to validate phone numbers
const isValidPhoneNumber = (phone) => {
  return validator.isMobilePhone(phone, 'any', { strictMode: false });
};

// Helper function to validate emails
const isValidEmail = (email) => {
  return validator.isEmail(email);
};

// Generate secure OTP
const generateOTP = () => {
  return otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false
  });
};

// Send OTP Controller
export const sendOtp = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    // Validate input
    if (!emailOrPhone) {
      return res.status(400).json({ 
        success: false,
        message: "Email or phone number is required" 
      });
    }

    // Check if email or phone is valid
    const isEmail = emailOrPhone.includes("@");
    if (isEmail && !isValidEmail(emailOrPhone)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }
    
    if (!isEmail && !isValidPhoneNumber(emailOrPhone)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid phone number format. Include country code (+1 for US)" 
      });
    }

    // Generate and store OTP
    const otp = generateOTP();
    const expiry = Date.now() + OTP_EXPIRY_MS;
    
    // Store OTP (in production, use Redis with TTL)
    OTPStore.set(emailOrPhone, { 
      otp, 
      expiry,
      attempts: 0 // Track verification attempts
    });

    // Send OTP via appropriate channel
    if (isEmail) {
      // Email delivery
      await emailTransporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_USER}>`,
        to: emailOrPhone,
        subject: "Your Verification Code",
        text: `Your verification code is: ${otp}`,
        html: `<p>Your verification code is: <strong>${otp}</strong></p>
               <p>This code will expire in ${OTP_EXPIRY_MINUTES} minutes.</p>`
      });
    } else {
      // SMS delivery
      await twilioClient.messages.create({
        body: `Your verification code is: ${otp}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: emailOrPhone
      });
    }

    return res.status(200).json({ 
      success: true,
      message: `OTP sent successfully to your ${isEmail ? 'email' : 'phone'}`,
      // In production, don't return the OTP in development
      ...(process.env.NODE_ENV === 'development' && { otp }) 
    });

  } catch (error) {
    console.error("OTP send error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to send OTP",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Verify OTP Controller
export const verifyOtp = async (req, res) => {
  try {
    const { emailOrPhone, otp } = req.body;

    // Validate input
    if (!emailOrPhone || !otp) {
      return res.status(400).json({ 
        success: false,
        message: "Email/phone and OTP are required" 
      });
    }

    // Retrieve stored OTP data
    const storedOtpData = OTPStore.get(emailOrPhone);
    
    // Check if OTP exists
    if (!storedOtpData) {
      return res.status(400).json({ 
        success: false,
        message: "No OTP found. Please request a new one." 
      });
    }

    // Check attempts (prevent brute force)
    if (storedOtpData.attempts >= 3) {
      OTPStore.delete(emailOrPhone);
      return res.status(429).json({ 
        success: false,
        message: "Too many attempts. Please request a new OTP." 
      });
    }

    // Check expiry
    if (Date.now() > storedOtpData.expiry) {
      OTPStore.delete(emailOrPhone);
      return res.status(400).json({ 
        success: false,
        message: "OTP expired. Please request a new one." 
      });
    }

    // Verify OTP
    if (storedOtpData.otp !== otp) {
      // Increment attempt counter
      OTPStore.set(emailOrPhone, {
        ...storedOtpData,
        attempts: storedOtpData.attempts + 1
      });
      
      return res.status(400).json({ 
        success: false,
        message: "Invalid OTP",
        attemptsLeft: 3 - (storedOtpData.attempts + 1)
      });
    }

    // Successful verification
    OTPStore.delete(emailOrPhone); // Clear OTP
    
    return res.status(200).json({ 
      success: true,
      message: "OTP verified successfully!",
      token: "your_jwt_token_here" // In a real app, generate and return a JWT
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ 
      success: false,
      message: "OTP verification failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

