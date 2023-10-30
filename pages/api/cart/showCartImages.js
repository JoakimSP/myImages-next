import fs from 'fs';

export default function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const imagePath = req.query.id;


    if (!fs.existsSync(id)) {
      console.log("Image not found:", id);
      return res.status(404).end();
    }

    const image = fs.readFileSync(imagePath);
    res.setHeader('Content-Type', 'image/png'); // Assuming it's a PNG. Adjust if necessary.
    res.send(image);
}