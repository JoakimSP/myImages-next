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


export default function ShowImagesNext({ photos }) {
  const [imageData, setImageData] = useState([]);

  const groupedPhotos = photos.reduce((acc, photo) => {
    const key = `${photo.title}-${photo.filename}`;
    acc[key] = acc[key] || [];
    acc[key].push(photo);
    return acc;
  }, {});

  const firstPhotoKey = Object.keys(groupedPhotos)[0];
  const firstPhotoThumb = groupedPhotos[firstPhotoKey]?.find(p => p.size === 'thumb');
  const firstPhotoSmallWm = groupedPhotos[firstPhotoKey]?.find(p => p.size === 'small-wm');

  return (
    <ErrorBoundary>
      <div className="w-full p-5 pb-10 mx-auto mb-10 gap-5 columns-1 md:columns-2 lg:columns-3 space-y-5 bg-custom-grey">
        {Object.entries(groupedPhotos).map(([key, photoGroup], index) => {
          const thumbPhoto = photoGroup.find(p => p.size === 'thumb');
          const smallWmPhoto = photoGroup.find(p => p.size === 'small-wm');
          return (
            <Link key={key} href={`/images/viewimage?img=${encodeURIComponent(smallWmPhoto?.filepath)}&folderpath=${smallWmPhoto?.folderpath}`}>
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
    </ErrorBoundary>
  )
}
