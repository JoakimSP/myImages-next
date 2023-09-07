import prisma from "@/components/prisma";

export default async function handler(req, res) {
  const {
    urlUser,
    userdata
  } = req.body

  try {

    await prisma.photographer.update({
        where: {
            personID: userdata.personID
        },
      data: {
        heropicture: urlUser
      }
    })
    prisma.$disconnect()

    res.status(200).json({ message: "Succsessfully added image data to DB" })

  } catch (error) {
    console.error(error)
  }


}


