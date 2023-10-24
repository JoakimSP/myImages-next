// /pages/api/image.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { imagePath } = req.query; 

    if (!imagePath) {
      return res.status(400).json({ error: "Image path is required." });
    }

    const filePath = path.join(process.cwd(), imagePath);
    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
      return res.status(404).json({ error: "Image not found." });
    }

    const file = fs.createReadStream(filePath);
    const mimeType = getMimeType(filePath);

    res.setHeader('Content-Type', mimeType);
    file.pipe(res);  
  } else {
    return res.status(405).end();  
  }
}

function getMimeType(filePath) {
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };

  return mimeTypes[extname] || 'application/octet-stream';
}
