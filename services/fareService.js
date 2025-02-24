import Fare from "../models/fareModel.js";

// 🎯 AI-based Fare Prediction
export const predictFareLogic = async (source, destination, date) => {
  try {
    if (!source || !destination || !date) {
      throw new Error("Missing required fields: source, destination, or date");
    }

    console.log(`Predicting fare for ${source} -> ${destination} on ${date}`);

    // Dummy AI Model Calculation (Replace with ML Model)
    const baseFare = 500;
    const demandFactor = 1.5;
    const randomFactor = Math.random() * 500;
    
    const predictedFare = baseFare * demandFactor + randomFactor;
    return Math.round(predictedFare);
  } catch (error) {
    console.error("Error in fare prediction:", error.message);
    throw error;
  }
};

// 🎯 Store Fare Data in DB
export const saveFareData = async (trainNumber, baseFare, demandFactor) => {
  try {
    if (!trainNumber || !baseFare || !demandFactor) {
      throw new Error("Missing required fields: trainNumber, baseFare, or demandFactor");
    }

    const finalFare = baseFare * demandFactor;
    const newFare = new Fare({ trainNumber, baseFare, demandFactor, finalFare });
    return await newFare.save();
  } catch (error) {
    console.error("Error saving fare data:", error.message);
    throw error;
  }
};
