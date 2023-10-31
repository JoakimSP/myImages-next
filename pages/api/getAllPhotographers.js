import prisma from "@/components/prisma";


export default async function handler(req, res) {

try {
    const data = await prisma.photographer.findMany()

    res.status(200).send(data)
} catch (error) {
    console.log(error)
}
}