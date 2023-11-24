import prisma from "@/components/prisma";

export default async function handler(req, res) {
    const { title, subtitle } = req.body;

    try {
        await prisma.photographerPage.update({
            where: {
                id: "1"
            },
            data: {
                title: title,
                subtitle: subtitle
            }
        })
        res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
        console.log(error)
        logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(500).json({ message: "Something went wrong on the server" });
    } finally {
        prisma.$disconnect()
    }

    res.end()
}
