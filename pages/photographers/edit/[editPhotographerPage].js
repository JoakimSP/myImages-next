import { getSession } from "next-auth/react"
import prisma from "@/components/prisma";
import UploadImage from "@/components/editphotographerinfo/uploadImage";
import HandleUpdateInfo from "@/components/editphotographerinfo/handleUpdateInfo";
import { useState } from "react";
import Layout from "@/components/layout/layout";
import LoadingScreen from "@/components/utils/loadingScreen";
import CreateCollection from "@/components/editphotographerinfo/createCollection";


export default function EditPhotographerPage({ userdata, randomFactIndex, categories, collections }) {
  const [activeView, setActiveView] = useState('photographers');
  const [isLoading, setIsLoading] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'updateinfo':
        return <HandleUpdateInfo userdata={userdata} />;
      case 'uploadphoto':
        return <UploadImage userdata={userdata} setIsLoading={setIsLoading} categories={categories} collections={collections} />;
      case 'createcollection':
        return <CreateCollection collections={collections} photographer={userdata} />;
      default:
        return null;
    }
  }

  return (
    <>
      {isLoading &&
        <LoadingScreen randomFactIndex={randomFactIndex} />
      }

      <Layout>

        <div className="bg-custom-grey min-h-screen">
          <div className="min-h-screen flex flex-col justify-center items-center px-6 md:px-24">
            <div className="mb-auto my-3">
              <ul className="flex space-x-2 md:space-x-4 bg-white p-1 rounded-lg shadow-lg">
                <li className="flex-1">
                  <button
                    onClick={() => setActiveView('updateinfo')}
                    className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'updateinfo' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
                  >
                    Info
                  </button>
                </li>
                <li className="flex-1">
                  <button
                    onClick={() => setActiveView('uploadphoto')}
                    className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'uploadphoto' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
                  >
                    Upload
                  </button>
                </li>
                <li className="flex-1">
                  <button
                    onClick={() => setActiveView('createcollection')}
                    className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'createcollection' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
                  >
                    Collections
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex w-full justify-center pb-44">{renderActiveView()}</div>
          </div>
        </div>

      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)


  const userdata = await prisma.photographer.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      info: true
    },
  })

  const categories = await prisma.categories.findMany({
    orderBy: [
      { name: 'asc' }
    ],
    select: {
      id: true,
      name: true,
      updatedAt: false,
      createdAt: false,
    }
  })
  const collections = await prisma.collection.findMany({
    where: {
      photographerPersonID: userdata.personID
    },
    orderBy: [
      { name: 'asc' }
    ],
    select: {
      id: true,
      name: true,
      subtitle: true,
      description: true,
      photographerPersonID: true,
      updatedAt: false,
      createdAt: false,
    }
  })

  const randomIndex = Math.floor(Math.random() * 19);
  prisma.$disconnect()


  return {
    props: {
      userdata,
      randomFactIndex: randomIndex,
      categories,
      collections
    }
  }
}
