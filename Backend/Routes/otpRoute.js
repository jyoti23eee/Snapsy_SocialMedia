import express from "express";
import { sendOtp, verifyOtp } from "../Controllers/otpController.js";

const router = express.Router();

// Route to send OTP
router.post("/send-otp", sendOtp);

// Route to verify OTP
router.post("/verify-otp", verifyOtp);

export default router;
