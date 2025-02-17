import cloudinary from "../config/cloudinaryConfig.js";

function getPublicIdFromUrl(url) {
  const urlParts = url.split("/");

  const publicIdWithExtension = urlParts.slice(7).join("/");

  const publicId = publicIdWithExtension.split(".")[0];

  return publicId;
}

async function deleteImageFromCloudinary(url) {
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) {
    console.error("Failed to extract public_id from URL.");
    return false;
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok") {
      console.log(`Image with public_id "${publicId}" deleted successfully.`);
      return true;
    } else {
      console.log(
        `Failed to delete image with public_id "${publicId}":`,
        result
      );
      return false;
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
}

export default deleteImageFromCloudinary;
