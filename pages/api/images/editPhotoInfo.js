import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger')

export default async function handler(req, res){
    const {
        title,
        description,
        category,
        price,
        priceSmall,
        priceMedium,
        photoID,
        tags,
        categoriesId,
        collectionId,
        exclusive
    } = req.body

   

    try {
        const result = await prisma.photos.update({
            where : {
                id : photoID
            },
            data: {
                title: title,
                description: description,
                tags: tags,
                category: category,
                price: parseInt(price),
                pricesmall: parseInt(priceSmall),
                pricemedium: parseInt(priceMedium),
                categoriesId: categoriesId,
                collectionId: collectionId,
                exclusive: exclusive
            }
        })
        res.status(200).json({message: "PhotoData updated"})
    } catch (error) {
        console.log(error)
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(405).json({ error: `Cant update the photo info ${error}` })
    } finally{
        await prisma.$disconnect()
      }
    
}