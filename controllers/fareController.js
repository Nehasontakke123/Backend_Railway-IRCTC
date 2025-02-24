import Fare from "../models/fareModel.js";

export const predictFareController = async (req, res) => {
  try {
    const { source, destination, date } = req.query;
    if (!source || !destination || !date) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const baseFare = 500;
    const demandFactor = 1.5 + Math.random(); // Dynamic pricing
    const predictedFare = baseFare * demandFactor;
    res.json({ success: true, predictedFare: Math.round(predictedFare) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveFareController = async (req, res) => {
  try {
    const { trainNumber, baseFare, demandFactor } = req.body;
    if (!trainNumber || !baseFare || !demandFactor) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const finalFare = baseFare * demandFactor;
    const newFare = new Fare({ trainNumber, baseFare, demandFactor, finalFare });
    await newFare.save();
    res.json({ success: true, message: "Fare data saved successfully", fare: newFare });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
