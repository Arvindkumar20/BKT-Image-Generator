import cloudinary from "../config/cloudinary.js";
import { Image } from "../models/Image.js";
import { generateImage } from "../utils/generateImage.js";

export const createImage = async (req, res) => {
    const { name, prompt } = req.body;

    const generatedImageUrl = await generateImage(prompt);
    if (!generatedImageUrl || generatedImageUrl == "" || generatedImageUrl == null) {
        return res.json({
            message: "image not generated in controller",

        })
    }
    let cloudinaryResponse;
    try {
        cloudinaryResponse = await cloudinary.uploader.upload(generatedImageUrl);

    } catch (error) {
        return res.json({
            message: "image storage problem on cloudinary",
            error: error.message
        })
    }
    if (!cloudinaryResponse || cloudinaryResponse == null || cloudinaryResponse == "") {
        return res.json({
            message: "image storage problem on cloudinary",
        })
    }
    let image;
    try {
        image = await Image.create({
            name, url: cloudinaryResponse.secure_url, prompt
            , publicId: cloudinaryResponse.public_id
        });
    } catch (error) {
        return res.json({
            message: "server error",
            error: error.message
        })
    }

    if (!image || image == "" || image == null) {
        return res.json({
            message: "Image storage problem"
        })
    }

    return res.json({
        message: "Image stored successfully",
        image
    });

}



export const getImages = async (req, res) => {
    try {
        const images = await Image.find({});
        if (!images || images == null || images == "") {
            return res.json({
                message: "images not found"
            })

        }

        return res.json({
            message: "All images fetched successfully",
            images
        });
    } catch (error) {

    }
}


