import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'images', 'exclusive');
    
    // Delete the directory if it exists
    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
    }

    // Recreate the directory
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // get the file extension
    cb(null, `exclusiveHeroImage${fileExtension}`); // set the file name
  },
});

const upload = multer({ storage: storage }).single('heroImage');
export default async (req, res) => {
  console.log("initilize")
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    const data = {
      ...req.body,
    };
console.log(data)
    if (req.file) {
      // Get file extension from uploaded file
      const fileExtension = path.extname(req.file.originalname);
      const imagePathRelative = `/images/exclusive/exclusiveHeroImage${fileExtension}`;
      const imagePath = path.join(process.cwd(), 'images', 'exclusive', `exclusiveHeroImage${fileExtension}`);
      const imagePathFolder = path.join(process.cwd(), 'images', 'exclusive');
      
      data.heroImagepathrelative = imagePathRelative;
      data.heroImagepath = imagePath;
      data.heroImagepathfolder = imagePathFolder;
    }
    else {
      delete data.heroImage
    }

    try {
      const result = await prisma.exclusivecollections.update({
        where: {
          id: "1"
        },
        data: data
      });
      res.json(result);
    } catch (dbError) {
      console.log(dbError);
      res.status(500).json({ error: dbError.message });
    }
  });
};
