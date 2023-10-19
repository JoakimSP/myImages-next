import { mkdirSync } from 'fs';
import { join } from 'path';
import prisma from '@/components/prisma';
import multer from 'multer';
import nextConnect from 'next-connect';
import sharp from 'sharp';
import { getSession } from 'next-auth/react';
const logger = require('@/components/utils/logger')


//turn of nextjs request object parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = join(process.cwd(), 'images', file.originalname);
    mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


const upload = multer({
  storage,
  limits: {
    files: 10
  }
})

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
      upload.array("image[]")(req, res, async (error) => {
        if (error) {
          console.log(error)
          logger.logger.log('error', {
            message: error.message,
            stack: error.stack
          })
          reject(error);
          logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
          return res.status(500).json({ error: "Image upload failed", details: error.message });
        }
        resolve()
        console.log('initialize 2')
        const files = req.files;
        const photoInformationArray = req.body.photoInformation;

        for (let i = 0; i < files.length; i++) {
          const parsedPhotoInformation = JSON.parse(photoInformationArray[i]);
          const file = files[i]
          const {
            personID,
            filename,
            filetype,
            filesize
          } = parsedPhotoInformation
          const imageMetadata = await sharp(file.path).metadata();

          if (imageMetadata.width >= imageMetadata.height) {
            await processAndStoreImage(file, 'small', 1000, null, personID, filename, filetype, filesize, imageMetadata);
            await processAndStoreImage(file, 'medium', 2400, null, personID, filename, filetype, filesize, imageMetadata);
            await processAndStoreImage(file, 'large', 4000, null, personID, filename, filetype, filesize, imageMetadata);
          } else {
            await processAndStoreImage(file, 'small', null, 1000, personID, filename, filetype, filesize, imageMetadata);
            await processAndStoreImage(file, 'medium', null, 2760, personID, filename, filetype, filesize, imageMetadata);
            await processAndStoreImage(file, 'large', null, 5520, personID, filename, filetype, filesize, imageMetadata);
          }
          console.log('initialize 3')
          // Store the original
          const originalPath = join(file.destination, `${file.filename}.tiff`);
          await sharp(file.path).toFile(originalPath);
          await prisma.photos.create({
            data: {
              personID: personID,
              filename: filename,
              filetype: filetype,
              filesize: filesize,
              filepath: originalPath,
              folderpath: file.destination,
              size: 'original',
              width: imageMetadata.width,
              height: imageMetadata.height
            }

          });



        }
        prisma.$disconnect()
        res.status(200).json({ message: "Images uploaded", files: req.files });
      })
    })
})

async function processAndStoreImage(image, size, resizeWidth, resizeHeight, personID, filename, filetype, filesize, imageMetadata) {
try {
  

  const outputPath = resizeWidth ?
    join(image.destination, `${resizeWidth}-${image.filename}.JPG`) :
    join(image.destination, `${resizeHeight}-${image.filename}.JPG`);

  await sharp(image.path).resize(resizeWidth, resizeHeight).toFile(outputPath);

  await prisma.photos.create({
    data: {
      personID: personID,
      filename: filename,
      filetype: filetype,
      filesize: filesize,
      filepath: outputPath,
      folderpath: image.destination,
      size: size,
      width: imageMetadata.width,
      height: imageMetadata.height
    }
  });
} catch (error) {
  logger.logger.log('error', {
    message: error.message,
    stack: error.stack
})
}
}

export default handler;