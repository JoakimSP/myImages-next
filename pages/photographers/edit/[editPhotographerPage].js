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
    <div className="min-h-screen flex flex-col justify-center items-center px-6 md:px-24">
        <div className="mb-auto my-3">
            <ul className="flex space-x-2 md:space-x-4 bg-white p-1 rounded-lg shadow-lg">
                <li className="flex-1">
                    <button
                        onClick={() => setActiveView('updateinfo')}
                        className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'updateinfo' ? 'text-white bg-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
                    >
                        Info
                    </button>
                </li>
                <li className="flex-1">
                    <button
                        onClick={() => setActiveView('uploadphoto')}
                        className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'uploadphoto' ? 'text-white bg-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
                    >
                        Upload
                    </button>
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
