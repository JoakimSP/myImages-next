import Image from "next/image";
import Link from "next/link";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import ErrorBoundary from "./errorBoundery";

export function ShowPhotographerImage(photographer) {
  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, `${photographer}`);

 

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      const promises = res.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImageList(urls);
      });
    });
  }, []);

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageList.map((url) => {

          return (
            <Link key={crypto.randomUUID()} href={`/images/viewimage?img=${encodeURIComponent(url)}`}>
              <div className="group relative h-60">
                <Image
                  src={url}
                  alt="image"
                  fill={true}
                  className="object-cover w-full"
                  sizes="(max-width: 768px)"
                />
              </div>
            </Link>
          )
        })}
      </div>
    </ErrorBoundary>
  )
}


export default function ShowImagesNext({photos}) {
 /*  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "/"); */

 

/*   useEffect(() => {
    listAll(imageListRef).then((res) => {
      const promises = res.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImageList(urls);
      });
    });
  }, []); */



// 
  return (
    <ErrorBoundary>
      <div className="w-full p-5 pb-10 mx-auto mb-10 gap-5 columns-1 md:columns-2 lg:columns-3 space-y-5 bg-custom-grey">
        {photos.map((photo, index) => {
            return (
              <Link  key={index} href={`/images/viewimage?img=${encodeURIComponent(photo.url)}`}>
              <Image
                src={photo.url}
                alt="image"
                width={photo.width}
                height={photo.height}
                className="my-5"
              />         
              </Link>
            );
        })}
      </div>
    </ErrorBoundary>
  )
}
