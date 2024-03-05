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
        commercialPrice,
        tags
      } = parsedPhotoInformation

      const imageMetadata = await sharp(file.path).metadata();

      if (imageMetadata.width >= imageMetadata.height) {
        await processAndStoreImageWaterMark({ 
            image: file, 
            size: 'small-wm', 
            resizeWidth: 1000, 
            resizeHeight: null, 
            personID, 
            filename, 
            filetype, 
            filesize, 
            title, 
            description, 
            exclusive, 
            collection, 
            category, 
            tags 
        });
    
        await processAndStoreImage({ 
            image: file, 
            size: 'thumb', 
            resizeWidth: 500, 
            resizeHeight: null, 
            personID, 
            filename, 
            filetype, 
            filesize, 
            title, 
            description, 
            price: null, 
            tags, 
            category, 
            collection, 
            exclusive 
        });
    
        await processAndStoreImage({ 
            image: file, 
            size: 'small', 
            resizeWidth: 1000, 
            resizeHeight: null, 
            personID, 
            filename, 
            filetype, 
            filesize, 
            title, 
            description, 
            price: priceSmall, 
            tags, 
            category, 
            collection, 
            exclusive 
        });
    
        await processAndStoreImage({ 
            image: file, 
            size: 'medium', 
            resizeWidth: 3550, 
            resizeHeight: null, 
            personID, 
            filename, 
            filetype, 
            filesize, 
            title, 
            description, 
            price: priceMedium, 
            tags, 
            category, 
            collection, 
            exclusive 
        });
    
    } else {
        await processAndStoreImageWaterMark({ 
            image: file, 
            size: 'small-wm', 
            resizeWidth: null, 
            resizeHeight: 1000, 
            personID, 
            filename, 
            filetype, 
            filesize, 
            title, 
            description, 
            exclusive, 
            collection, 
            category, 
            tags 
        });
    
        await processAndStoreImage({ 
            image: file, 
            size: 'thumb', 
            resizeWidth: null, 
            resizeHeight: 500, 
            personID, 
            filename, 
            filetype, 
            filesize, 
            title, 
            description, 
            price: null, 
            tags, 
            category, 
            collection, 
            exclusive 
        });
    
        await processAndStoreImage({ 
            image: file, 
            size: 'small', 
            resizeWidth: null, 
            resizeHeight: 1000, 
            personID, 
            filename, 
            filetype, 
            filesize, 
            title, 
            description, 
            price: priceSmall, 
            tags, 
            category, 
            collection, 
            exclusive 
        });
    
        await processAndStoreImage({ 
            image: file, 
            size: 'medium', 
            resizeWidth: null, 
            resizeHeight: 3550, 
            personID, 
            filename, 
            filetype, 
            filesize, 
            title, 
            description, 
            price: priceMedium, 
            tags, 
            category, 
            collection, 
            exclusive 
        });
    }
    

      // Store the large
      const originalPath = join(file.destination, `${file.filename}`);
      const data = {
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
      if(commercialPrice !== null || commercialPrice !== undefined){
        data.commercialPrice = parseInt(commercialPrice)
      }

      await prisma.photos.create({
        data: {
          ...data
        }

      });
      prisma.$disconnect()
      res.status(200).json({ message: "Images uploaded", file: req.file });
    })
  })
})

async function processAndStoreImage({
  image,
  size,
  resizeWidth,
  resizeHeight,
  personID,
  filename,
  filetype,
  filesize,
  title,
  description,
  price,
  tags,
  category,
  collection,
  exclusive}) {
  try {

    const outputPath = resizeWidth ?
      join(image.destination, `${resizeWidth}-${image.filename}.JPG`) :
      join(image.destination, `${resizeHeight}-${image.filename}.JPG`);

    await sharp(image.path).resize(resizeWidth, resizeHeight).jpeg({ quality: 100 }).toFile(outputPath);

    const imageMetadata = await sharp(outputPath).metadata();

    let data = {
      personID,
      filename,
      filetype: "jpg",
      filesize,
      filepath: outputPath,
      folderpath: image.destination,
      size,
      width: imageMetadata.width,
      height: imageMetadata.height,
      title,
      description,
      price: parseInt(price),
      tags,
    }

    if (size === "thumb") {
      data.categoriesId = category
      if (collection != "null") {
        data.collectionId = collection;
      }
      data.exclusive = exclusive == "on" ? true : false
      data.price = null
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



async function processAndStoreImageWaterMark({
  image,
  size,
  resizeWidth,
  resizeHeight,
  personID,
  filename,
  filetype,
  filesize,
  title,
  description,
  exclusive,
  collection,
  category,
  tags}) {
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

      await imageSharp.toFile(outputPath);
      const firstImageMeta = await sharp(outputPath).metadata();

    imageSharp = imageSharp.composite([{
      input: watermarkSharp,
      blend: 'over',
      top: Math.round((firstImageMeta.height / 3) * 2),
      left: Math.round(firstImageMeta.width - 410)

    }]);

    await imageSharp.toFile(outputPath);
    const imageMetadata = await sharp(outputPath).metadata();

    const photoData = {
      personID,
      filename,
      filetype: "jpg",
      filesize,
      filepath: outputPath,
      folderpath: image.destination,
      size,
      width: imageMetadata.width,
      height: imageMetadata.height,
      title,
      description,
      tags,
      price: null,
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
      data: {...photoData}
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