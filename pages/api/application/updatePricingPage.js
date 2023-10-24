import prisma from "@/components/prisma";
import multer from 'multer';
import path from 'path';

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/pricingPage/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Use Date.now() to ensure unique names
  }
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,  // Disabling Next.js's body parser as multer will handle it
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handling image uploads using multer
    upload.fields([{ name: 'imageleft', maxCount: 1 }, { name: 'imageright', maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Error uploading the images." });
      }

      // Extracting image paths
      const imageUrlLeft = req.files.imageleft ? req.files.imageleft[0].path : null;
      const imageUrlRight = req.files.imageright ? req.files.imageright[0].path : null;

      try {
        const {
          title,
          subtitle,
          imagelefttitle,
          imageleftsubtitle,
          imageleftprice,
          imagerighttitle,
          imagerightsubtitle,
          imagerightprice,
          footertext,
        } = req.body;

        const updatedPricingPage = await prisma.pricingpage.update({
          where: {
            id: "1"
          },
          data: {
            title,
            subtitle,
            imageUrlLeft,
            imageTitleLeft: imagelefttitle,
            imageSubTitleLeft: imageleftsubtitle,
            imagePriceLeft: imageleftprice,
            imageUrlRight,
            imageTitleRight: imagerighttitle,
            imageSubTitleRight: imagerightsubtitle,
            imagePriceRight: imagerightprice,
            footerText: footertext,
          }
        });

        return res.status(200).json(updatedPricingPage);

      } catch (error) {
        return res.status(500).json({ error: "Error updating the pricing page." });
      }
    });
  } else {
    return res.status(405).end();
  }
}
