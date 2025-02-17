import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";

// Import Routes
import authRoutes from "./routers/authRoutes.js";
import bookingRoutes from "./routers/bookingRoutes.js";
import offlineBookingRoutes from "./routers/offlineBookingRoutes.js";
import emergencyHelpRoutes from "./routers/emergencyHelpRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConnect(process.env.DBURL, process.env.DBNAME);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);
app.use("/offline-booking", offlineBookingRoutes);
app.use("/emergency-help", emergencyHelpRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
