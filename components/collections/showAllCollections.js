import Link from "next/link";
import Image from "next/image";
import blurDataURL from "../svgSkeleton";
import { useState } from 'react';

export default function ShowAllCollection({ collections }) {
    const [loadingId, setLoadingId] = useState(null);

    const handleClick = (id) => {
        setLoadingId(id);
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-12">
                {collections.map((col) => {
                    const isLoading = col.id === loadingId;

                    return (
                        <Link key={col.id} href={`/collections/viewCollections?collectionID=${col.id}`}>
                            <div  className="group relative h-96" onClick={() => handleClick(col.id)}>
                                <Image
                                    src={`/api/images/getFeaturedColImages?imagePath=${col.imagepathrelative}`}
                                    alt="Collection image"
                                    fill={true}
                                    className="object-cover w-full"
                                    sizes="(max-width: 500px) 50vw, 33vw"
                                    quality={20}
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
                                />
                                {isLoading && (
                                    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
                                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="pt-6">
                                <h3 className="text-center text-3xl text-white">{col.name}</h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
