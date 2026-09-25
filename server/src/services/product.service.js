import Product from "../models/Product.js";
import { uploadMultipleImages } from "./cloudinary.service.js";
import { enrichCatalog } from "../ai/agents/catalogEnrichment.agent.js";

export const addProduct = async (productData, files, sellerId) => {

    console.log("Reached addProduct");

    const uploadedImages = await uploadMultipleImages(files);

    console.log("Images uploaded");

    const imageUrls = uploadedImages.map(img => img.url);

    console.log(imageUrls);
    

    console.log("Calling enrichCatalog...");


    let aiMetadata = {};

    try {
    aiMetadata = await enrichCatalog({
        name: productData.name,
        description: productData.description,
        category: productData.category,
        attributes: productData.attributes,
        imageUrls,
    });

    console.log("AI Metadata:", aiMetadata);

    } catch (err) {
        console.error(err);
        console.error(err.message);
        console.error(err.stack);
    }

    const product = await Product.create({
        ...productData,
        ...aiMetadata,
        seller: sellerId,
        images: uploadedImages,
    });

    return product;
};