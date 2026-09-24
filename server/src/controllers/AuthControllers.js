import { registerUser } from "../services/AuthService.js";
import { loginUser } from "../services/AuthService.js";

export const register = async (req, res) => {
    try {
        const result = await registerUser(req.body);

        res.status(201).json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {

    try {

        const result = await loginUser(req.body);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });

};