import prisma from "@/components/prisma";

export default async function handler(req, res) {

    const {id} = JSON.parse(req.body)
    console.log(id)
try {
    await prisma.contact.delete({
        where : {
            id : id
        }
    })

    return res.status(200).json({message: "Succefully deleted the mail with id:" + id})
} catch (error) {
    console.log(error)
    return res.status(500).json({Error: error})
}
}