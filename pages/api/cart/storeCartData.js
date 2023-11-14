import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger');

export default async function handler(req, res) {
    const {
        session,
        priceOption,
        filename,
        thumbnail
    } = req.body;

    if (!session) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }

    try {
        const selectedImage = await prisma.photos.findFirst({
            where: {
                filename: filename,
                size: priceOption.size,
            },
        });

        if (!selectedImage) {
            res.status(404).json({ message: "Image not found" });
            return;
        }

        // Check if the image is already in the cart for the given session
        const existingCartEntry = await prisma.cart.findFirst({
            where: {
                photoID: selectedImage.id,
                sessionEmail: session,
            },
        });

        if (existingCartEntry) {
            res.status(400).json({ message: "You already have this image in your cart" });
            return;
        }

        await prisma.cart.create({
            data: {
                photoID: selectedImage.id,
                sessionEmail: session,
                priceoption: parseInt(priceOption.price),
                thumbnail: thumbnail
            },
        });

        res.status(200).json({ message: "Added to cart" });
    } catch (error) {
        logger.log('error', {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ message: "Server error" });
    } finally {
        await prisma.$disconnect();
    }
}
