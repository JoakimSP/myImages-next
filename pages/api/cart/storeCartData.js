import prisma from "@/components/prisma";

export default async function handler(req, res) {
    const {
        id,
        session
    } = req.body
    
     if (!session) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }

    try {
        const result = await prisma.cart.create({
            data: {
                photoID : id,
                sessionEmail: session
            }
        })
        res.status(200).json({message: "Added to cart"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error"})
    } 
}
  
  