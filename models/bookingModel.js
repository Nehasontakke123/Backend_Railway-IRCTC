import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        trainName: { type: String, required: true },
        trainNumber: { type: String, required: true },
        date: { type: String, required: true },
        seatClass: { type: String, required: true },
        passengers: { type: Array, required: true },
    },
    
);

export default mongoose.model("Booking", BookingSchema);
