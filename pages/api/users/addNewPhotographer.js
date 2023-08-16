import prisma from "@/components/prisma"
import bcrypt from 'bcrypt'
const logger = require('@/components/utils/logger')

export default async function handler(req, res) {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }) }

    const { username, firstname, lastname, email, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {

        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword,
        user: username,
        role: role,
        info: {
            create: {}
        }
    }

    try {
        const createPhotographer = await prisma.photographer.create({ data: newUser })
    } catch (error) {

        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
        res.status(400).json({ error: 'could not add new photographer' })
    }
}