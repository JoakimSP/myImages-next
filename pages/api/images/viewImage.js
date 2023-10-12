import fs from 'fs';
import { join } from 'path';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const imagePath = req.query.name

    if (!fs.existsSync(imagePath)) {
        console.log("Image not found at path:", imagePath);
        return res.status(404).end();
    }
    const image = fs.readFileSync(imagePath);
    res.setHeader('Content-Type', 'image/jpeg');  // or 'image/png' based on your image type
    res.end(image);
}
