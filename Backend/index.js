import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());


  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,       // Legacy (safe to keep for now)
        useUnifiedTopology: true,    // Legacy (safe to keep for now)
        serverSelectionTimeoutMS: 5000,
      });
      
      console.log(`✅ MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
      console.log(`   Database: ${conn.connection.name}`);
    } catch (error) {
      console.error('❌ Connection Error:', error.message);
      process.exit(1);
    }
  };
  
  // Event listeners
  mongoose.connection.on('connecting', () => 
    console.log('🔌 Connecting to local MongoDB...'));
  
  mongoose.connection.on('disconnected', () => 
    console.log('⚠️  Disconnected from MongoDB!'));
// Serve static images
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Import Routes
import authRoutes from "./Routes/authRoute.js";
import userRoutes from "./Routes/userRoute.js";
import postRoutes from "./Routes/postRoute.js";
import uploadRoutes from "./Routes/uploadRoute.js";
import chatRoutes from "./Routes/chatRoute.js";
import messageRoutes from "./Routes/messageRoute.js";
import otpRoutes from "./Routes/otpRoute.js";
// Use Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/upload", uploadRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/otp",otpRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
