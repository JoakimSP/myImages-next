import { useState, useEffect } from "react"
import { storage } from "@/components/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";

export default function index() {
  const [imageUpload, setImageUpload] = useState()
  const [imageList, setImageList] = useState([])

  const imageListRef = ref(storage);

  const uploadImage = () => {
    if(imageUpload == null) return;
    const imageRef = ref(storage, `${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapShot) => {
      getDownloadURL(snapShot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    });
  }

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      const promises = res.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImageList(urls);
      });
    });
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => {setImageUpload(e.target.files[0])}}/>
      <button onClick={uploadImage}> Upload image</button>
      {imageList.map((url) => {
        return (
          <Image
          src={url}
          alt="image"
          width="300"
          height="300"/>
        )
      })}
    </div>
  )
}

