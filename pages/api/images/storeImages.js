import { mkdirSync, promises, readFile } from 'fs';
import { join } from 'path';
import prisma from '@/components/prisma';
import multer from 'multer';
import nextConnect from 'next-connect';
import sharp from 'sharp';
import { getSession } from 'next-auth/react';
const logger = require('@/components/utils/logger')
const validateDimensions = require('@/components/utils/storeImagesAPIfunctions/validateDimensions');


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
    files: 1,
    fieldSize: 500000000
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
    upload.single("image[]")(req, res, async (error) => {
      if (error) {
        console.log(error)
        logger.log('error', {
          message: error.message,
          stack: error.stack
        })
        reject(error);
        console.log(error)
        logger.log('error', {
          message: error.message,
          stack: error.stack
        })
        return res.status(500).json({ error: "Image upload failed", details: error.message });
      }
      resolve()

      const photoInformationArray = req.body.photoInformation;
      const parsedPhotoInformation = JSON.parse(photoInformationArray[0]);
      const file = req.file;

      try {
        await validateDimensions(file.path, file.destination);
      } catch (error) {
        console.log(error)
        logger.log('error', {
          message: error.message,
          stack: error.stack
        })
        return res.status(400).json({ error: error.message });
      }
      const {
        personID,
        filename,
        filetype,
        filesize,
        title,
        description,
        exclusive,
        collection,
        category,
        priceSmall,
        priceMedium,
        priceLarge,
        tags
      } = parsedPhotoInformation
      const imageMetadata = await sharp(file.path).metadata();

      if (imageMetadata.width >= imageMetadata.height) {
        await processAndStoreImageWaterMark(file, 'small-wm', 1000, null, personID, filename, filetype, filesize, imageMetadata, title, description, exclusive, collection, category, priceSmall, tags);
        await processAndStoreImage(file, 'thumb', 500, null, personID, filename, filetype, filesize, imageMetadata, title, description, priceMedium, tags, category, collection, exclusive);
        await processAndStoreImage(file, 'small', 1000, null, personID, filename, filetype, filesize, imageMetadata, title, description, priceMedium, tags, category, collection, exclusive);
        await processAndStoreImage(file, 'medium', 3550, null, personID, filename, filetype, filesize, imageMetadata, title, description, priceMedium, tags, category, collection, exclusive);
      } else {
        await processAndStoreImageWaterMark(file, 'small-wm', null, 1000, personID, filename, filetype, filesize, imageMetadata, title, description, exclusive, collection, category, priceSmall, tags);
        await processAndStoreImage(file, 'thumb', null, 500, personID, filename, filetype, filesize, imageMetadata, title, description, priceMedium, tags, category, collection, exclusive);
        await processAndStoreImage(file, 'small', null, 1000, personID, filename, filetype, filesize, imageMetadata, title, description, priceMedium, tags, category, collection, exclusive);
        await processAndStoreImage(file, 'medium', null, 3550, personID, filename, filetype, filesize, imageMetadata, title, description, priceMedium, tags, category, collection, exclusive);
      }

      // Store the large
      const originalPath = join(file.destination, `${file.filename}`);

      await prisma.photos.create({
        data: {
          personID: personID,
          filename: filename,
          filetype: "tiff",
          filesize: filesize,
          filepath: originalPath,
          folderpath: file.destination,
          size: 'large',
          price: parseInt(priceLarge),
          width: imageMetadata.width,
          height: imageMetadata.height,
          title: title,
          description: description,
          tags: tags
        }

      });
      prisma.$disconnect()
      res.status(200).json({ message: "Images uploaded", file: req.file });
    })
  })
})

async function processAndStoreImage(
  image,
  size,
  resizeWidth,
  resizeHeight,
  personID,
  filename,
  filetype,
  filesize,
  imageMetadata,
  title,
  description,
  price,
  tags,
  category,
  collection,
  exclusive) {
  try {


    const outputPath = resizeWidth ?
      join(image.destination, `${resizeWidth}-${image.filename}.JPG`) :
      join(image.destination, `${resizeHeight}-${image.filename}.JPG`);

    await sharp(image.path).resize(resizeWidth, resizeHeight).jpeg({ quality: 100 }).toFile(outputPath);

    const imageMetadata = await sharp(outputPath).metadata();

    let data = {
      personID: personID,
      filename: filename,
      filetype: "jpg",
      filesize: filesize,
      filepath: outputPath,
      folderpath: image.destination,
      size: size,
      width: imageMetadata.width,
      height: imageMetadata.height,
      title: title,
      description: description,
      price: parseInt(price),
      tags: tags,
    }
    console.log(collection)
    if (size === "thumb") {
      data.categoriesId = category
      data.collectionId = collection != "null" ? collection : null
      data.exclusive = exclusive == "on" ? true : false
    }
    

    await prisma.photos.create({
      data: {
        ...data
      }
    });

    if (exclusive == "on" && photo && size === "thumb") {
      await prisma.exclusivecollections.update({
        where: {
          id: "1"
        },
        data: {
          photos: {
            connect: { id: photo.id.toString() }
          }
        }
      });
    }
  } catch (error) {
    console.log(error)
    logger.log('error', {
      message: error.message,
      stack: error.stack
    })
  }
}



async function processAndStoreImageWaterMark(
  image,
  size,
  resizeWidth,
  resizeHeight,
  personID,
  filename,
  filetype,
  filesize,
  imageMetadata,
  title,
  description,
  exclusive,
  collection,
  category,
  price,
  tags) {
  try {
    const outputPath = resizeWidth ?
      join(image.destination, `wm-${image.filename}.JPG`) :
      join(image.destination, `wm-${image.filename}.JPG`);

    let imageSharp = sharp(image.path).resize(resizeWidth, resizeHeight).jpeg({ quality: 70 });
    const watermarkBuffer = await promises.readFile('public/appcontent/myimages-logo-black-1-op-40.png');
    const watermarkSharp = await sharp(watermarkBuffer)
      .resize({
        width: 400,
        height: 400,
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toBuffer();

    imageSharp = imageSharp.composite([{
      input: watermarkSharp,
      blend: 'over',
      gravity: 'southeast', // Position the watermark,

    }]);

    await imageSharp.toFile(outputPath);
    const imageMetadata = await sharp(outputPath).metadata();

    const photoData = {
      personID: personID,
      filename: filename,
      filetype: "jpg",
      filesize: filesize,
      filepath: outputPath,
      folderpath: image.destination,
      size: size,
      width: imageMetadata.width,
      height: imageMetadata.height,
      title: title,
      description: description,
      price: parseInt(price),
      tags: tags,
      collectionId: null,
      exclusive: exclusive == "on" ? true : false
    };

    if (collection != "null") {
      photoData.collectionId = collection;
    }

    if (category) {
      photoData.categoriesId = category;
    }

    const photo = await prisma.photos.create({
      data: photoData
    });

    if (exclusive == "on" && photo) {
      await prisma.exclusivecollections.update({
        where: {
          id: "1"
        },
        data: {
          photos: {
            connect: { id: photo.id.toString() }
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    logger.log('error', {
      message: error.message,
      stack: error.stack
    });
  }
}


export default handler;