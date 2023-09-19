import getRawBody from 'raw-body';
import { parse } from 'querystring';
import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  let raw;
  try {
    raw = await getRawBody(req, {
      length: req.headers['content-length'],
      limit: '100mb',  // Adjust this limit based on your requirements
    });
  } catch (e) {
    res.status(413).json({ error: 'Body exceeded limit' });
    return;
  }

  const data = parse(raw.toString());
  const imageBuffer = Buffer.from(data.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // Ensure the directory exists
  const dir = join(process.cwd(), 'images');
  mkdirSync(dir, { recursive: true });
  const imagePath = join(dir, `imagename.png`); // Assuming PNG, adjust if necessary

  createWriteStream(imagePath).end(imageBuffer);

  res.status(200).json({ message: 'Image uploaded!', path: `/images/imagename.png` });
};
