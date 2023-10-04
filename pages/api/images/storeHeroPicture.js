import { mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import prisma from '@/components/prisma';
import multer from 'multer';
import nextConnect from 'next-connect';
import sharp from 'sharp';
import { getSession } from 'next-auth/react';

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = join(process.cwd(), 'images', req.userEmail); // Use email or another unique identifier for the folder name
    mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '.jpg');
  }
})

const upload = multer({ storage });

const handler = nextConnect();

handler.use(async (req, res, next) => {
  const session = await getSession({ req });
  if (session) {
    req.userEmail = session.user.email;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

handler.post(async (req, res) => {
  console.log("Initiate handler")
  await new Promise((resolve, reject) => {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        reject(err);
        return res.status(500).json({ error: "Image upload failed", details: err.message });
      }
      console.log("Step 2")
      resolve();

      const file = req.file;
      const imageMetadata = await sharp(file.path).metadata();

      const outputPath = join(file.destination,'heropicture.' + imageMetadata.format);
      await sharp(file.path).resize(imageMetadata.width, imageMetadata.height).toFile(outputPath);

      await prisma.photographer.update({
        where: {
          email: req.userEmail
        },
        data: {
          heropicture: outputPath
        }
      });

      unlinkSync(file.path);  // Optional: Remove the original uploaded image

      prisma.$disconnect();
      res.status(200).json({ message: "Profile picture uploaded", path: outputPath });
    });
  });
});

export default handler;



