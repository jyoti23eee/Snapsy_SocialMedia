import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UserIcon from "../Photos/user-solid.svg";
import EmailIcon from "../Photos/email-solid.svg";
import PasswordIcon from "../Photos/lock-solid.svg";
import CalendarIcon from "../Photos/calendar-solid.svg";
import BackgroundImage from "../Photos/background.jpg";
import Logo from "../Photos/logo.png";
import { Link } from 'react-router-dom';
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [timer, setTimer] = useState(60);
  const [userName, setUserName] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpExpired(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
      return false;
    }
    setPasswordError("");
    setIsPasswordValid(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const sendOtp = () => {
    if (!emailOrMobile) {
      alert("Please enter your Email or Mobile Number to receive OTP.");
      return;
    }
    setOtpRequested(true);
    setOtpSent(true);
    setTimer(60);
    setOtpExpired(false);
  };
  const verifyOtp = () => {
    if (otpExpired) {
      alert("OTP has expired! Please request a new one.");
      return;
    }
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    setOtpSent(false);
    setOtpRequested(false);
    setTimer(0);
    alert("OTP verified successfully!");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName || !emailOrMobile || !dob || !password || !confirmPassword) {
      alert("All fields are required. Please fill in all details.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please enter again.");
      return;
    }

    alert("Registration Successful!");
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <img src={Logo} alt="Logo" className="w-13 h-10" />
        <h1 className="font-bold text-6xl text-blue-700">SnapSy</h1>
      </div>

      <div className="flex flex-col justify-center items-center shadow-2xl rounded-xl bg-opacity-90 p-6 w-full md:w-1/2">
        <div className="w-full md:w-3/4">
          <h1 className="text-center font-semibold text-2xl text-gray-700 mb-4">
            Create an Account
          </h1>

          <div className="flex flex-col items-center mb-4">
            <label htmlFor="profileImage" className="cursor-pointer">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                  Upload
                </div>
              )}
            </label>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <form className="flex flex-col space-y-4 px-4">
            <div className="flex items-center border p-2 rounded-md bg-gray-100">
              <img src={UserIcon} alt="User" className="w-5 h-5 mx-3" />
              <input
                type="text"
                className="bg-transparent w-full outline-none"
                placeholder="User Name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="flex items-center border p-2 rounded-md bg-gray-100">
              <img src={EmailIcon} alt="Email" className="w-5 h-5 mx-3" />
              <input
                type="text"
                className="bg-transparent w-full outline-none"
                placeholder="Email or Mobile Number"
                required
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
              />
              <button
                type="button"
                className="bg-gray-500 text-white px-2 py-1 text-sm rounded-md hover:bg-gray-600 transition ml-2"
                onClick={sendOtp}
                disabled={otpSent && timer > 0}
              >
                {otpSent && timer > 0 ? `Resend OTP in ${timer}s` : "Get OTP"}
              </button>
            </div>

            {otpRequested && (
              <div className="flex items-center border p-2 rounded-md bg-gray-100">
                <input
                  type="text"
                  className="bg-transparent w-full outline-none"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 bg-blue-500 text-white px-1  rounded-md hover:bg-blue-600 transition"
                  onClick={verifyOtp}
                  disabled={otpExpired}
                >
                  Verify OTP
                </button>
              </div>
            )}

            <div className="flex items-center border p-2 rounded-md bg-gray-100">
              <img src={CalendarIcon} alt="DOB" className="w-5 h-5 mx-3" />
              <input
                type="date"
                className="bg-transparent w-full outline-none text-gray-600"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="flex items-center border p-2 rounded-md bg-gray-100 relative">
              <img src={PasswordIcon} alt="Password" className="w-5 h-5 mx-3" />
              <input
                type={showPassword ? "text" : "password"}
                className="bg-transparent w-full outline-none"
                placeholder="User Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex items-center border p-2 rounded-md bg-gray-100 relative">
              <img src={PasswordIcon} alt="Confirm Password" className="w-5 h-5 mx-3" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="bg-transparent w-full outline-none"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="absolute right-3 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center text-gray-600">
            <p className="text-lg">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline cursor-pointer">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
