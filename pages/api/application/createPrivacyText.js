import prisma from "@/components/prisma"
import { logger } from "@/components/utils/logger"

export default async function handler(req, res) {

     try {
       await prisma.privacypolicy.update({
        where: {
            id: "1"
        },
        data : {
            text: req.body
        }
       })

       res.status(200).json({ message: 'New text added' })
    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(500).json({Error: error})
    } 
    
}