import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import prisma from "@/components/prisma";
import { getSession } from "next-auth/react";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const dirPath = path.join(process.cwd(), "public/uploads", uniqueSuffix);
    fs.mkdirSync(dirPath, { recursive: true });
    cb(null, dirPath);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  
});

const upload = multer({
  storage,
  limits : {
    fileSize: 15 * 1024 * 1024,
    files: 10
  }
 });

const handler = nextConnect()

 handler.use(async (req, res, next) => {
  const session = await getSession({ req });
  if (session) {
    req.userEmail = session.user.email;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
 })

  handler.post(async (req, res) => {
    await new Promise((resolve, reject) => {
      upload.array("image")(req, res, async (err) => {
        if (err) {
          reject(err);
          res.status(500).json({ error: "Image upload failed", details: error.message });
        }
        resolve();
        const files = req.files;
        const currentUser = await getCurrentUser(req.userEmail)       

        files.forEach(async (file) => {
          const thumbnailName = "thumbnail-" + file.filename;
          const inputPath = path.join(file.destination, file.filename);
          const outputPath = path.join(file.destination, thumbnailName);

          sharp(inputPath)
            .resize(300, 300, { fit: "inside" })
            .toFile(outputPath);


              await prisma.photos.create({            
                data : {
                  personID : currentUser.personID,
                  filename : file.filename,
                  filetype : file.mimetype,
                  filesize : file.size,
                  url      : file.destination,
                }
              })             
        });

        res.status(200).json({ message: "Images uploaded", files: req.files });
      });
    });

  });

export const config = {
  api: {
    bodyParser: false,
  },
};


async function getCurrentUser(email){
  const currentUser = await prisma.photographer.findUnique({
    where : {
      email : email
    }
  })

  return currentUser
}

export default handler;
