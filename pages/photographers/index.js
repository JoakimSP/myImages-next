import Link from "next/link"
import Header from "@/components/header"
import prisma from "@/components/prisma"
import Image from "next/image"

export default function index({ photographers }) {
  return (
    <>
    <Header />

    <div className=' dark:bg-gray-900 min-h-screen py-10'>
        {/* Title */}
        <h1 className="text-center text-4xl font-semibold text-gray-900 pt-12 mb-6 dark:text-white">Our Photographers</h1>
        
        {/* Grid of Photographers */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:px-24'>
            {photographers.map(photographer => {
                return (
                  <Link key={photographer.personID} href={`./photographers/${photographer.user}`}>
                  <div className='cursor-pointer transform transition-transform duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl bg-white'>
                      
                      <Image
                          src="/avatar-2a011dc65ff512e320f013780071ae03.jpg"
                          alt="photographer"
                          width="300"
                          height="300"
                          className="object-cover w-full"
                      />
                      
                      <div className='px-6 py-4'>
                          <div className='font-semibold text-xl text-center text-gray-800 mb-2'>
                              {photographer.user}
                          </div>
                          <div className='text-center text-gray-600'>
                              Short Bio or Tagline Here
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

    const photographers = await prisma.photographer.findMany()

    return {
      props: { photographers }
    }
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }


}
