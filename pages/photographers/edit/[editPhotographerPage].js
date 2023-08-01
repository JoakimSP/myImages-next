import { getSession } from "next-auth/react"
import prisma from "@/components/prisma";
import Header from "@/components/header";
import FormInput from "./formInput";
import { useRouter } from "next/router";
import Link from "next/link";

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
      console.log(error)
    }


  }

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageName = imageUpload.name + v4();
  
    const imageRefUser = ref(storage, `${userdata.personID}/${imageName}`);
    const imageRef = ref(storage, `${imageName}`);

    console.log(userdata.personID + "/" + imageName)
  
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
    console.log(imageUrl)
    const photoInformation = {
      personID: userdata.personID,
      filename: fileName,
      filetype: imageUpload.type,
      filesize: imageUpload.size,
      url: imageUrl,
      urlUser: imageUrlUser
    }

    const res = await fetch('../../api/images/storeImages',{
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(photoInformation)
    })
  }



  return (
    <div>
      <Header></Header>
      <h1>Photographer Info Form</h1>
      <form onSubmit={HandleUpdateInfo} method='post'>
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
        <button type="submit">Submit</button>
      </form>
      <input type="file" onChange={(e) => {setImageUpload(e.target.files[0])}}/>
      <button onClick={uploadImage}> Upload image</button>
      <button><Link href={`/photographers/editPhoto/myPhotos`}>Edit photos</Link></button>
    </div>
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
