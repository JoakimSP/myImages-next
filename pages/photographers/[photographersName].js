import prisma from "@/components/prisma"
import Header from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { ShowPhotographerImage } from "@/components/showImages"


export default function photographersName({ photographer, photos }) {
  const { info, personID } = photographer

  return (
    <div className='bg-custom-grey'>
      <Header></Header>
      <div className="bg-[url('/appcontent/18048EB5-ACE3-499A-AFE5-D0CCB02513BC.JPG')] h-96 pt-4">
        <h1 className="text-center text-7xl text-white mb-3">{photographer.firstName + " " + photographer.lastName}</h1>
        <p className="text-center text-lg text-white">Read more about our photographer {photographer.firstName + " " + photographer.lastName}</p>
      </div>
      <div className="flex justify-center  px-8">
        <div className="flex-1 flex justify-center m-4">
          <Image src={"/appcontent/18048EB5-ACE3-499A-AFE5-D0CCB02513BC.JPG"} alt="Image of photographer" width={300} height={300} />
        </div>
        <div className="flex-1 text-white">
          <h2 className="text-3xl mb-3">{photographer.firstName + " " + photographer.lastName}</h2>
          <h6 className="mb-3">photographer since {info.careerStart}</h6>

          <h6 className="inline-block mb-3 font-bold">About:</h6>
          <p className="inline break-normal"> {info.about}</p>

          <h6 className=" mb-3 font-bold">Lens of choice:</h6>
          <p className="inline break-normal">{info.lens}</p>

          <h6 className=" mb-3 font-bold">Favorite Photo:</h6>
          <p className="inline break-normal">{info.favoritePhoto}</p>

          <h6 className=" mb-3 font-bold">Favorite thing to photograph</h6>
          <p className="inline break-normal">{info.photoPreference}</p>
        </div>
      </div>
      <div>
        {/* <button><Link href={"#"}>See all of {photographer.firstName}s photographs</Link></button> */}
      </div>
      <div>
        <h4 className="text-4xl text-white mb-3">{photographer.firstName}&apos;s top collections</h4>
      </div>
      {ShowPhotographerImage(personID)}
    </div>
  )
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
    console.log(error)
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
    console.log(error)
  }
}








