import prisma from "@/components/prisma";
import multer from 'multer';
import path from 'path';



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/pricingPage/');
  },
  filename: function (req, file, cb) {

    if(file.fieldname === 'imageleft') {
      cb(null, 'imageleft' + path.extname(file.originalname));
    } else if(file.fieldname === 'imageright') {
      cb(null, 'imageright' + path.extname(file.originalname));
    } else {
      cb(null, Date.now() + path.extname(file.originalname));
    }
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
    upload.fields([{ name: 'imageleft', maxCount: 1 }, { name: 'imageright', maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Error uploading the images." });
      }


      const imageUrlLeft = req.files.imageleft ? req.files.imageleft[0].path : null;
      const imageUrlRight = req.files.imageright ? req.files.imageright[0].path : null;

      const updateData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        imageTitleLeft: req.body.imagelefttitle,
        imageSubTitleLeft: req.body.imageleftsubtitle,
        imagePriceLeft: req.body.imageleftprice,
        imageTitleRight: req.body.imagerighttitle,
        imageSubTitleRight: req.body.imagerightsubtitle,
        imagePriceRight: req.body.imagerightprice,
        footerText: req.body.footertext,
      };


      if(imageUrlLeft) updateData.imageUrlLeft = imageUrlLeft;
      if(imageUrlRight) updateData.imageUrlRight = imageUrlRight;

      try {
        const updatedPricingPage = await prisma.pricingpage.update({
          where: {
            id: "1"
          },
          data: updateData
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
