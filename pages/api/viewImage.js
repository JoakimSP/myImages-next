import fs from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
  
    const imagePath = req.query.name

  
    if (!fs.existsSync(imagePath)) {
      console.log("Image not found at path:", imagePath); // This log will show if the image isn't found
      return res.status(404).end();
    }
  
    const image = fs.readFileSync(imagePath);
    res.setHeader('Content-Type', 'image/png'); // Assuming it's a PNG. Adjust if necessary.
    res.send(image);
  }