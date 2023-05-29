import prisma from "@/components/prisma"
import fs from "fs"
import path from "path"

export default async function handler(req, res){
    const photoId = Number.parseInt(req.body)

    const photo = await prisma.photos.findUnique({
        where : {
            id : photoId
        }
    })

    try {
        if (photo.url) {
            console.log(path.join(__dirname, '..', '..', '..' ,  '..' , '..' , 'public'  ,photo.thumbnailUrl))
            console.log(path.join(__dirname, '..',  '..' , '..' , '..', '..' , photo.url))
            fs.unlinkSync(path.join(__dirname, '..',  '..' , '..' , '..', '..' , photo.url))
            
        }
        if (photo.thumbnailUrl) {
            fs.unlinkSync(path.join(__dirname, '..', '..', '..' ,  '..' , '..' , 'public'  ,photo.thumbnailUrl))
        }
    } catch (err) {
        console.error("Error deleting files:", err);
        return res.status(500).json({message: "Error deleting files", error: err})
    }

    try {
        const deletePhoto = await prisma.photos.delete({
            where : {
                id : photoId
            }
        })

        prisma.$disconnect()
        res.status(200).json({message: "Delete image"})
    } catch (err) {
        console.error("Error deleting database record:", err);
        return res.status(500).json({message: "Error deleting database record", error: err})
    }
}
