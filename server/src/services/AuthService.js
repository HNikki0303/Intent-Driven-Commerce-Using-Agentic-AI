import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {

    const { name, email, password, role } = userData;

    const allowedRoles = ["buyer", "seller"];

    if (role && !allowedRoles.includes(role)) {
        throw new Error("Invalid role");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "buyer"
    });

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    user.password = undefined;

    return {
        success: true,
        message: "User registered successfully",
        token,
        user
    };
};

export const loginUser = async (userData) => {

    const { email, password } = userData; // no need for name at the time of login

    const user = await User.findOne({ email });
    if (!user) {
    throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
    {
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
    );

    user.password = undefined;

    return {
    success: true,
    message: "Login successful",
    token,
    user
    };

};