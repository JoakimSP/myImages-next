import Head from 'next/head'
import Header from '@/components/header'
import ShowImagesNext from '@/components/showImages'
import SearchBar from '@/components/searchbar'
import Image from "next/image";
import ErrorBoundary from '@/components/errorBoundery';
import prisma from '@/components/prisma';
import Footer from '@/components/footer';


export default function Home({categories}) {

  return (
    <>
    <Header />
    <div className='bg-custom-grey'>
      <Head>
        <title>My images</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <div className="flex justify-center  items-center relative h-[42rem]  mb-11 bg-cover bg-center ">
        <div className='z-10 absolute w-full h-full'>
          <Image
            src={`appContent/myimages-logo-white-1.svg`}
            alt="Logo"
            width={300}
            height={300}
            className="object-cover m-10"
          />
        </div>
        <Image
          src={`/appcontent/18048EB5-ACE3-499A-AFE5-D0CCB02513BC.JPG`}
          alt=""
          fill={true}
          className="object-cover w-full"
        />
        
        <SearchBar categories={categories} />
        
      </div>
      <ErrorBoundary>
     <ShowImagesNext/>
     </ErrorBoundary>
     <Footer/>
    </div>
    </>
  )
}


  export async function getServerSideProps(){
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    console.log(categories)

    return {
      props : {categories}
    }
}
