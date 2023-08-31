import prisma from "@/components/prisma"
const logger = require('@/components/utils/logger')
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/components/firebase";

export default async function handler(req, res) {

    const { name, description, image, photographerID, id, imageDelete } = req.body
    console.log(imageDelete)

    try {
         await prisma.collection.update({
            where : {
                id : id
            },
            data: {
                name: name,
                description: description,
                image: image,
                photographerPersonID: photographerID
            }
        })
        const storageRef = await ref(storage, imageDelete)
       await deleteObject(storageRef)
        
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
