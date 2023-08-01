import prisma from "@/components/prisma"
import Header from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import {showPhotographerImage} from "@/components/showImages"


export default function photographersName({ photographer, photos }) {
  const { info, personID } = photographer

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
       {/*  <Image src={"/#"} alt="Image of photographer" width={300} height={300} /> */}
        <h2>{photographer.firstName + " " + photographer.lastName}</h2>
        <h6>photographer since {info.careerStart}</h6>
        <h6>About:</h6>
        <p>{info.about}</p>
        <h6>Lens of choice:</h6>
        <p>{info.lens}</p>
        <h6>Favorite Photo:</h6>
        <p>{info.favoritePhoto}</p>
        <h6>Favorite thing to photograph</h6>
        <p>{info.photoPreference}</p>
      </div>
      <div>
        <button><Link href={"#"}>See all of {photographer.firstName}s photographs</Link></button>
      </div>
      <div>
        <h4>{photographer.firstName}&apos;s top collections</h4>
      </div>
      {showPhotographerImage(personID)}
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








