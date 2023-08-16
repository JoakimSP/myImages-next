import prisma from "@/components/prisma";

export default async function handler(req, res) {
  const {
    personID,
    filename,
    filetype,
    filesize,
    url,
    urlUser
  } = req.body

  try {

    await prisma.photos.create({
      data: {
        personID: personID,
        filename: filename,
        filetype: filetype,
        filesize: filesize,
        url: url,
        urlUser: urlUser
      }
    })
    prisma.$disconnect()

    res.status(200).json({ message: "Succsessfully added image data to DB" })

  } catch (error) {
    console.error(error)
  }


}


