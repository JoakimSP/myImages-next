import Link from "next/link"
import Header from "@/components/header"
import prisma from "@/components/prisma"

export default function index({ photografers }) {
  return (
    <div>
      <Header></Header>


      <h1>Our photographers</h1>
      {photografers.map(photographer => {
        return (
          <div key={photographer.personID}>
            <Link href={`./photographers/${photographer.user}`}>{photographer.user}</Link>
          </div>
        )
      })}

    </div>
  )
}

export async function getServerSideProps() {

  try {
    
    const photografers = await prisma.photographer.findMany()

    return {
      props: { photografers }
    }
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }

  
}
