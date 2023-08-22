import { useState } from "react";
import prisma from "@/components/prisma";
import AddNewPhotographer from "@/components/addNewPhotographer";
import AddNewCategory from "@/components/addNewCategory";
const logger = require('@/components/utils/logger')
import Header from "@/components/header";
import EditPrivacyPolicy from "@/components/editPrivacyPolicy";

export default function AdminPage({ photographers, categories, policyText }) {

  const [activeView, setActiveView] = useState(null);

  const renderActiveView = () => {
    switch(activeView) {
      case 'photographers':
        return <AddNewPhotographer photographers={photographers} />;
      case 'categories':
        return <AddNewCategory categories={categories} />;
      case 'privacy':
        return <EditPrivacyPolicy text={policyText}/>;
      default:
        return null;
    }
  }

  return (
    <>
    <Header/>
    <div className="bg-custom-grey min-h-screen flex flex-col justify-center items-center px-6 md:px-24">
      <div className="mb-auto">
        <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full">
            <p 
               onClick={() => setActiveView('photographers')} 
               className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'photographers' ? 'text-white bg-blue-600' : 'text-gray-900 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
            >
              photographers
            </p>
          </li>
          <li className="w-full">
            <p 
               onClick={() => setActiveView('categories')} 
               className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'categories' ? 'text-white bg-blue-600' : 'text-gray-900 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
            >
              photosettings
            </p>
          </li>
          <li className="w-full">
            <p 
               onClick={() => setActiveView('privacy')} 
               className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'privacy' ? 'text-white bg-blue-600' : 'text-gray-900 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
            >
              Privacy
            </p>
          </li>
        </ul>
      </div>
      <div className="flex flex-col pb-44">{renderActiveView()}</div>
    </div>
    </>
  );
}


export async function getServerSideProps(context) {

  try {

    const photographers = await prisma.photographer.findMany()
    const categories = await prisma.categories.findMany()
    const policyText = await prisma.privacypolicy.findFirst({
      where: {
          id: "1"
      },
      select: {
          text: true
      }
  });


    return {
      props: {
        photographers,
        categories: JSON.parse(JSON.stringify(categories)),
        policyText
      }
    }

  } catch (error) {
    logger.logger.log('error', {
      message: error.message,
      stack: error.stack
    })
    return {
      props: {
        photographers: [],
        categories: [],
        policyText: null
      }  
    }
  } finally {
    await prisma.$disconnect()
  }

}
