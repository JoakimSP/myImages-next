import fs from 'fs';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const imagePaths = req.body.paths;
  const imagesBase64 = {};
  imagePaths.forEach(filepath => {
    if (fs.existsSync(filepath)) {
      const imageBuffer = fs.readFileSync(filepath);
      imagesBase64[filepath] = imageBuffer.toString('base64');
    }
  });

  res.status(200).json(imagesBase64);
}