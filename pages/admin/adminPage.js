import { useState, useEffect } from "react";
import prisma from "@/components/prisma";
import AddNewPhotographer from "@/components/adminpage/addNewPhotographer";
import AddNewCategory from "@/components/adminpage/addNewCategory";
const logger = require('@/components/utils/logger')
import EditPrivacyPolicy from "@/components/adminpage/editPrivacyPolicy";
import Layout from "@/components/layout/layout";
import AddNewCollection from "@/components/adminpage/addNewCollection";


export default function AdminPage({ photographers, categories, policyText, collections, featuredcol }) {

  const [activeView, setActiveView] = useState();
  useEffect(() => {
    setActiveView(typeof window !== 'undefined' ? localStorage.getItem('activeView') || 'photographers' : 'photographers');
  }, []);


  const renderActiveView = () => {
    switch (activeView) {
      case 'photographers':
        return <AddNewPhotographer photographers={photographers} />;
      case 'categories':
        return <AddNewCategory categories={categories} collections={collections} photographers={photographers}/>;  
      case 'privacy':
        return <EditPrivacyPolicy text={policyText} />;
      case 'collections':
        return <AddNewCollection collections={collections} photographers={photographers} featuredcol={featuredcol} />;
      default:
        return null;
    }
  }

  const changeActiveView = (newView) => {
    setActiveView(newView);
    localStorage.setItem('activeView', newView);
  };

  return (
    <Layout>
    <div className="bg-custom-grey">
      <div className=" min-h-screen flex flex-col justify-center items-center px-6 md:px-24">
        <div className="mb-auto my-3">
          <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex">
            <li className="w-full">
              <p
                onClick={() => changeActiveView('photographers')}
                className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'photographers' ? 'text-white bg-blue-600' : 'text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
              >
                photographers
              </p>
            </li>
            <li className="w-full">
              <p
                onClick={() => changeActiveView('categories')}
                className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'categories' ? 'text-white bg-blue-600' : 'text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
              >
                photosettings
              </p>
            </li>
            <li className="w-full">
              <p
                onClick={() => changeActiveView('privacy')}
                className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'privacy' ? 'text-white bg-blue-600' : 'text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
              >
                Privacy
              </p>
            </li>
            <li className="w-full">
              <p
                onClick={() => changeActiveView('collections')}
                className={`inline-block w-full p-4 focus:ring-4 focus:ring-blue-300 ${activeView === 'privacy' ? 'text-white bg-blue-600' : 'text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50'} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
              >
                collections
              </p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col pb-44">{renderActiveView()}</div>
      </div>
    </div>
    </Layout>
  );
}


export async function getServerSideProps(context) {

  try {

    const photographers = await prisma.photographer.findMany({
      orderBy: [
       { lastName: 'asc'}
      ]
    })
    const categories = await prisma.categories.findMany({
      orderBy: [
       { name: 'asc'}
      ]
    })
    const collections = await prisma.collection.findMany({
      orderBy: [
       { name: 'asc'}
      ]
    })
    const featuredcol = await prisma.featuredcollections.findFirst({
      where : {
        id: "1"
      },
      select: {
        collection: true
      }
    })
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
        policyText,
        collections: JSON.parse(JSON.stringify(collections)),
        featuredcol: JSON.parse(JSON.stringify(featuredcol))
      }
    }

  } catch (error) {
    console.log(error)
    logger.logger.log('error', {
      message: error.message,
      stack: error.stack
    })
    return {
      props: {
        photographers: [],
        categories: [],
        policyText: null,
        collections: [],
        featuredcol: []
      }
    }
  } finally {
    await prisma.$disconnect()
  }

}
