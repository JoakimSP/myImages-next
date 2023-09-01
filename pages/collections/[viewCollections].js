const logger = require('@/components/utils/logger')
import prisma from '@/components/prisma';
import Layout from '@/components/layout/layout';
import Image from 'next/image';

export default function ViewCollections({ collection }) {
    console.log(collection)
    return (
        <Layout>
            <div className='grid'>
                <div className=''>
                    <Image
                        src={collection.image}
                        width={"1920"}
                        height={"600"}
                        alt={collection.name}
                        className={"object-cover"}
                    />
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    {collection.photos.map((photo) => {
                        return (
                            <Image
                                src={photo.url}
                                alt="image"
                                fill={true}
                                className="object-cover w-full"
                                sizes="(max-width: 768px)"
                                key={photo.id}
                            />
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { collectionID } = context.query;

    let collection;
    let props = {}
    try {
        collection = await prisma.collection.findUnique({
            where: { id: collectionID },
            select: {
                name: true,
                description: true,
                image: true,
                photos: true,
                subtitle: true,
            }
        });

        /* await prisma.collection.update({
            where: { id: collectionID },
            data: { countViewd: { increment: 1 } },
        }); */

        if (collection) {
            props = { collection }
            console.log("second try", collection)
        }

    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack

        });
    } finally {
        prisma.$disconnect();
    }

    return { props };

}

