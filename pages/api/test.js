import prisma from "@/components/prisma"

export default async function handler(req, res) {

    try {
        const photos = await prisma.photos.findMany()

        if(photos){
            res.status(200).json({photos})
        }
    } catch (error) {
        res.error({error})
    }

  }
  