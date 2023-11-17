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

  /* useEffect(() => {
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

  console.log(imageData)
 */
  return (
    <ErrorBoundary>
      <div className="w-full p-5 pb-10 mx-auto mb-10 gap-5 columns-1 md:columns-2 lg:columns-3 space-y-5 bg-custom-grey">
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
    </ErrorBoundary>
  )
}
