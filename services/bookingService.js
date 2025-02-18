// import booking from "../models/bookingModel.js";

// export const bookTicket = async (bookingData) => {
//     const newBooking = new booking(bookingData);
//     await newBooking.save();
//     return { message: "Ticket booked successfully" };
// };

// export const getBookingsByUser = async (userId) => {
//     return await booking.find({ userId });
// };





// import Booking from "../models/bookingModel.js";

// export const bookTicket = async (bookingData) => {
//     const newBooking = new Booking(bookingData);
//     await newBooking.save();
//     return { message: "Ticket booked successfully", booking: newBooking };
// };

// export const getBookingsByUser = async (userId) => {
//     return await Booking.find({ userId });
// };






import Booking from "../models/bookingModel.js";

export const bookTicket = async (bookingData) => {
    try {
        if (!bookingData.userId) throw new Error("User ID is required");
        if (!bookingData.trainName || !bookingData.trainNumber) throw new Error("Train details missing");
        if (!bookingData.passengers || bookingData.passengers.length === 0) throw new Error("At least one passenger is required");

        const newBooking = new Booking(bookingData);
        await newBooking.save();
        return { message: "Ticket booked successfully", booking: newBooking };
    } catch (error) {
        throw new Error(error.message);
    }
};

// ✅ Make sure `getBookingsByUser` is properly exported
export const getBookingsByUser = async (userId) => {
    return await Booking.find({ userId });
};

