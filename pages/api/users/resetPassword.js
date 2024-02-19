import prisma from "@/components/prisma"
import bcrypt from 'bcrypt'
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }) }

    const { id, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.photographer.update({
            where: {
                personID: id
            },
            data: {
                password: hashedPassword
            }
        })

        res.status(200).json({messahe: "The password has been updated"})
    } catch (error) {
        console.log(error)
        logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(400).json({ error: 'could not update password' })
    }
}