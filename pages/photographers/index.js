import Link from "next/link"
import prisma from "@/components/prisma"
import Image from "next/image"
const logger = require('@/components/utils/logger')
import Layout from "@/components/layout/layout"



export default function index({ photographers }) {
  return (
    <Layout>
    <div className="bg-custom-grey">
 

    <div className='min-h-screen py-10'>
        {/* Title */}
        <h1 className="mb-5 text-white text-center text-4xl font-bold md:text-6xl">Our Photographers</h1>
        <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg text-white">
        Explore our showcase of talented photographers. Delve into their portfolios, learn about their expertise, and select the perfect match for your needs.
            </div>
        
        {/* Grid of Photographers */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:px-24'>
            {photographers.map(photographer => {
                return (
                  <Link key={photographer.personID} href={`./photographers/${photographer.user}`}>
                  <div className='flex flex-col flex-wrap items-center justify-end h-96 cursor-pointer transform transition-transform duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl bg-white'>
                      
                      <Image
                          src={photographer.profilepicture}
                          alt="photographer"
                          fill
                          className="object-cover max-h-80 "
                      />
                      
                      <div className='px-6 pt-14'>
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
</div>
</Layout>
  )
}

export async function getServerSideProps() {

  try {

    const photographers = await prisma.photographer.findMany()

    return {
      props: { photographers }
    }
  } catch (error) {
    logger.logger.log('error', {
      message: error.message,
      stack: error.stack
  })
  } finally {
    await prisma.$disconnect()
  }


}
