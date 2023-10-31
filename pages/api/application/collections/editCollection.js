import prisma from "@/components/prisma";
import multer from "multer";
import path from "path";
import nextConnect from "next-connect";
import { rmSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = join(process.cwd(),'images','collections', file.originalname);
        mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image'); 

const handler = nextConnect();

handler.use(upload);
 

handler.post(async (req, res) => {
    const { name, description, photographerID, id, subtitle, isFeaturedcol, previusImageFolder } = req.body;

    try {
        const collection = await prisma.collection.findFirst({ where: { id: id } });

        let imagePathRelative;
        let imagePath;
        let imageFolderPath;

        if (req.file) {
            if (collection && collection.imagefolder) {
                const oldImageFolder = path.join(process.cwd(), previusImageFolder);
                if (existsSync(oldImageFolder)) {
                    rmSync(oldImageFolder, { recursive: true });
                }
            }

            imagePathRelative = `/images/collections/${req.file.originalname}/${req.file.filename}`;
            imagePath = join(process.cwd(), "images", "collections", req.file.originalname, req.file.filename);
            imageFolderPath = `/images/collections/${req.file.originalname}`;
        }

        const updateData = {
            name: name,
            description: description,
            photographerPersonID: photographerID,
            subtitle: subtitle,
            imagepathrelative: imagePathRelative,
            imagepath: imagePath,
            imagepathfolder: imageFolderPath
        };


        if (!req.file) {
            delete updateData.imagepathrelative;
            delete updateData.imagepath;
            delete updateData.imagepathfolder;
        }
   
      const updateInfo =  await prisma.collection.update({
            where: {
                id: id
            },
            data: updateData
        });
        
        if (isFeaturedcol !== "false") {
            await prisma.featuredcollections.update({
                where: { id: "1" },
                data: {
                    collection: {
                        connect: { id: collection.id }
                    }
                }
            });
        } else {
            await prisma.featuredcollections.update({
                where: { id: "1" },
                data: {
                    collection: {
                        disconnect: { id: collection.id }
                    }
                }
            });
        }

        res.status(200).json({ message: 'Collection updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: error.message });
    }
});

export default handler;
