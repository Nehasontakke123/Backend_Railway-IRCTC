
import Booking from "../models/bookingModel.js";

import { predictFareLogic } from "../services/fareService.js";

import { analyzeVoiceCommand } from "../services/voiceService.js";

// 🎯 Book Ticket
export const bookTicket = async (req, res) => {
  try {
    const { userId, trainName, trainNumber, passengers, baseFare, demandFactor } = req.body;
    
    if (!userId || !trainName || !trainNumber || !passengers.length) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const finalFare = predictFare(baseFare, demandFactor);
    
    const newBooking = new Booking({ userId, trainName, trainNumber, passengers, finalFare });
    await newBooking.save();

    res.json({ success: true, message: "Ticket booked successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Get Bookings by User
export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId });

    if (!bookings.length) {
      return res.status(404).json({ success: false, message: "No bookings found" });
    }

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Get PNR Status (Fixing the error)
export const getPNRStatus = async (req, res) => {
  try {
    const { pnr } = req.params;
    const booking = await Booking.findOne({ _id: pnr });

    if (!booking) {
      return res.status(404).json({ success: false, message: "PNR not found" });
    }

    res.json({ success: true, pnrStatus: booking.status });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Process Voice Commands
export const processVoiceCommand = async (req, res) => {
  try {
    const { command } = req.body;
    const response = analyzeVoiceCommand(command);
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
