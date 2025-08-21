import express from "express";
import { createImage, getImages } from "../controllers/imageController.js";
const router = express.Router();

router.post("/store-image", createImage);
router.get("/get-images", getImages);

export const ImageRouter = router;