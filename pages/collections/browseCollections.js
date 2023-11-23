import ShowAllCollection from "@/components/collections/showAllCollections"
import prisma from "@/components/prisma"
import Layout from "@/components/layout/layout"

export default function BrowseCollections({ collections }) {
    return (
        <Layout>
            <div className="my-16">
                <div className="my-16">
                    <h1 className="text-white text-7xl text-center font-light mb-4">Browse our Collections</h1>
                    <h3 className="text-white text-3xl px-4 lg:px-36 text-center mb-4">Here you&apos;ll find all of our available Collections where we have gathered images in the same style and theme in pre selected Collection folders.</h3>
                </div>
                <ShowAllCollection collections={collections} />
            </div>
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
