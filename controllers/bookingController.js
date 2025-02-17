import { bookTicket, getBookingsByUser } from "../services/bookingService.js";
import bookingModel from "../models/bookingModel.js";

export const bookTicketHandler = async (req, res) => {
    try {
        const response = await bookTicket(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserBookingsHandler = async (req, res) => {
    try {
        const bookings = await getBookingsByUser(req.params);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const {  trainName, trainNumber, date, seatClass, passengers } = req.body;

        const newBooking = new Booking({
            // userId,
            trainName,
            trainNumber,
            date,
            seatClass,
            passengers,
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
