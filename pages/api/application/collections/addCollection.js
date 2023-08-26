import prisma from "@/components/prisma"

export default async function handler(req, res) {

    const { name, description, image, photographerID } = req.body

    try {
        const response = await prisma.collection.create({
            data: {
                name: name,
                description: description,
                image: image,
                photographer: { // Use photographer instead of photographerPersonID
                    connect: {
                        personID: parseInt(photographerID) // Make sure the ID is an integer
                    }
                }
            }
        })



        
        res.status(200).json({ message: 'New collection added' })



    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: error })
    }


}
