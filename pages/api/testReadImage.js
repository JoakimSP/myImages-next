import fs from 'fs';
import { join } from 'path';

export default function handler(req, res) {
    console.log("Image API endpoint hit!"); // This log will confirm if the endpoint is being hit at all
  
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
  
    const imageName = req.query.name;
    console.log("Requested image name:", imageName); // This log will show the image name being requested
  
    const imagePath = join(process.cwd(), 'images', imageName);
  
    if (!fs.existsSync(imagePath)) {
      console.log("Image not found at path:", imagePath); // This log will show if the image isn't found
      return res.status(404).end();
    }
  
    const image = fs.readFileSync(imagePath);
    res.setHeader('Content-Type', 'image/png'); // Assuming it's a PNG. Adjust if necessary.
    res.send(image);
  }
  