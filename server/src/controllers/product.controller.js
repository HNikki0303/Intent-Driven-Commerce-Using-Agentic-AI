import {addProduct } from "../services/product.service.js";
export const createProduct = async (req, res, next) => {
    try {
        console.log("Body:", req.body);
        console.log("Files:", req.files);
        console.log("User:", req.user);

        const product = await addProduct(
            req.body,
            req.files,
            req.user._id
        );

        res.status(201).json({
            success: true,
            product
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};