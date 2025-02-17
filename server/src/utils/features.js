import cloudinary from "../config/cloudinaryConfig.js";

const emitEvent = (req, event, users, data) => {
console.log("emitting event: ",  event)
}


const deleteFileFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === "ok") {
            console.log(`Image with public_id "${publicId}" deleted successfully.`);
            return true;
        } else {
            console.log(`Failed to delete image with public_id "${publicId}":`, result);
            return false;
        }
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return false;
    }
 }


export {
    emitEvent,
    deleteFileFromCloudinary,
}