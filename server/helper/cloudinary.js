const cloudinary = require("cloudinary").v2; 
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
////console.log(process.env.CLOUDINARY_API_KEY);
const uploadOnCloudinary = async (localFilePath) => {
  ////console.log("Local file path cloudinary:", localFilePath);
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    ////console.log("file is uploaded on cloudinary ", response);
    //console.log("file is uploaded on cloudinary ", response.secure_url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    fs.unlinkSync(localFilePath); // Remove temporary local file even on error
    return null;
  }
};
//delete

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null; // Handle missing public ID

    const response = await cloudinary.uploader.destroy(publicId);
    //console.log("File deleted from Cloudinary:", response.result); // Log deletion result
    return response;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return null;
  }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
