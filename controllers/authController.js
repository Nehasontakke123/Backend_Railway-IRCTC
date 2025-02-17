// import { registerUser, loginUser } from "../services/authService.js";

// export const register = async (req, res) => {
//     try {
//         const response = await registerUser(req.body.name, req.body.email, req.body.password);
//         res.status(201).json(response);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const response = await loginUser(req.body.email, req.body.password);
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };









// Authentication/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usersModel from "../models/usersModel.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await usersModel.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new usersModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Error Registering User:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.PRIVATEKEY, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        console.error("❌ Error Logging In:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};