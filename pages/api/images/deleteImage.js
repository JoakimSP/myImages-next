import prisma from "@/components/prisma"
import {rmSync, existsSync} from "fs"
import { join } from "path";
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    const {
        filename,
    } = req.body;

    try {
        const pathToDirectory = join(process.cwd(), "images", filename);

        if (existsSync(pathToDirectory)) {
            rmSync(pathToDirectory, { recursive : true});
        } else {
            console.log("File does not exist");
        }

        const deletePhoto = await prisma.photos.deleteMany({
            where: {
                filename: filename
            }
        });

        if(deletePhoto) {
            res.status(200).json({ message: "Delete image" });
        }
    } catch (error) {
        logger.log('error', {
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({ message: "Error deleting files", error: error });
    } finally {
        prisma.$disconnect();
    }
}
