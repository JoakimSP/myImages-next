import prisma from "@/components/prisma"
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }) }

    const { username, firstname, lastname, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
        
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword,
        user: username
    }

    try {
        const createPhotographer = await prisma.photographer.create({data: newUser})

        res.status(200).json({ Message: 'Add new photographer' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'could not add new photographer' })
    }
}