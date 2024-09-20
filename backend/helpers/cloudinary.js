import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("Local file path is not defined.");
      return { error: true, message: "Local file path not provided" };
    }

    console.log("Uploading file to Cloudinary:", localFilePath);

    if (!fs.existsSync(localFilePath)) {
      console.log("File does not exist:", localFilePath);
      return { error: true, message: "File does not exist" };
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // Safely delete the local file
    return response;

  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Ensure file is deleted in case of failure
    }

    return { error: true, message: error.message };
  }
};

export { uploadOnCloudinary };

