import prisma from "@/components/prisma"
import { logger } from "@/components/utils/logger"

export default async function handler(req, res) {

    const { id } = req.body

    try {
       await prisma.categories.delete({
       where: {
        id: id
       }
       })

       res.status(200).json({ message: ' category deleted' })
    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(500).json({Error: error})
    }

    
}