const logger = require('@/components/utils/logger')
import prisma from '@/components/prisma';
import Layout from '@/components/layout/layout';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';


export default function ViewCollections({ collection }) {
    const [images, setImages] = useState([]);
    const { photos } = collection;

    // Group photos by title and filename
    const groupedPhotos = photos.reduce((acc, photo) => {
        const key = `${photo.title}-${photo.filename}`;
        acc[key] = acc[key] || [];
        acc[key].push(photo);
        return acc;
    }, {});

    // Get the first photo's thumbnail
    const firstPhotoKey = Object.keys(groupedPhotos)[0];
    const firstPhotoThumb = groupedPhotos[firstPhotoKey]?.find(p => p.size === 'thumb');
    const firstPhotoSmallWm = groupedPhotos[firstPhotoKey]?.find(p => p.size === 'small-wm');


    return (
        <Layout>
            <div className='w-full h-auto min-h-screen' >
                {/* Collection Header Image and Name */}
                    <div className="min-h-[600px] man-h-[800px]">
                        <div className='relative w-full h-[66vh]'>
                            <Image src={`/api/images/viewImage?name=${collection.imagepath}`} alt={collection.name} fill={true} className={"object-cover"} />
                            <div className='flex justify-center items-center absolute text-3xl md:text-9xl z-10 text-white w-full h-full'>
                                <h1 className='mb-44 text-center'>{collection.name}</h1>
                            </div>
                        </div>
                    </div>
                    {/* Collection Description and First Photo */}
                    <div className='flex flex-col md:flex-row'>
                        <div className="flex-1 h-96 bg-custom-grey text-white text-left p-4 overflow-hidden">
                            <div className='p-2 md:p-12 overflow-hidden'>
                                <h2 className='text-3xl md:text-6xl'>{collection.name}</h2>
                                <p className='text-xl mb-8'>{collection.subtitle}</p>
                                <p className='text-lg'>{collection.description}</p>
                            </div>
                        </div>
                        {firstPhotoThumb && (
                            <div className="flex-1 h-96 bg-custom-grey text-white pt-4 pr-4 md:block hidden">
                                <div className="relative w-full h-full">
                                    <Link href={`/images/viewimage?img=${encodeURIComponent(firstPhotoSmallWm?.filepath)}&folderpath=${firstPhotoSmallWm?.folderpath}`}>
                                        <Image src={`/api/images/viewImage?name=${firstPhotoThumb.filepath}`} alt={collection.name} fill={true} className={"object-cover"} quality={100}/>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Collection Photos Grid */}
                    <div className='w-full p-5 pb-10 mx-auto mb-10 gap-5 columns-1 md:columns-2 lg:columns-3 space-y-5 bg-custom-grey'>
                        {Object.entries(groupedPhotos).map(([key, photoGroup], index) => {
                            if (index === 0) return null; // Skip the first photo, already displayed
                            const thumbPhoto = photoGroup.find(p => p.size === 'thumb');
                            const smallWmPhoto = photoGroup.find(p => p.size === 'small-wm');
                            return (
                                <Link key={key} href={`/images/viewimage?img=${encodeURIComponent(smallWmPhoto?.filepath)}&folderpath=${smallWmPhoto?.folderpath}`}>
                                        <Image
                                            src={`/api/images/viewImage?name=${thumbPhoto?.filepath}`}
                                            alt={thumbPhoto?.title || 'image'}
                                            width={thumbPhoto?.width}
                                            height={thumbPhoto?.height}
                                            className="my-5"
                                            layout='responsive' />
                                </Link>
                            );
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
                imagepath: true,
                imagepathrelative: true,
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
        }

    } catch (error) {
        logger.log('error', {
            message: error.message,
            stack: error.stack

        });
    } finally {
        prisma.$disconnect();
    }

    return { props };

}

