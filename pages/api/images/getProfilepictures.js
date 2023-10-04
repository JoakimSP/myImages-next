// /api/images/getProfilepicture.js
import fs from 'fs';

export default function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const imagePath = req.query.profilePicturePath;
    console.log(imagePath)

    if (!fs.existsSync(imagePath)) {
      console.log("Image not found at path:", imagePath);
      return res.status(404).end();
    }

    const image = fs.readFileSync(imagePath);
    res.setHeader('Content-Type', 'image/png'); // Assuming it's a PNG. Adjust if necessary.
    res.send(image);
}