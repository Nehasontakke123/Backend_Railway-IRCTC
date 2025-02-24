import express from "express";
import { bookTicketByVoice, getPNRStatus } from "../controllers/ticketController.js";

const ticketRoutes = express.Router();

ticketRoutes.post("/book-ticket/voice", bookTicketByVoice);  // 🎙 Voice Booking API
ticketRoutes.get("/pnr-status/:pnr", getPNRStatus);  // 🚆 PNR Status API

export default ticketRoutes;
