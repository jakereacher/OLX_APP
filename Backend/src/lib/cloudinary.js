import { v2 as cloudinary } from 'cloudinary';

import { config } from "dotenv"

config()


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadToCloudinary = async (imgBase64) => {
  const result = await cloudinary.uploader.upload(imgBase64, {
    folder: "products" // all product images go into 'products' folder on Cloudinary (optional)
  });
  return result.secure_url;
};


export default cloudinary;
