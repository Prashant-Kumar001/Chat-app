import cloudinary from "../config/cloudinaryConfig.js";
export const uploadFileToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "chat_user_files",
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
