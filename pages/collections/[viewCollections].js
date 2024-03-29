const logger = require('@/components/utils/logger')
import prisma from '@/components/prisma';
import Layout from '@/components/layout/layout';
import Image from 'next/image';

export default function ViewCollections({ collection }) {
    const twoItemRow = (index) => (index - 1) % 5 === 2 || (index - 1) % 5 === 3;
    let counter = 0
    const firstPhoto = collection.photos.slice(0, 1)

    return (
        <Layout>
            <div className='flex flex-col w-full h-screen' >
                <div className="relative h-2/3">
                    <Image src={collection.image} alt={collection.name} fill={true} className={"object-cover"} />
                    <div className='flex justify-center items-center absolute text-9xl z-10 text-white w-full h-full'>
                        <h1 className='mb-44'>{collection.name}</h1>
                    </div>
                </div>



                <div className='flex'>
                    <div className="flex-1 h-96 bg-custom-grey text-white text-left p-4">
                        <div className='p-12'>
                            <h2 className='text-6xl'>{collection.name}</h2>
                            <p className='text-3xl mb-8'>{collection.subtitle}</p>
                            <p className='text-lg'>{collection.description}</p>
                        </div>
                    </div>
                    {firstPhoto && firstPhoto.length > 0 && (
                        <div className="flex-1 h-96 bg-custom-grey text-white pt-4 pr-4">
                            <div className="relative w-full h-full">
                                <Image src={firstPhoto[0].url} alt={collection.name} fill={true} className={"object-cover"} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full p-5 pb-10 mx-auto mb-10 gap-5 columns-1 md:columns-2 lg:columns-3 space-y-5 bg-custom-grey'>
                {collection.photos && collection.photos.length > 0 && (
                    collection.photos.slice(1).map((photo, index) => {

                        return (
                            
                                <Image key={photo.id} src={photo.url} alt="image" width={photo.width} height={photo.height}/>
                            
                        );


                    })
                )}

            </div>

        </Layout >
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

