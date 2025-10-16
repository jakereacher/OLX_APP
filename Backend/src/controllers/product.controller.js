import Product from "../models/product.model.js";
import STATUS_CODES from "../lib/statusCodes.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";

export const createProduct = async (req, res) => {
    const { title, description, price, images, category } = req.body;
    try {
        // Basic field validation
        if (!title || !description || !price || !images || !category)
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "All fields are required" });

        if (!Array.isArray(images) || images.length < 2 || images.length > 4)
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Provide 2 to 4 images" });

        // Upload each image to Cloudinary
        const uploadedImages = [];
        for (const img of images) {
            const url = await uploadToCloudinary(img); // img is base64
            uploadedImages.push(url);
        }

        const product = new Product({
            title,
            description,
            price,
            images: uploadedImages,
            category,
            postedBy: req.user._id
        });

        await product.save();
        res.status(STATUS_CODES.CREATED).json(product);

    } catch (error) {
        console.log("Create product error " + error.message);
         console.log("Create product error", error)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
};

export const getMyProducts = async (req, res) => {
  try {
    const myAds = await Product.find({ postedBy: req.user._id });
    res.status(STATUS_CODES.OK).json(myAds);
  } catch (error) {
    console.log("Error in getMyProducts:", error.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};