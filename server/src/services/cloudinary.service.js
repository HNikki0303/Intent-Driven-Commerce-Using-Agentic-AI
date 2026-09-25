import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";

export const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "products",
        });

        await fs.unlink(filePath);

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        await fs.unlink(filePath).catch(() => {});
        throw error;
    }
};

export const uploadMultipleImages = async (files) => {
    return Promise.all(files.map(file => uploadImage(file.path)));
};

export const deleteImage = async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
};