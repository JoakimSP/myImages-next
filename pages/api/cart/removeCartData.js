import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    const {
        id,
      userEmail
    } = req.body

     try {
        const result = await prisma.cart.deleteMany({
            where: {
                photoID : parseInt(id),
                sessionEmail: userEmail
            }
        }) 
        res.status(200).json({message: "Removed from cart"})
    } catch (error) {
        logger.logger.log('error', error)
        res.status(500).json({message: "Server error"})
    } finally{
        await prisma.$disconnect()
      } 
}
  