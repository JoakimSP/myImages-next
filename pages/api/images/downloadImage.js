import prisma from "@/components/prisma"
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export default async function handler(req, res) {

    const photoIdsArray = JSON.parse(decodeURIComponent(req.query.receiptId))
    const photoIdsToArray = photoIdsArray[0].split(",")
    const parseToInt = photoIdsToArray.map(element => {
        return Number.parseInt(element)
    });

    const photos = await prisma.photos.findMany({
        where : {
            id : {in: parseToInt}
        }
    })

    const archive = archiver('zip');

    archive.on('error', function(err) {
        throw err;
    });

    res.setHeader('Content-Disposition', 'attachment; filename=images.zip');
    res.setHeader('Content-Type', 'application/zip');

    archive.pipe(res);

    photos.forEach(photo => {  
        archive.file(photo.url, { name: photo.filename });
    })

    archive.finalize(); 
}