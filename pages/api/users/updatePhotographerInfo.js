import prisma from "@/components/prisma";

export default async function handler(req, res) {
    const {
        personID,
        country,
        city,
        about,
        camera,
        lens,
        FavoritePhoto,
        PhotoPreference,
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
                personID: parseInt(personID)
            },
            data: updateData
        })
        res.status(200).json({ message: "Updated photographers information" })

    } catch (error) {
        res.status(405).json({ error: `Cant update the photografers info ${error}` })
    }
}


