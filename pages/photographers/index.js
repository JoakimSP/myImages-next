import Link from "next/link"
import Header from "@/components/header"
import { PrismaClient } from "@prisma/client"

export default function index({ photografers }) {
  return (
    <div>
      <Header></Header>


      <h1>Our photographers</h1>
      {photografers.map(photographer => {
        return (
          <div>
            <Link href={`./photographers/${photographer.user}`}>{photographer.user}</Link>
          </div>
        )
      })}

    </div>
  )
}

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const photografers = await prisma.photographer.findMany()
  return {
    props: { photografers }
  }
}
