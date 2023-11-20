import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    const {
        title,
        filename,
        description,
        category,
        priceLarge,
        priceSmall,
        priceMedium,
        photoID,
        tags,
        categoriesId,
        collectionId,
        isExclusive,
    } = req.body


    const idMap = {};
    photoID.forEach(item => {
        idMap[item.size] = item.id;
    });

console.log(idMap)
    try {

        let data = {
            title: title,
            description: description,
            tags: tags,
            category: category,
            categoriesId: categoriesId,
            exclusive: isExclusive,
            collectionId: null
        }
        if (collectionId != "null") {
            data.collectionId = collectionId
        }

        await prisma.photos.update({
            where: {
                id: idMap['small-wm']
            },
            data: {
                ...data
            }
        })
        await prisma.photos.update({
            where: {
                id: idMap['thumb']
            },
            data: {
                ...data
            }
        })
        await prisma.photos.update({
            where: {
                id: idMap['small']
            },
            data: {
                title: title,
                description: description,
                tags: tags,
                category: category,
                price: parseInt(priceSmall),
            }
        })
        await prisma.photos.update({
            where: {
                id: idMap['medium']
            },
            data: {
                title: title,
                description: description,
                tags: tags,
                category: category,
                price: parseInt(priceMedium),
            }
        })
        await prisma.photos.update({
            where: {
                id: idMap['large']
            },
            data: {
                title: title,
                description: description,
                tags: tags,
                category: category,
                price: parseInt(priceLarge),
            }
        })

        if (isExclusive) {
            await prisma.exclusivecollections.update({
                where: {
                    id: "1"
                },
                data: {
                    photos: {
                        connect: { id: idMap['thumb'] },
                        connect: { id: idMap['small-wm'] },
                    }
                }
            });
        }
        else {
            await prisma.exclusivecollections.update({
                where: {
                    id: "1"
                },
                data: {
                    photos: {
                        disconnect: { id: idMap['thumb'] },
                        disconnect: { id: idMap['small-wm'] },
                    }
                }
            });
        }




        res.status(200).json({ message: "PhotoData updated" })
    } catch (error) {
        console.log(error)
        logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(405).json({ error: `Cant update the photo info ${error}` })
    } finally {
        await prisma.$disconnect()
    }

}