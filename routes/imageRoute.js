import express from "express";
import { createImage } from "../controllers/imageController.js";
const router = express.Router();

router.post("/store-image", createImage);

export const ImageRouter = router;