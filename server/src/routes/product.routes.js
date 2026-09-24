import express from "express";
import upload from "../middlewares/multer.middleware.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("seller"),
    upload.array("images", 5),
    createProduct
);

export default router;