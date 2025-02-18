// import express from "express";
// import { bookTicketHandler, getUserBookingsHandler } from "../controllers/bookingController.js";

// const bookingRoutes = express.Router();

// bookingRoutes.post("/book", bookTicketHandler);
// bookingRoutes.get("/my-bookings/:userId", getUserBookingsHandler);

// export default bookingRoutes;






import express from "express";
import { bookTicketHandler, getUserBookingsHandler } from "../controllers/bookingController.js";

const bookingRoutes = express.Router();

bookingRoutes.post("/book", bookTicketHandler);
bookingRoutes.get("/my-bookings/:userId", getUserBookingsHandler);

export default bookingRoutes;
