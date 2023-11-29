import prisma from "@/components/prisma";
import fs from "fs";
import archiver from "archiver";
import PDFDocument from 'pdfkit';
const addReceiptInformation = require('@/components/utils/downloadImageAPIfunctions/addReceiptInformation')
const deActivateExclusiveImages = require('@/components/utils/downloadImageAPIfunctions/deActiveateExclusiveImage')
const logger = require('@/components/utils/logger')

export const config = {
    api: {
      responseLimit: false,
    },
  }

export default async function handler(req, res) {

    try {
    const receiptString = decodeURIComponent(req.query.receipt);
    const receipt = JSON.parse(receiptString);

    // Fetch the receipt from the database
    const receiptDB = await prisma.receipt.findFirst({
        where: {
            id: receipt[0].id
        },
    });

    // Check if the receipt has already been downloaded
    if (receiptDB.downloaded) {
        return res.status(404).json({ message: "not allowed" });
    }

    const photoIdsToArray = receipt[0].photosID.split(",");
    const photos = await prisma.photos.findMany({
        where: {
            id: { in: photoIdsToArray }
        }
    });

    await deActivateExclusiveImages(photos)

    // Update the download count for the photos
    await prisma.photos.updateMany({
        where: {
            id: { in: photoIdsToArray },
        },
        data: {
            countDownloaded: { increment: 1 },
        },
    });

    // Update the downloaded status of the receipt
    await prisma.receipt.update({
        where: {
            index: receipt[0].index
        },
        data: {
            downloaded: true,
        },
    });

    // Create an archive
    const archive = archiver('zip', {
        zlib: { level: 9 },
    });

    // Pipe the archive data to the response
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=photos.zip');
    archive.pipe(res);

    // Append each image to the archive
    for (const photo of photos) {
        const image = fs.createReadStream(photo.filepath);
         archive.append(image, { name: `${photo.title}-${photo.size}.${photo.filetype}` });
    }
    

  /*    // Create a PDF document
    const receiptDir = './receipts';
    if (!fs.existsSync(receiptDir)) {
        fs.mkdirSync(receiptDir, { recursive: true });
    }

    const receiptFilename = `${receiptDB.id}.pdf`;
    const receiptPath = `${receiptDir}/${receiptFilename}`;
  
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(receiptPath);
    doc.pipe(stream);

    //Style PDF document
    const styledDocFile = await addReceiptInformation(doc, receipt, photos)

    styledDocFile.end(); */

    // Append the PDF to the archive after it's fully written
    stream.on('finish', () => {
      /*   archive.append(fs.createReadStream(receiptPath), { name: receiptFilename }); */
        archive.finalize();
    });

    // Handle errors
    stream.on('error', error => {
        console.log(error);
        logger.log('error', {
          message: error.message,
          stack: error.stack
        });
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
        res.end();
    });

    archive.on('error', error => {
        console.log(error);
        logger.log('error', {
          message: error.message,
          stack: error.stack
        });
        console.error('Archive error:', error);
        res.status(500).json({ message: 'Error creating zip archive' });
        res.end();
    });

    archive.on('finish', () => {
        res.end();
    });

} catch (error) {
    console.log(error);
    logger.log('error', {
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: 'Internal Server Error' });
}
}
