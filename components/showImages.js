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

  useEffect(() => {
    const thumbPhotos = photos.filter(photo => photo.size === "thumb");
    const wmPhotos = photos.filter(photo => photo.size === "small-wm");

    // Create a mapping between thumbnail filepaths and corresponding watermark filepaths
    const photoMapping = thumbPhotos.map(thumbPhoto => {
      const wmPhoto = wmPhotos.find(wm => wm.title === thumbPhoto.title && wm.personID === thumbPhoto.personID);
      return {
        thumb: thumbPhoto.filepath,
        wm: wmPhoto ? wmPhoto.filepath : null,
        wmFolderpath: wmPhoto ? wmPhoto.folderpath : null,
      };
    });

    async function fetchImages() {
      const response = await fetch('/api/images/getImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paths: photoMapping.map(p => p.thumb) }),
      });

      if (response.ok) {
        const imagesBase64 = await response.json();
        const combinedData = photoMapping.map(p => ({
          thumbSrc: `data:image/jpg;base64,${imagesBase64[p.thumb]}`, // Assuming all images are PNGs.
          wmPath: p.wm,
          wmFolderpath: p.wmFolderpath,
        })).filter(p => p.wmPath && p.wmFolderpath); // Ensure both thumbnail and watermark data are present
        setImageData(combinedData);
      } else {
        console.error('Failed to fetch images.');
      }
    }

    fetchImages();
  }, [photos]);

  if (imageData.length === 0) return <p className="text-center text-6xl text-white font-thin">No images found</p>;

  return (
    <ErrorBoundary>
      <div className="w-full p-5 pb-10 mx-auto mb-10 gap-5 columns-1 md:columns-2 lg:columns-3 space-y-5 bg-custom-grey">
        {imageData.map((data, index) => (
          <Link key={index} href={`/images/viewimage?img=${encodeURIComponent(data.wmPath)}&folderpath=${data.wmFolderpath}`}>
              <Image
                src={data.thumbSrc}
                alt="image"
                width={200} // Set a fixed width or use a width from the photo object if available
                height={200} // Set a fixed height or use a height from the photo object if available
                className="my-5"
                layout="responsive" // Ensure the image scales correctly within its container
              />
          </Link>
        ))}
      </div>
    </ErrorBoundary>
  )
}
