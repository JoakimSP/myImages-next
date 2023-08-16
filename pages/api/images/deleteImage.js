import prisma from "@/components/prisma"
import fs from "fs"
import path from "path"
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/components/firebase";
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    const {
        personID,
        url,
        urlUser,
        id,
        filename,
    } = req.body
    const folderRef = ref(storage, `${urlUser}`)
    const storageRef = ref(storage, `${url}`)



    try {
        if (url) {
            deleteObject(storageRef).then(() => {
                deleteObject(folderRef)
            })

        }

        const deletePhoto = await prisma.photos.delete({
            where: {
                id: id
            }
        })

        prisma.$disconnect()

        if(deletePhoto){res.status(200).json({ message: "Delete image" })}
    } catch (err) {
        logger.logger.log('error', err)
        return res.status(500).json({ message: "Error deleting files", error: err })
    }

}
