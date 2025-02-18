import EmergencyHelp from "../models/emergencyHelpModel.js";
// import { sendSMS } from "../services/twilioService.js";

//  Send Emergency Alert
export const sendEmergencyAlert = async (req, res) => {
    try {
        console.log("📌 Received Emergency Request:", req.body);

        const { name, age, mobile, location, message, category } = req.body;
        
        // 🛑 Validate Required Fields
        if (!name || !age || !mobile || !location || !message || !category) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        //  Create New Emergency Request
        const newRequest = new EmergencyHelp({ name, age, mobile, location, message, category });

        //  Save Data to MongoDB
        await newRequest.save();

        console.log("✅ Emergency Request Saved!", newRequest);
        res.status(201).json({ message: "Emergency request sent successfully", data: newRequest });
    } catch (error) {
        console.error("❌ Error Saving Emergency Request:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//  Fetch All Emergency Requests
export const getAllEmergencyRequests = async (req, res) => {
    try {
        const requests = await EmergencyHelp.find().sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        console.error("❌ Error Fetching Emergency Requests:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};






//  Update Emergency Status
export const updateEmergencyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // 🛑 Validate Status
        if (!["pending", "in-progress", "resolved"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value. Allowed: pending, in-progress, resolved" });
        }

        const request = await EmergencyHelp.findById(id);
        if (!request) {
            return res.status(404).json({ error: "Emergency request not found" });
        }

        if (request.status === status) {
            return res.status(200).json({ message: `Status is already '${status}'` });
        }

        request.status = status;
        await request.save();

        console.log(`✅ Status Updated: ${request.status}`);
        res.status(200).json({ message: "Status updated successfully", status: request.status });
    } catch (error) {
        console.error("❌ Error Updating Status:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//  Get Emergency Status
export const getEmergencyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await EmergencyHelp.findById(id);
        if (!request) {
            return res.status(404).json({ error: "Emergency request not found" });
        }

        res.status(200).json({ message: "Status fetched successfully", status: request.status });
    } catch (error) {
        console.error("❌ Error Fetching Emergency Status:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
