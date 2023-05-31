import Image from "next/image";
import Link from "next/link";

export default function showImages(photos) {


  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {Object.values(photos).map((photo, index) => {
    if (photo) {
      return (
        <div key={index} className="group relative h-60">
          <Link href={`/images/${photo.filename}`}>

              <Image
                src={`/${photo.thumbnailUrl}`}
                alt=""
                fill={true}
                className="object-cover w-full"
              />
              <p className="text-sm mt-2 group-hover:text-blue-600">{photo.title}</p>
          </Link>
        </div>
      );
    }
  })}
</div>

  
  )
}
