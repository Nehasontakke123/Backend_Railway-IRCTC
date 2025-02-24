import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    pnr: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    seatClass: { type: String, required: true, default: "Sleeper" },
    createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model("Ticket", TicketSchema);
export default Ticket;
