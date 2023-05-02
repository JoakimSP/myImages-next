import Image from "next/image"
import prisma from "../../components/prisma"

export default function ViewImage({ photo }) {
    const {url, filename, title} = photo
    return (
        <div>
            <h1>Image</h1>
            <Image
                src={`/${url}/${filename}`}
                width={800}
                height={600}
                alt={`${title}`}
            />
        </div>
    )
}


export async function getServerSideProps(context) {
    const { query } = context
    console.log(query.viewImage)

    const photo = await prisma.photos.findFirst({
        where: {
            filename: query.viewImage
        },
    })


    return {
        props: { photo }
    }
}
