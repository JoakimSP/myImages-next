import prisma from "@/components/prisma";

export default async function handler(req, res) {
    const {
        id,
      userEmail
    } = req.body
    console.log(id)
    console.log(userEmail)

     try {
        const result = await prisma.cart.deleteMany({
            where: {
                photoID : parseInt(id),
                sessionEmail: userEmail
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
  