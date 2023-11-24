import Image from "next/image";
import Link from "next/link";



export default function ShowPhotographerCollection({photographer}) {
 const { collection } = photographer


 
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {collection.map((col) => {
            return (
                <Link key={col.id} href={`/collections/viewCollections?collectionID=${col.id}`}>
                    <div className="group relative h-96">
                        <Image
                        src={`/api/images/getFeaturedColImages?imagePath=${col.imagepathrelative}`}
                        alt="Collection image"
                        fill={true}
                        className="object-cover w-full"
                        sizes="(max-width: 768px)"
                                      />
                    </div>
                    <div className="pt-6"><h3 className="text-center text-3xl text-white">{col.name}</h3></div>
                </Link>
            )
        })} 
    </div>
  )
}

