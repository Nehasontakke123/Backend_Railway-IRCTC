// import mongoose from "mongoose";

// const BookingSchema = new mongoose.Schema(
//     {
//         // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//         trainName: { type: String, required: true },
//         trainNumber: { type: String, required: true },
//         date: { type: String, required: true },
//         seatClass: { type: String, required: true },
//         passengers: { type: Array, required: true },
//     },
    
// );

// export default mongoose.model("Booking", BookingSchema);






// import mongoose from "mongoose";

// const BookingSchema = new mongoose.Schema(
//     {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Linking booking to user
//         from: { type: String, required: true },
//         to: { type: String, required: true },
//         date: { type: String, required: true },
//         seatClass: { type: String, required: true },
//         quota: { type: String, required: true }, // GENERAL, TATKAL, etc.
//         disabilityConcession: { type: Boolean, default: false },
//         flexibleDate: { type: Boolean, default: false },
//         availableBerth: { type: Boolean, default: false },
//         railwayPass: { type: Boolean, default: false },
//     },
//     { timestamps: true }
// );

// export default mongoose.model("Booking", BookingSchema);







import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        trainName: { type: String, required: true }, // ✅ Add this
        trainNumber: { type: String, required: true }, // ✅ Add this
        from: { type: String, required: true },
        to: { type: String, required: true },
        date: { type: String, required: true },
        seatClass: { type: String, required: true },
        quota: { type: String, required: false }, // Optional
        disabilityConcession: { type: Boolean, default: false },
        flexibleDate: { type: Boolean, default: false },
        availableBerth: { type: Boolean, default: false },
        railwayPass: { type: Boolean, default: false },
        passengers: [
            {
                name: { type: String, required: true },
                age: { type: Number, required: true },
                gender: { type: String, required: true },
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
