import prisma from "@/components/prisma"
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {

    const { name, description, image, photographerID, subtitle, isFeaturedcol } = req.body
    
    try {
        const response = await prisma.collection.create({
            data: {
                name: name,
                description: description,
                image: image,
                photographerPersonID: photographerID,
                subtitle: subtitle
            }
        })

        try {
            if (isFeaturedcol) {
                await prisma.featuredcollections.update({
                    where: {
                        id: "1"
                    },
                    data: {
                        collection: {
                            connect: {
                                id: response.id
                            }
                        }
                    }
                }) 
            }
        } catch (error) {
            logger.logger.log('error', {
                message: error.message,
                stack: error.stack
            })
            console.log(error)
        }



        
        res.status(200).json({ message: 'New collection added' })



    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        console.log(error)
        res.status(500).json({ Error: error })
    }


}
