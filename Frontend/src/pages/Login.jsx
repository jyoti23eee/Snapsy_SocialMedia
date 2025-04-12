import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaFacebook } from "react-icons/fa"; // Facebook icon
import axios from "axios";
import { Link } from 'react-router-dom';
import UserIcon from "../Photos/user-solid.svg";
import PasswordIcon from "../Photos/lock-solid.svg";
import BackgroundImage from "../Photos/background.jpg"; // Background image
import Logo from "../Photos/logo.png"; // Logo image
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  // Handle sending OTP
  const sendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", { emailOrPhone });
      setOtpSent(true);
      setMessage("OTP sent successfully! Check your email.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP.");
    }
  };

  // Handle OTP Verification
  const verifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { emailOrPhone, otp });
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying OTP.");
    }
  };

  // Handle normal login with password
  const loginWithPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { emailOrPhone, password });
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in.");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      
      <div className="absolute top-12 flex items-center space-x-3">
        <img src={Logo} alt="Logo" className="w-14 h-14" />
        <h1 className="font-bold text-7xl text-blue-700 shadow-2lg">SnapSy</h1>
      </div>

      
      <div className="flex flex-col justify-center items-center shadow-2xl rounded-2xl bg-opacity-95 p-8 w-full md:w-1/2 mt-32">
        <div className="w-full">
          <h2 className="text-center text-3xl font-semibold text-gray-700 mb-4">
            Login 
          </h2>

          <form className="flex flex-col space-y-4">
           
            <div className="flex items-center border p-3 rounded-md bg-gray-100">
              <img src={UserIcon} alt="User" className="w-5 h-5 mx-3" />
              <input
                type="text"
                className="bg-transparent w-full outline-none"
                placeholder="Enter Email or Phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
            </div>

          
            {!otpSent && (
              <div className="flex items-center border p-3 rounded-md bg-gray-100 relative">
                <img src={PasswordIcon} alt="Password" className="w-5 h-5 mx-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-transparent w-full outline-none"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            )}

           
            {otpSent && (
              <div className="flex items-center border p-3 rounded-md bg-gray-100">
                <img src={OTPIcon} alt="OTP" className="w-5 h-5 mx-3" />
                <input
                  type="text"
                  className="bg-transparent w-full outline-none"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}

         
            {!otpSent ? (
              <>
                <button
                  type="button"
                  onClick={loginWithPassword}
                  className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition text-lg font-medium"
                >
                  Continue with Password
                </button>
                <button
                  type="button"
                  onClick={sendOTP}
                  className="bg-gray-600 text-white py-3 rounded-md hover:bg-gray-700 transition text-lg font-medium"
                >
                  Get OTP
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={verifyOTP}
                className="bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition text-lg font-medium"
              >
                Verify OTP
              </button>
            )}
          </form>
          <div className="">
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
         
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-lg font-medium">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

       
          <button className="flex items-center justify-center w-full border border-gray-300 py-3 rounded-full hover:bg-blue-100 transition bg-blue-200 mt-2 text-gray-700">
            <FcGoogle className="text-2xl mr-3" />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>

     
          <button className="flex items-center justify-center w-full border border-gray-300 py-3 rounded-full hover:bg-blue-100 transition bg-blue-200 mt-2 text-gray-700">
            <FaFacebook className="text-2xl mr-3 text-blue-600" />
            <span className="font-medium">Continue with Facebook</span>
          </button>

    
          {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;



