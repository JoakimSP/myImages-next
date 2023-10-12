import fs from 'fs';

export default function handler(req, res) {
    // Ensure only GET requests are handled
    if (req.method !== 'GET') {
        return res.status(405).end('Method not allowed');
    }

    const imagePath = req.query.name;

    // Safety check for imagePath
    if (!imagePath || typeof imagePath !== 'string') {
        console.log("Invalid image path provided:", imagePath);
        return res.status(400).end('Invalid image path');
    }

    // Check existence of the image
    if (!fs.existsSync(imagePath)) {
        console.log("Image not found at path:", imagePath);
        return res.status(404).end('Image not found');
    }

    let image;
    try {
        image = fs.readFileSync(imagePath);
    } catch (error) {
        console.error("Error reading the image:", error);
        return res.status(500).end('Error reading the image');
    }

    res.setHeader('Content-Type', 'image/jpeg');  // or 'image/png' based on your image type
    res.end(image);
}
