import prisma from "@/components/prisma"
import Header from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { ShowPhotographerImage } from "@/components/showImages"
const logger = require('@/components/utils/logger')


export default function photographersName({ photographer, photos }) {
  const { info } = photographer

  return (
    
<>
    {/* Header */}
    <Header />
    <div className="bg-custom-grey min-h-screen flex flex-col"> 
    {/* Main Profile Section */}
    <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/appcontent/18048EB5-ACE3-499A-AFE5-D0CCB02513BC.JPG')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white space-y-5">
            <h1 className="text-6xl font-bold">{photographer.firstName + " " + photographer.lastName}</h1>
            <p className="text-xl font-light text-center">Diving deep into the journey of {photographer.firstName}, a master behind the lens.</p>
        </div>
    </section>

    {/* Details Section */}
    <section className="bg-white py-12 px-6 md:px-24">
        <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/3 px-4 flex justify-center">
                <Image src={"/appcontent/18048EB5-ACE3-499A-AFE5-D0CCB02513BC.JPG"} alt="Image of photographer" width={300} height={300} className="rounded-full shadow-xl" />
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
        {ShowPhotographerImage(info.personID)}
    </section>

</div>
</>
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
        photographer,
        photos
      },
      revalidate: 60,
    }
  } catch (error) {
    logger.logger.log('error', {
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
      params: { photoGraphersName: photographer.user },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    logger.logger.log('error', {
      message: error.message,
      stack: error.stack
  })
  }
}








