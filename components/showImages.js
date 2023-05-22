import Image from "next/image";
import Link from "next/link";

export default function showImages(photos) {


  return (
    <div className="images">
        {Object.values(photos).map((photo, index) => {
          if (photo) {
            return (
              <>
              <Link key={index} href={`/images/${photo.filename}`}>
              <Image        
                src={`/${photo.url}/thumbnail-${photo.filename}`}
                alt="Something"
                width={300}
                height={300}
              />
              <p style={{display: "inline"}}>{photo.title}</p> 
              </Link>               
              </>
            );
          }
        })}
      </div>
  )
}
