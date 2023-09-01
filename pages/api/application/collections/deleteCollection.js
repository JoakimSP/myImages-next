import prisma from "@/components/prisma"
import { logger } from "@/components/utils/logger"
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/components/firebase";

export default async function handler(req, res) {

    const { id } = req.body


    try {
      const collection = await prisma.collection.findFirst({
       where: {
        id: id
       }
       })
       console.log(collection.image)
       const storageRef = await ref(storage, `${collection.image}`)
       await deleteObject(storageRef)

       await prisma.collection.delete({
        where: {
         id: id
        }
        })

       res.status(200).json({ message: ' category deleted' })
    } catch (error) {
        logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(500).json({Error: error})
    }

    
}