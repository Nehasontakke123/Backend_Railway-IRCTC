import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  trainName: { type: String, required: true },
  trainNumber: { type: String, required: true },
  passengers: { type: Array, required: true },
  finalFare: { type: Number, required: true },
  status: { type: String, default: "Confirmed" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", BookingSchema);
