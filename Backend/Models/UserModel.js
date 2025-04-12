import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    emailOrPhone: {
      type: String,
      required: true,
      unique: true, // Ensuring uniqueness for login
    },
    password: {
      type: String,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true, // Ensure DOB is provided
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    livesIn: {
      type: String,
      default: "",
    },
    worksAt: {
      type: String,
      default: "",
    },
    relationship: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    otp: {
      type: String, // Stores the OTP code
      default: null,
    },
    otpExpires: {
      type: Date, // Expiration time for OTP
      default: null,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
