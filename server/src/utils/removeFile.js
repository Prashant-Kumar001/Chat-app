import fs from 'fs';

export const removeLocalFile = (filePath) => {
    try {
        fs.unlinkSync(filePath); // Synchronously remove the file
    } catch (error) {
        // Log the error if the file removal fails
        console.error(`Error removing file: ${error.message}`);
    }
};

    