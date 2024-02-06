/* import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export default async function handler(req, res) {
    const { imagePath } = req.query; 
    const absoluteImagePath = path.join(process.cwd(), imagePath);

    if (!fs.existsSync(absoluteImagePath)) {
        return res.status(404).json({ message: "Image not found!" });
    }

    try {
        const imageBuffer = await readFileAsync(absoluteImagePath);
        res.setHeader('Content-Type', 'image/jpeg'); // Adjust MIME type if necessary
        return res.end(imageBuffer); // Send the image file directly
    } catch (error) {
        console.error('Error reading image:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
} */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; // Import sharp for image processing

export default async function handler(req, res) {
    const { imagePath } = req.query;
    const absoluteImagePath = path.join(process.cwd(), imagePath);

    if (!fs.existsSync(absoluteImagePath)) {
        return res.status(404).json({ message: "Image not found!" });
    }

    try {
        // Instead of sending the image directly, use sharp to process it
        sharp(absoluteImagePath)
            .jpeg({ quality: 70 }) // Reduce quality to 70%. Adjust as necessary.
            .toBuffer((err, buffer, info) => {
                if (err) {
                    console.error('Error processing image:', err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                res.setHeader('Content-Type', 'image/jpeg'); // Set the correct MIME type
                res.end(buffer); // Send the processed image buffer
            });
    } catch (error) {
        console.error('Error reading image:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


