import Head from 'next/head'
import Header from '@/components/header'
import ShowImagesNext from '@/components/showImages'
import SearchBar from '@/components/searchbar'
import Image from "next/image";


export default function Home() {

  return (
    <div className='bg-custom-grey'>
      <Head>
        <title>My images</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="relative h-[42rem]  mb-11 bg-cover bg-center ">
        <Image
          src={`/appcontent/18048EB5-ACE3-499A-AFE5-D0CCB02513BC.JPG`}
          alt=""
          fill={true}
          className="object-cover w-full"
        />
        <SearchBar />
      </div>
     <ShowImagesNext/>
    </div>
  )
}
