import Image from "next/image";
import Link from "next/link";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "./firebase";

export function showPhotographerImage(photographer) {
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
  )
}


export default function ShowImagesNext() {
  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, "/");

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      const promises = res.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImageList(urls);
      });
    });
  }, []);

  return (
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
  )
}
