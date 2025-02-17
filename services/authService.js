import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usersModel.js"

export const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return { message: "User registered successfully" };
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // ✅ Token Generate करा
    const token = jwt.sign({ id: user._id }, process.env.PRIVATEKEY, { expiresIn: "1h" });

    // ✅ Token User Database मध्ये store करा
    user.tokens.push({ token });
    await user.save();

    return { token, user };
};
