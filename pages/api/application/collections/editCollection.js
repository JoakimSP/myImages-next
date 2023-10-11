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
    const { name, description, photographerID, id, subtitle, isFeaturedcol } = req.body;

    try {
        const collection = await prisma.collection.findUnique({ where: { id: id } });
        console.log(collection)

        if (collection && collection.imagefolder) {
            const oldImageFolder = path.join(process.cwd(), collection.imagefolder);

            if (existsSync(oldImageFolder)) {
                rmSync(oldImageFolder, { recursive: true });
            }
        }
        const imagePath = `/images/collections/${req.file.originalname}/${req.file.filename}`;
        const imageFolder = `/images/collections/${req.file.originalname}`;
        await prisma.collection.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                image: imagePath,
                imagefolder: imageFolder,
                photographerPersonID: photographerID,
                subtitle: subtitle
            }
        });
        
        if (isFeaturedcol != "false") {
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
