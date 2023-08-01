import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const {
    query: { filename },
  } = req;

  try {
    const filePath = path.join(process.cwd(), 'public', filename);
    const file = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'image/png');
    res.send(file);
  } catch (error) {
    res.status(500).json({ error: "Can't read the image file" });
  }
}