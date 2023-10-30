import prisma from "@/components/prisma"

export default async function handler(req, res) {
    const { collections, collectionToRemove } = JSON.parse(req.body);
    const collectionIds = Object.values(collections).map(col => col.id);
    const newCollection = Object.values(collections).filter(col => col.id != collectionToRemove);

    try {
        await prisma.featuredcollections.update({
            where: {
                id: "1"
            },
            data: {
                collection: {
                    disconnect: collectionIds.map(id => ({ id }))
                }
            }
        });

        for (const col of newCollection) {
            await prisma.featuredcollections.update({
                where: {
                    id: "1"
                },
                data: {
                    collection: {
                        connect: {
                            id: col.id
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
    }

    res.status(200).json({ message: "fhewjhfw" });
}
