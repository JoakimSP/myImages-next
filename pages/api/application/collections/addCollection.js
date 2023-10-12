import prisma from "@/components/prisma";
import multer from 'multer';
import fs from 'fs';
import path, { join } from 'path';
const logger = require('@/components/utils/logger');

export const config = {
    api: {
        bodyParser: false,
    },
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = join(process.cwd(), 'images', 'collections', file.originalname);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('image');

export default async function handler(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            logger.logger.log('error', {
                message: err.message,
                stack: err.stack
            });
            return res.status(500).json({ Error: "File upload failed!" });
        }

        const { name, description, photographerID, subtitle, isFeaturedcol } = req.body;
        const imagePathRelative = `/images/collections/${req.file.originalname}/${req.file.filename}`;
        const imagePath = join(process.cwd(), "images", "collections", req.file.originalname, req.file.filename);
        const imageFolderPath = `/images/collections/${req.file.originalname}`;
        console.log(isFeaturedcol)


        try {
            const response = await prisma.collection.create({
                data: {
                    name,
                    description,
                    imagepathrelative: imagePathRelative,
                    imagepath: imagePath,
                    imagepathfolder: imageFolderPath,
                    photographerPersonID: photographerID,
                    subtitle,
                }
            });

            if (isFeaturedcol != "false") {
                await prisma.featuredcollections.update({
                    where: { id: "1" },
                    data: {
                        collection: {
                            connect: { id: response.id }
                        }
                    }
                });
            }

            res.status(200).json({ message: 'New collection added' });

        } catch (error) {
            logger.logger.log('error', {
                message: error.message,
                stack: error.stack
            });
            res.status(500).json({ Error: error });
        }
    });
}