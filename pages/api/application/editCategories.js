import prisma from "@/components/prisma"

export default async function handler(req, res) {

    const { categoryName } = req.body

    try {
       await prisma.categories.create({
        data : {
            name: categoryName
        }
       })

       res.status(200).json({ message: 'New category added' })
    } catch (error) {
        res.status(500).json({Error: error})
    }

    
}
