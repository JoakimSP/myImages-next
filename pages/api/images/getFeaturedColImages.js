import fs from 'fs';
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
}

