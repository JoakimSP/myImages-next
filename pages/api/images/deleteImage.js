import prisma from "@/components/prisma"
import {rmSync, existsSync} from "fs"
import { join } from "path";
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    const {
        personID,  // Seems unused, you can remove it if you don't need
        id,       // Seems unused, you can remove it if you don't need
        filename,
        filepath  // Seems unused, you can remove it if you don't need
    } = req.body;

    console.log(req.body);

    try {
        console.log("Initiating delete");
        const pathToDirectory = join(process.cwd(), "images", filename);

        if (existsSync(pathToDirectory)) {
            rmSync(pathToDirectory, { recursive : true});
            console.log("File deleted");
        } else {
            console.log("File does not exist");
        }

        const deletePhoto = await prisma.photos.deleteMany({
            where: {
                filename: filename
            }
        });
        console.log(deletePhoto);

        if(deletePhoto) {
            res.status(200).json({ message: "Delete image" });
        }
    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({ message: "Error deleting files", error: error });
    } finally {
        prisma.$disconnect();
    }
}
