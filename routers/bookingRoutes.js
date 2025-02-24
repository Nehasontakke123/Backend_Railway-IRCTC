import express from "express";
import { bookTicket, getBookingsByUser, getPNRStatus, processVoiceCommand } from "../controllers/bookingController.js";

const bookingRoutes = express.Router();

bookingRoutes.post("/voice-booking", processVoiceCommand);
bookingRoutes.post("/book-ticket", bookTicket);
bookingRoutes.get("/pnr-status/:pnr", getPNRStatus);
bookingRoutes.get("/user/:userId", getBookingsByUser);

export default bookingRoutes;
