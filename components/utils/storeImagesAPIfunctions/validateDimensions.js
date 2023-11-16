import { promises as fsPromises, rmSync, existsSync } from 'fs';
import sharp from 'sharp';
const logger = require('@/components/utils/logger')

const MIN_PIXEL = 4112;

   async function validateDimensions(filePath, folderpath) {
  try {
    const imageMetadata = await sharp(filePath).metadata();
    const largestSide = Math.max(imageMetadata.width, imageMetadata.height);

    if (largestSide < MIN_PIXEL) {
      throw new Error(`Image's largest dimension is too small, must be at least ${MIN_PIXEL} pixels.`);
    }
  } catch (error) {
    // If validation fails or an error occurs, delete the file
    if (existsSync(folderpath)) {
        rmSync(folderpath, { recursive : true});
    } else {
        console.log("File does not exist");
    }
    console.log(error)
    logger.log('error', {
        message: error.message,
        stack: error.stack
    })
    throw new Error(`Image dimensions are too small, must be at least ${MIN_PIXEL}px.`);
  }
}

module.exports = validateDimensions