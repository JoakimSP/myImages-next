import prisma from "@/components/prisma";
import fs from "fs";
import archiver from "archiver";
import PDFDocument from 'pdfkit';
import { resolve } from "path";
const addReceiptInformation = require('@/components/utils/downloadImageAPIfunctions/addReceiptInformation')
const deActivateExclusiveImages = require('@/components/utils/downloadImageAPIfunctions/deActiveateExclusiveImage')
const logger = require('@/components/utils/logger')

export const config = {
    api: {
        responseLimit: false,
    },
}

export default async function handler(req, res) {


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

    const imageAppendPromises = photos.map(photo => appendImageToArchive(archive, photo));

    await Promise.all(imageAppendPromises);

    // Create a PDF document
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
    stream.on('error', error => {
        console.log(error);
        logger.log('error', {
            message: error.message,
            stack: error.stack
        });
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    });

    const styledDocFile = await addReceiptInformation(doc, receipt, photos)
    styledDocFile.end();

    await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
    });

    archive.on('error', error => {
        console.log(error);
        logger.log('error', {
            message: error.message,
            stack: error.stack
        });
        console.error('Archive error:', error);
        res.status(500).json({ message: 'Error creating zip archive' });
    });

    archive.append(fs.createReadStream(receiptPath), { name: receiptFilename });
    // Append the PDF to the archive after it's fully written
    await new Promise((resolve, reject) => {
        archive.on('finish', () => {
            resolve()
            res.end();
        });
        archive.on('error', reject);
        archive.finalize();
    });



}



function appendImageToArchive(archive, photo) {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(photo.filepath)
            .then(data => {
                archive.append(data, { name: `${photo.title}-${photo.size}.${photo.filetype}` });
                resolve();
            })
            .catch(error => {
                logger.log('error', {
                    message: error.message,
                    stack: error.stack
                });
                reject()
            });
           
    });
}