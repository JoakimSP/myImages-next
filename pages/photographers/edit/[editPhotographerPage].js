import { getSession } from "next-auth/react"
import prisma from "@/components/prisma";
import UploadImage from "@/components/editphotographerinfo/uploadImage";
import HandleUpdateInfo from "@/components/editphotographerinfo/handleUpdateInfo";
import { useState } from "react";
import Layout from "@/components/layout/layout";


export default function EditPhotographerPage({ userdata }) {
  const [activeView, setActiveView] = useState('photographers');

  const renderActiveView = () => {
    switch (activeView) {
      case 'updateinfo':
        return <HandleUpdateInfo userdata={userdata} />;
      case 'uploadphoto':
        return <UploadImage userdata={userdata} />;
      default:
        return null;
    }
  }

  return (
    <Layout>
    
      <div className="bg-custom-grey min-h-screen">
        <div className=" min-h-screen flex flex-col justify-center items-center px-6 md:px-24">
          <div className="mb-auto my-3">
            <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex">
              <li className="w-full">
                <p
                  onClick={() => setActiveView('updateinfo')}
                  className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'updateinfo' ? 'text-white bg-blue-600' : 'text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
                >
                  info
                </p>
              </li>
              <li className="w-full">
                <p
                  onClick={() => setActiveView('uploadphoto')}
                  className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'uploadphoto' ? 'text-white bg-blue-600' : 'text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
                >
                  Upload
                </p>
              </li>
            </ul>
          </div>
          <div className="flex w-full justify-center pb-44">{renderActiveView()}</div>
        </div>
      </div>

    </Layout>
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

  prisma.$disconnect()


  return {
    props: {
      userdata,
    }
  }
}
