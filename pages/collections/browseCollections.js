import ShowAllCollection from "@/components/collections/showAllCollections"
import prisma from "@/components/prisma"
import Layout from "@/components/layout/layout"

export default function BrowseCollections({ collections }) {
    console.log(collections)
    return (
        <Layout>
            <ShowAllCollection collections={collections} />
        </Layout>
    )
}

export async function getServerSideProps() {
    const collections = await prisma.collection.findMany({
        select: {
            id: true,
            name: true,
            subtitle: true,
            description: true,
            imagepathrelative: true,
            imagepath: true,
            imagepathfolder: true,
            photos: true,
            photographer: true,
        }
    })

    return {
        props: {
            collections
        }
    }
}
