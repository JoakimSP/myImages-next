import { PrismaClient } from "@prisma/client"
import Header from "@/components/header"
import Image from "next/image"


export default function photographersName({ photographer }) {
  return (
    <div>
      <Header></Header>
      <div>
        <h1>{photographer.firstName + " " + photographer.lastName}</h1>
        <h3>Read more about our photographer {photographer.firstName + " " + photographer.lastName}</h3>
      </div>
      <div>
        <h4>About the photographer</h4>
        <h6>Read more about the photographer here</h6>
      </div>
      <div>
        <Image src="/#" alt="Image of photographer" width={300} height={300} />
        <h2>{photographer.firstName + " " + photographer.lastName}</h2>
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const { photographersName } = context.query

  try {
    const prisma = new PrismaClient
    const photographer = await prisma.photographer.findUnique({
      where: {
        user: photographersName
      }
    })
    console.log(photographer)
    return {
      props: { photographer }
    }
  } catch (error) {
    console.log(error)
  }



}







