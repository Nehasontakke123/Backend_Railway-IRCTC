import booking from "../models/bookingModel.js";

export const bookTicket = async (bookingData) => {
    const newBooking = new booking(bookingData);
    await newBooking.save();
    return { message: "Ticket booked successfully" };
};

export const getBookingsByUser = async (userId) => {
    return await booking.find({ userId });
};
