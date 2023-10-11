import prisma from "@/components/prisma";
import { logger } from "@/components/utils/logger";
import {existsSync, rmSync} from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { id } = req.body;

    try {
        const collection = await prisma.collection.findFirst({
            where: {
                id: id
            }
        });

        if (collection && collection.image) {
            const imageFolder = path.join(process.cwd(), collection.imagefolder); 
            
            // Use unlinkSync to delete the image file synchronously
            try {
                if (existsSync(imageFolder)) {
                    rmSync(imageFolder, { recursive : true});
                } else {
                    console.log("File does not exist");
                }
            } catch(err) {
                console.log(err)
                logger.log('error', {
                    message: err.message,
                    stack: err.stack
                });
                return res.status(500).json({ Error: "Image deletion failed!" });
            }
        }

        await prisma.collection.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({ message: 'Category deleted' });

    } catch (error) {
        logger.log('error', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ Error: error });
    }
}
