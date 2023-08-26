import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    const {
        personID,
        country,
        city,
        about,
        camera,
        lens,
        favoritePhoto,
        photoPreference,
        careerStart
    } = req.body



    const updateData = {}

    Object.keys(req.body).map((key) => {
        if (req.body[key]) {
          updateData[key] = req.body[key];
        }
      });
      
      delete updateData.personID;


    try {
        const result = await prisma.photographerinfo.update({
            where: {
                personID: personID
            },
            data: updateData
        })
        res.redirect("/")

    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(405).json({ error: `Cant update the photografers info ${error}` })
    }
}


