import prisma from "@/components/prisma"
import Image from "next/image"
import Link from "next/link"
import { ShowPhotographerImage } from "@/components/showImages"
const logger = require('@/components/utils/logger')
import Layout from "@/components/layout/layout"
import ShowPhotographerCollection from "@/components/collections/showcollection"
import { useState, useEffect } from "react"

export default function PhotographersName({ photographer, photos }) {
  const { info, heropicture, personID } = photographer
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`/api/images/getHeroAndProfilePic?profilepicture=${photographer.profilepicture}&heropicture=${photographer.heropicture}`);
        const data = await response.json();
  
        setImageUrls({
          profileImage: data.profileImage,
          heroImage: data.heroImage
        });
      } catch (error) {
        console.error('There was an error fetching the images:', error);
      }
    }
    fetchImages();
  }, [photographer]);

  return (
    
    <Layout>
<div className="bg-custom-grey">
    {/* Header */}
    <div className=" min-h-screen flex flex-col"> 
    {/* Main Profile Section */}
    <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: imageUrls.heroImage ? `url(${imageUrls.heroImage})` : 'none' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white space-y-5">
            <h1 className="text-6xl font-bold text-center">{photographer.firstName + " " + photographer.lastName}</h1>
            <p className="text-xl font-light text-center">Diving deep into the journey of {photographer.firstName}, a master behind the lens.</p>
        </div>
    </section>

    {/* Details Section */}
    <section className="bg-white py-12 px-6 md:px-24">
        <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/3 px-4 flex justify-center">
            {imageUrls.profileImage ? 
              <Image src={imageUrls.profileImage} alt="Image of photographer" width={300} height={300} className="rounded-full shadow-xl" />
              : <div className="rounded-full shadow-xl bg-gray-200" style={{ width: 300, height: 300 }}></div>  // Placeholder in case the image is missing
            }
            </div>
            <div className="w-full lg:w-2/3 px-4 space-y-6">
                <div className="space-y-3">
                    <h2 className="text-4xl font-semibold">{photographer.firstName + " " + photographer.lastName}</h2>
                    <p className="text-gray-500 text-lg">Creating art since {info.careerStart}</p>
                </div>
                <div className="space-y-5">
                    <BioDetail title="About Me" content={info.about} />
                    <BioDetail title="Lens of Choice" content={info.lens} />
                    <BioDetail title="Favorite Capture" content={info.favoritePhoto} />
                    <BioDetail title="I Love to Photograph" content={info.photoPreference} />
                </div>
            </div>
        </div>
    </section>

    {/* Signature Collections Section */}
    <section className="py-12 px-6 md:px-24 bg-custom-grey">
        <h4 className="text-4xl text-white mb-10 font-semibold text-center">{photographer.firstName}&apos;s Signature Collections</h4>
        <ShowPhotographerCollection photographer={photographer}/>
    </section>
    <div className="border-t-8 h-auto w-auto">{ShowPhotographerImage(personID)}</div>
</div>

</div>
</Layout>
// Assuming you have a component to handle individual bio details to reduce repetition.


  )
}

export function BioDetail({ title, content }) {
  return (
      <div>
          <h6 className="font-semibold text-xl text-gray-900">{title}</h6>
          <p className="text-gray-700">{content}</p>
      </div>
  );
}

export async function getStaticProps(context) {
  const { photographersName } = context.params


  try {

    const photographer = await prisma.photographer.findUnique({
      where: {
        user: photographersName
      },
      include: {
        info: true,
        collection: true,
        
      }
    })

    const photos = await prisma.photos.findMany({
      where: {
        personID: photographer.personID
      },
    })
    prisma.$disconnect()
    return {
      props: {
        photographer: JSON.parse(JSON.stringify(photographer)),
        photos
      },
      revalidate: 60,
    }
  } catch (error) {
    logger.log('error', {
      message: error.message,
      stack: error.stack
  })
  }

}

export async function getStaticPaths() {

  try {
    const photographers = await prisma.photographer.findMany({
      select: {
        user: true,
      },
    });
    prisma.$disconnect()
    const paths = photographers.map((photographer) => ({
      params: { photographersName: photographer.user },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    logger.log('error', {
      message: error.message,
      stack: error.stack
  })
  }
}








