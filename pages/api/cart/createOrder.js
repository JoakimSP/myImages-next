import prisma from "@/components/prisma";
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {

    const { email, cartData, sumOfCart } = req.body
    const { id } = req.body.details
const photoIDsInCart = cartData.map(item => item.photoID);
const photosIDString = photoIDsInCart.join(',');


    try {
        const result = await prisma.receipt.create({
            data: {
                id: id,
                sessionEmail: email,
                cartData: cartData,
                dateAdded: Date.now().toString(),
                price: sumOfCart
            }
        })

        const remove = await prisma.cart.deleteMany({
            where : {
                sessionEmail : email
            }
        })

        await prisma.$disconnect()
        res.status(200).json({ message: "Added a an order in db" });

    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
    }
}
