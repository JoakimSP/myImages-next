import prisma from "@/components/prisma";
import multer from 'multer';
import path from 'path';
import fs from 'fs';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const directory = path.join(__dirname, 'images', 'pricingPageExclusive');
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        cb(null, directory);
    },
    filename: function (req, file, cb) {
        cb(null, 'image' + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        upload.fields([{ name: 'image', maxCount: 1 }])(req, res, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: "Error uploading the images." });
            }

            const image = req.files['image'] && req.files['image'].length > 0 ? req.files['image'][0].path : null;




            const updateData = {
                title: req.body.title,
                subtitle: req.body.subtitle,
                text: req.body.text,
            };


            if (image) updateData.image = image;

            try {
                const updatedPricingPage = await prisma.pricingpageExclusive.update({
                    where: {
                        id: "1"
                    },
                    data: updateData
                });

                return res.status(200).json(updatedPricingPage);

            } catch (error) {
                console.log(error)
                return res.status(500).json({ error: "Error updating the pricing page." });
            }
        });
    } else {
        return res.status(405).end();
    }
}
