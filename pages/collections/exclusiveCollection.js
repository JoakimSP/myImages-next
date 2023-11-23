import Layout from "@/components/layout/layout"
const logger = require('@/components/utils/logger')
import prisma from '@/components/prisma';
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";


export default function ExclusiveCollection({ collection, photos }) {
    const [images, setImages] = useState([]);

 

    const groupedPhotos = photos.reduce((acc, photo) => {
        const key = `${photo.title}-${photo.filename}`;
        acc[key] = acc[key] || [];
        acc[key].push(photo);
        return acc;
    }, {});

    const firstPhotoKey = Object.keys(groupedPhotos)[0];
    const firstPhotoThumb = groupedPhotos[firstPhotoKey]?.find(p => p.size === 'thumb');
    const firstPhotoSmallWm = groupedPhotos[firstPhotoKey]?.find(p => p.size === 'small-wm');

    const twoItemRow = (index) => (index - 1) % 5 === 2 || (index - 1) % 5 === 3;
    let counter = 0
    const firstPhoto = collection.photos.slice(0, 1)
    return (
        <Layout>
            <div className='flex flex-col w-full h-screen' >
                <div className="relative h-2/3">
                    <Image src={`/api/images/viewImage?name=${collection.heroImagepath}`} alt={collection.title} fill={true} className={"object-cover"} />
                    <div className='flex justify-center items-center absolute text-3xl md:text-9xl z-10 text-white w-full h-full'>
                        <h1 className='mb-44 text-center'>{collection.title}</h1>
                    </div>
                </div>
                <div className='flex'>
                    <div className="flex-1 h-96 bg-custom-grey text-white text-left p-4">
                        <div className='p-12'>
                            <h2 className='text-2xl md:text-6xl'>{collection.title}</h2>
                            <p className='text-lg md:text-3xl mb-8'>{collection.subtitle}</p>
                            <p className='text-base md:text-lg whitespace-pre-wrap'>{collection.information}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full p-5 pb-10 mx-auto mb-10 gap-5 columns-1 md:columns-2 lg:columns-3 space-y-5 bg-custom-grey'>
                {Object.entries(groupedPhotos).map(([key, photoGroup], index) => {
                    
                    const thumbPhoto = photoGroup.find(p => p.size === 'thumb');
                    const smallWmPhoto = photoGroup.find(p => p.size === 'small-wm');
                    return (
                        <Link key={key} href={`/viewExclusiveImage/viewimage?img=${encodeURIComponent(smallWmPhoto?.filepath)}&folderpath=${smallWmPhoto?.folderpath}`}>
                            <Image
                                src={`/api/images/viewImage?name=${thumbPhoto?.filepath}`}
                                alt={thumbPhoto?.title || 'image'}
                                width={thumbPhoto?.width}
                                height={thumbPhoto?.height}
                                className="mb-5"
                                layout='responsive' />
                        </Link>
                    );
                })}

            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { collectionID } = context.query;

    let collection;
    let props = {}
    try {
        collection = await prisma.exclusivecollections.findUnique({
            where: { id: "1" },
            select: {
                title: true,
                subtitle: true,
                information: true,
                heroImagepath: true,
                heroImagepathrelative: true,
                photos: true,
                photographerPersonID: true
            }
        });
        if (collection && collection.photos) {
            const folderpaths = collection.photos.map(photo => photo.folderpath);
            const photos = await prisma.photos.findMany({
                where: {
                    AND: [ 
                        {
                            folderpath: {
                                in: folderpaths
                            },
                        },
                        {
                            OR: [ 
                                { size: "thumb" },
                                { size: "small-wm" }
                            ]
                        }
                    ],
                    active : true
                }
            });

            props = { collection, photos };
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


