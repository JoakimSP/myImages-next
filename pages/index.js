import Head from 'next/head'
import SearchBar from '@/components/searchPage/searchbar'
import Image from "next/image";
import prisma from '@/components/prisma';
import Layout from '@/components/layout/layout';
import ShowFeaturedCollection from '@/components/collections/showFeaturedCollection';
import Link from 'next/link';
import blurDataURL from '@/components/svgSkeleton';




export default function Home({ categories, featuredcol, exclusiveCollection }) {

  return (
    <Layout>
      <div className='bg-custom-grey'>
        <Head>
          <title>MyImages - High-Quality Stock Photos</title>
          <meta name="description" content="Find high-resolution stock photos for your projects on MyImages. Explore our exclusive collection and featured categories." />
          <meta name="keywords" content="stock photos, high-resolution images, exclusive collection, featured categories, photography, digital images" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="flex justify-center  items-center relative h-[42rem]  mb-11 bg-cover bg-center ">
          <Image
            src={`/appcontent/myimages-logo-white-1.svg`}
            alt="Logo"
            width={200}
            height={200}
            className="object-cover z-20 absolute top-0 left-0 m-4 w-auto h-auto max-h-[200px] max-w-[200px]"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />

          <div className='flex flex-col justify-start items-center w-screen h-full pt-36 absolute text-center'>
            <h1 className=' text-white text-3xl md:text-7xl font-light whitespace-pre-wrap z-20'>Welcome to myimages.se</h1>
            <h1 className='  text-white text-lg md:text-3xl font-light  whitespace-pre-wrap z-20'> Your market place for high resolution photos.</h1>
          </div>
          <Image
            src={`/appcontent/18048EB5-ACE3-499A-AFE5-D0CCB02513BC.JPG`}
            alt="Hero image home"
            fill={true}
            className="object-cover w-full"
            priority={true}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />

          <SearchBar categories={categories} />
        </div>
        {featuredcol &&
          <ShowFeaturedCollection featuredcol={featuredcol} />
        }
        <Link href={"/collections/exclusiveCollection"}>
          <div className='relative h-full overflow-scroll xl:overflow-hidden'>
            <Image
              src={`/api/images/getFeaturedColImages?imagePath=${exclusiveCollection.heroImagepathrelative}`}
              alt="Exclusive collection"
              width={1500}
              height={1500}
              className="object-cover w-full max-h-[800px]"
              placeholder="blur"
              blurDataURL={blurDataURL}

            />
            <div className="flex justify-center items-center absolute h-full w-full top-0 z-10">
              <div className='flex-1 pl-4 md:pl-8 md:mb-36'>
                <h1 className="text-white text-4xl md:text-7xl font-light mb-4 whitespace-pre-wrap">{exclusiveCollection.homepageTitle}</h1>
                <h3 className="text-white text-lg md:text-3xl font-light whitespace-pre-wrap">{exclusiveCollection.homepageSubTitle}</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Layout >
  )
}


export async function getServerSideProps() {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  const featuredcollections = await prisma.featuredcollections.findFirst({
    where: {
      id: "1"
    },
    select: {
      collection: true,
      title: true,
      subTitle: true
    }
  })

  const exclusiveCollection = await prisma.exclusivecollections.findFirst({
    where: {
      id: "1"
    },
    select: {
      title: true,
      subtitle: true,
      homepageTitle: true,
      homepageSubTitle: true,
      information: true,
      heroImagepathrelative: true,
      heroImagepath: true,
      heroImagepathfolder: true,
      photos: true,
      photographerPersonID: true
    }
  })

  return {
    props: { categories, featuredcol: JSON.parse(JSON.stringify(featuredcollections)), exclusiveCollection }
  }
}
