import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger');

export default async function handler(req, res) {
    if (req.method !== 'POST') { 
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.body;
    try {
        await prisma.$transaction(async (prisma) => {
            // Delete the photographerinfo first
            await prisma.photographerinfo.delete({
                where: {
                    personID: req.body, // Use personID to delete the photographerinfo
                },
            });

            // Then delete the photographer
            await prisma.photographer.delete({
                where: {
                    personID: req.body, // Use personID to delete the photographer
                },
            });
        });

        res.status(200).json({ message: 'Photographer deleted successfully' });
    } catch (error) {
        console.error(error);
        logger.log('error', {
            message: error.message,
            stack: error.stack
        });
        res.status(400).json({ error: 'Could not delete photographer' });
    }
}
