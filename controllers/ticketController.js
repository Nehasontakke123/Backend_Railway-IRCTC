import Ticket from "../models/Ticket.js";
import { processVoiceCommand } from "../services/voiceService.js";

// 🎙 Voice Ticket Booking API
export const bookTicketByVoice = async (req, res) => {
    try {
        const { voiceText, userId } = req.body;
        if (!voiceText || !userId) {
            return res.status(400).json({ success: false, message: "Missing voice input or userId" });
        }

        // AI Service (Extract Source, Destination, Date)
        const { source, destination, date } = processVoiceCommand(voiceText);

        // Generate Unique PNR
        const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();

        // Create Ticket
        const newTicket = await Ticket.create({ pnr, userId, source, destination, date });

        res.json({ success: true, message: "Ticket booked!", ticket: newTicket });
    } catch (error) {
        console.error("❌ Booking Error:", error);
        res.status(500).json({ success: false, message: "Error booking ticket", error });
    }
};

// 🚆 PNR Status Check API
export const getPNRStatus = async (req, res) => {
    try {
        const { pnr } = req.params;
        console.log("🔎 Searching for PNR:", pnr);

        const ticket = await Ticket.findOne({ pnr });

        if (!ticket) {
            return res.status(404).json({ success: false, message: "PNR not found" });
        }

        res.json({ 
            success: true, 
            pnr: ticket.pnr, 
            source: ticket.source, 
            destination: ticket.destination, 
            date: ticket.date, 
            seatClass: ticket.seatClass 
        });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ success: false, message: "Error fetching PNR status", error });
    }
};
