import { Image } from "../models/Image.js";

export const createImage = async (req, res) => {
    const { name, prompt, url } = req.body;

    let image;
    try {
        image = await Image.create({
            name, url, prompt
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


