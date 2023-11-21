import Link from "next/link";
import prisma from "@/components/prisma";
import Image from "next/image";
const logger = require('@/components/utils/logger');
import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";

export default function Index({ photographers }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Fetch image for each photographer
    photographers.forEach(async photographer => {
      try {
        const response = await fetch(`/api/images/getProfilepictures?profilePicturePath=${photographer.profilepicture}`);

        if (response.ok) {
          const blob = await response.blob();
          const localImageUrl = URL.createObjectURL(blob);
          setImageUrls(prev => [...prev, { id: photographer.personID, url: localImageUrl }]);
        } else {
          console.error('Failed to fetch image. Status:', response.status);
        }
      } catch (error) {
        console.error('There was an error fetching the image:', error);
      }
    });
  }, [photographers]);

  return (
    <Layout>
      <div className="bg-custom-grey">
        <div className='min-h-screen py-10'>
          <h1 className="mb-5 text-white text-center text-4xl font-bold md:text-6xl">Our Photographers</h1>
          <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg text-white">
            Explore our showcase of talented photographers. Delve into their portfolios, learn about their expertise, and select the perfect match for your needs.
          </div>
          <div className='flex flex-wrap justify-center gap-6 px-4 lg:px-24'>
            {photographers.map(photographer => {
              const imageUrlObj = imageUrls.find(img => img.id === photographer.personID);
              return (
                <Link key={photographer.personID} href={`./photographers/${photographer.user}`}>
                  <div className='flex flex-1 flex-col flex-wrap items-center justify-end h-96 w-72 md:w-96 cursor-pointer transform transition-transform duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl bg-white max-w-sm'>
                    <Image
                      src={imageUrlObj ? imageUrlObj.url : '/#'}
                      alt="photographer"
                      fill={true}
                      className="object-cover max-h-80"
                    />
                    <div className='px-6 pt-14'>
                      <div className='font-semibold text-xl text-center text-gray-800 mb-2'>
                        {photographer.user}
                      </div>
                      <div className='text-center text-gray-600'>
                        {photographer.info.cardText}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const photographers = await prisma.photographer.findMany({
      include : {
        info: true
      }
    });
    return {
      props: { photographers }
    };
  } catch (error) {
    logger.log('error', {
      message: error.message,
      stack: error.stack
    });
    return { props: { photographers: [] } }; // return an empty list if there's an error
  } finally {
    await prisma.$disconnect();
  }
}
