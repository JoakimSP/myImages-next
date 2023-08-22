import { getSession } from "next-auth/react"
import prisma from "@/components/prisma";
import Header from "@/components/header";
import FormInput from "./formInput";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import Footer from "@/components/footer";

import { useState } from "react"
import { storage } from "@/components/firebase";
import { ref, uploadBytes, getDownloadURL, list } from "firebase/storage";
import { v4 } from "uuid";


export default function EditPhotographerPage({ userdata }) {
  const [imageUpload, setImageUpload] = useState()
  const { info } = userdata
  const router = useRouter()

  async function HandleUpdateInfo(e) {
    e.preventDefault()

    const newUserInformation = {
      personID: e.target[0].value,
      country: e.target[1].value,
      city: e.target[2].value,
      about: e.target[3].value,
      camera: e.target[4].value,
      lens: e.target[5].value,
      favoritePhoto: e.target[6].value,
      photoPreference: e.target[7].value,
      careerStart: e.target[8].value
    }


    try {
      const response = await fetch('../../api/users/updatePhotographerInfo', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newUserInformation)
      })

      if (response.ok) {
        router.push("/")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }


  }

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageName = imageUpload.name + v4();

    const imageRefUser = ref(storage, `${userdata.personID}/${imageName}`);
    const imageRef = ref(storage, `${imageName}`);

    try {
      // Upload to user-specific directory
      await uploadBytes(imageRefUser, imageUpload);

      // Upload to general directory
      await uploadBytes(imageRef, imageUpload);

      // Get the download URL
      const url = await getDownloadURL(imageRef);
      const urlUser = await getDownloadURL(imageRefUser);

      // Pass URL to uploadData function
      uploadImageData(url, urlUser);
      window.alert("image uploaded");

    } catch (error) {

      console.error("Error uploading image: ", error);
    }
  };
  const uploadImageData = async (imageUrl, imageUrlUser) => {
    const fileName = imageUpload.name + v4();
    const photoInformation = {
      personID: userdata.personID,
      filename: fileName,
      filetype: imageUpload.type,
      filesize: imageUpload.size,
      url: imageUrl,
      urlUser: imageUrlUser
    }

    const res = await fetch('../../api/images/storeImages', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(photoInformation)
    })
  }



  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen dark:bg-gray-900">

        <h1 className="text-center text-4xl font-semibold text-gray-900 pt-12 mb-6 dark:text-white">Photographer Info</h1>

        <form onSubmit={HandleUpdateInfo} method='post'>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-md">
              {
                Object.keys(info).map((prop) => {
                  if (prop == "personID") {
                    return (
                      <input
                        key={prop}
                        type="hidden"
                        name={prop}
                        value={userdata.personID}
                      />
                    )
                  }
                  return (
                    <FormInput
                      key={prop}
                      type={"text"}
                      inputName={prop}
                    />
                  )
                })
              }
              <div className="col-span-1 space-y-4 mt-4 lg:mt-0">
                {
                  Object.keys(info).map(prop => (
                    <div key={prop} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-2">
                      <span className="font-medium capitalize text-gray-700 dark:text-gray-300">{prop.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-gray-900 dark:text-gray-400">{info[prop]}</span>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">Submit</button>
            </div>
          </div>
        </form>

        <h1 className="text-center text-4xl font-semibold text-gray-900 mt-12 mb-6 dark:text-white">Upload a photo</h1>
        <div className="max-w-5xl mx-auto mt-12">
          <div className="flex flex-col items-center space-y-6">
            {/* Drop zone */}
            <div
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files.length) {
                  setImageUpload(files[0]);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              className="flex justify-center items-center w-60 h-60 border-dotted border-4 border-gray-400 hover:border-gray-600 cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
            >
              <p className="text-gray-800 text-center dark:text-gray-300">{imageUpload ? imageUpload.name : "Drop image here"}</p>
            </div>

            {/* File Input */}
            <input
              onChange={(e) => { setImageUpload(e.target.files[0]) }}
              className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
            />

            {/* Upload Button */}
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={uploadImage}
            >
              Ladda upp bild
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)


  const userdata = await prisma.photographer.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      info: true
    },
  })

  prisma.$disconnect()


  return {
    props: {
      userdata,
    }
  }
}
