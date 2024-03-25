import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger')


export default async function handler(req, res) {

    try {
        
   
   const photoInformation = await prisma.photos.findMany({
        where: {
            id : {in : req.body }
        }
    })

    res.status(200).json(photoInformation)

} catch (error) {
    logger.log('error', {
        message: error.message,
        stack: error.stack
    })
    res.status(500).json({Error: error})
}

    
  }
  