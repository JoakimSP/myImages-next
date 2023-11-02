import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    const {
        title,
        filename,
        description,
        category,
        priceOriginal,
        priceLarge,
        priceSmall,
        priceMedium,
        photoID,
        tags,
        categoriesId,
        collectionId,
        isExclusive
    } = req.body



    const idMap = {};
    photoID.forEach(item => {
        idMap[item.size] = item.id;
    });


    try {
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
                categoriesId: categoriesId,
                collectionId: collectionId,
                exclusive: isExclusive
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
        await prisma.photos.update({
            where: {
                id: idMap['original']
            },
            data: {
                title: title,
                description: description,
                tags: tags,
                category: category,
                price: parseInt(priceOriginal),
            }
        })

        if (isExclusive) {
            await prisma.exclusivecollections.update({
                where: {
                    id: "1"
                },
                data: {
                    photos: {
                        connect: { id: idMap['small'] }
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