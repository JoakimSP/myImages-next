import prisma from "@/components/prisma";

export default async function handler(req, res) {
    const {
        id,
    } = req.body

    try {
        const result = await prisma.cart.delete({
            where: {
                photoID : parseInt(req.body),
            }
        })
        res.status(200).json({message: "Removed from cart"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error"})
    } finally{
        await prisma.$disconnect()
      }
}
  