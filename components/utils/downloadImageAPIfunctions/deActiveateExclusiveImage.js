import { rmSync, existsSync } from "fs"
import { join } from "path";
import prisma from "@/components/prisma";

async function deActivateExclusiveImages(photos) {
    const folderPaths = photos.map(photo => photo.folderpath);

    const relatedPhotos = await prisma.photos.findMany({
        where: {
            folderpath: { in: folderPaths }
        }
    });

    const checkForExclusive = relatedPhotos.filter(photo => photo.exclusive == true);

    if (checkForExclusive.length > 0) {
        const exclusiveFolderPaths = checkForExclusive.map(photo => photo.folderpath);
       
        // Deleting records from database
        await prisma.photos.updateMany({
            where: {
                folderpath: { in: exclusiveFolderPaths }
            },
            data : {
                active : false
            }
        });
    } else {
        console.log("No exclusive photos");
    }
}

module.exports = deActivateExclusiveImages;
