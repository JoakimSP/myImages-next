import { getSession } from "next-auth/react"
import prisma from "@/components/prisma"
import showImages from "@/components/showImages"
const logger = require('@/components/utils/logger')
import Footer from "@/components/footer";

export default function FileName({ photos }) {

    return (
        <>
            <div>{showImages(photos)}</div>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        const session = await getSession(context)
        const photografer = await prisma.photographer.findFirst({
            where: {
                email: session.user.email
            }
        })

        const photos = await prisma.photos.findMany({
            where: {
                personID: photografer.personID
            }
        })

        await prisma.$disconnect()
        return {
            props: { photos }
        }
    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        })
    }
}