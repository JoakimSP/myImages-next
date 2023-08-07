import prisma from "@/components/prisma";
import { ref, getStream } from "firebase/storage";
import { storage } from "@/components/firebase";
import archiver from "archiver";

export default async function handler(req, res) {
    const photoIdsArray = JSON.parse(decodeURIComponent(req.query.receiptId));
    const photoIdsToArray = photoIdsArray[0].split(",");
    const parseToInt = photoIdsToArray.map(element => {
        return Number.parseInt(element);
    });

    const photos = await prisma.photos.findMany({
        where: {
            id: { in: parseToInt }
        }
    });

    try {
        if (photos.length === 0) {
            res.status(404).json({ message: "No photos found" });
            return;
        }

        // Create a zip archive using Archiver
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // Pipe the archive data to the response
        archive.pipe(res);

        // Set headers
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename=photos.zip');

        // Append each image to the zip
        for(let photo of photos) {
            const storageRef = ref(storage, photo.url);
            const stream = getStream(storageRef);
            archive.append(stream, { name: `${photo.id}.jpg` });  // Saving each image as its id for simplicity
        }

        // Finalize the archive once you've appended all the photos
        archive.finalize();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
