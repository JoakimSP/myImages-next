import { getSession } from "next-auth/react"
import prisma from "@/components/prisma";
import Header from "@/components/header";
import FormInput from "./formInput";
import HandleUpdateInfo from "@/components/utils/handleUpdateInfo";
import { useRouter } from "next/router";


export default function EditPhotographerPage({ userdata }) {
  const { info } = userdata
  const router = useRouter()

  async function HandleUploadPhoto(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append(e.target[0].name, e.target[0].files[0])

    const response = await fetch('../../api/images/storeImages', {
        method: 'POST',
        body: formData
    })

    if (!response.ok) {
        throw new Error({ error: "Something went wrong with the upload" })
    }
    else{
      router.push("/")
    }
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
      <form onSubmit={HandleUploadPhoto} method="post" accept="image/*">
        <label htmlFor="image">Upload image:
          <input type="file" name="image" multiple required />
        </label>
        <button type="submit">upload</button>
      </form>

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


  return {
    props: { userdata }
  }
}
