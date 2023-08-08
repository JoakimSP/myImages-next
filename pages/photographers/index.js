import Link from "next/link"
import Header from "@/components/header"
import prisma from "@/components/prisma"
import Image from "next/image"

export default function index({ photografers }) {
  return (
    <>
      <Header></Header>
      <div className='bg-custom-grey min-h-screen'>
        <h1 className='text-4xl font-bold mb-5'>Our photographers</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {photografers.map(photographer => {
            return (
              <Link key={photographer.personID} href={`./photographers/${photographer.user}`}>
                <div  className=' m-4 rounded overflow-hidden shadow-lg bg-gradient-to-tr from-gray-300 shadow-md'>
                  <div className='px-6 py-4'>
                    <div className='font-bold text-xl mb-2'>
                      {photographer.user}
                      <Image
                        src="/avatar-2a011dc65ff512e320f013780071ae03.jpg"
                        alt="kitten"
                        width="300"
                        height="500"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </>
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
