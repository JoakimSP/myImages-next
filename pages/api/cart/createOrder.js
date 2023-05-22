import prisma from "@/components/prisma";

export default async function handler(req, res) {

    const { email, photosInCart } = req.body
    const { id } = req.body.details
const photoIDsInCart = photosInCart.map(item => item.id);
const photosIDString = photoIDsInCart.join(',');


    try {
        const result = await prisma.completedorders.create({
            data: {
                id: id,
                sessionEmail: email,
                photosID: photosIDString
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
        console.log(error)
    }
}
