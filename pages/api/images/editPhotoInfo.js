import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger')

export default async function handler(req, res){
    const {
        title,
        description,
        category,
        price,
        photoID
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
                price: parseInt(price), 
            }
        })
        res.status(200).json({message: "PhotoData updated"})
    } catch (error) {
        logger.logger.log('error', error)
        res.status(405).json({ error: `Cant update the photo info ${error}` })
    } finally{
        await prisma.$disconnect()
      }
    
}