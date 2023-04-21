import { getSession } from "next-auth/react"
import prisma from "@/components/prisma";
import Header from "@/components/header";
import FormInput from "./formInput";
import { useState } from "react";

export default function EditPhotographerPage({ userdata }) {
  const { info } = userdata
  console.log(userdata.personID)

  return (
    <div>
      <Header></Header>
      <h1>Photographer Info Form</h1>
      <form action='../../api/users/updatePhotographerInfo' method='post'>
        {
          Object.keys(info).map((prop) => {
            if(prop == "personID"){
              return (
                <FormInput
                key={prop}
                type="hidden"
                inputName={prop}
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
        <form action="../../api/images/storeImages" method="post" encType="multipart/form-data"> 
          <label htmlFor="image">Upload image:
            <input type="file" name="image" multiple/>
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
