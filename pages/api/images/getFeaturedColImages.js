// /api/images/getFeaturedColImages.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { imagePath } = req.query; 
    const absoluteImagePath = path.join(process.cwd(), imagePath); // Convert to absolute path

    if (!fs.existsSync(absoluteImagePath)) {
        return res.status(404).json({ message: "Image not found!" });
    }

    try {
        const imageBuffer = fs.readFileSync(absoluteImagePath);
        res.setHeader('Content-Type', 'image/jpeg'); // Adjust mime type if necessary
       return res.end(imageBuffer); // Send the image file directly
    } catch (error) {
        console.error('Error reading image:', error);
        return res.status(500).json({ message: "Internal server error" });
    }

 
}
