import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";

// Import Routes
import authRoutes from "./routers/authRoutes.js";
import bookingRoutes from "./routers/bookingRoutes.js";
import offlineBookingRoutes from "./routers/offlineBookingRoutes.js";
import emergencyHelpRoutes from "./routers/emergencyHelpRoutes.js";
import ticketRoutes from "./routers/ticketRoutes.js";
import fareRoutes from "./routers/fareRoutes.js"; // ✅ Added Fare Routes

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConnect(process.env.DBURL, process.env.DBNAME)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
// app.use("/api/offline-booking", offlineBookingRoutes);
// app.use("/api/emergency-help", emergencyHelpRoutes);
app.use("/offline-booking", offlineBookingRoutes);
app.use("/emergency-help", emergencyHelpRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/fare", fareRoutes); // ✅ Fare Routes Added

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
