import Link from "next/link"
import Image from "next/image"
import blurDataURL from "../svgSkeleton"
export default function ShowAllCollection({ collections }) {


    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-12">
                {collections.map((col) => {
                    return (
                        <Link key={col.id} href={`/collections/viewCollections?collectionID=${col.id}`}>
                            <div className="group relative h-96">
                                <Image
                                    src={`/api/images/getFeaturedColImages?imagePath=${col.imagepathrelative}`}
                                    alt="Collection image"
                                    fill={true}
                                    className="object-cover w-full"
                                    sizes="(max-width: 500px) 50vw 33vw"
                                    quality={1}
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
                                />
                            </div>
                            <div className="pt-6"><h3 className="text-center text-3xl text-white">{col.name}</h3></div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}