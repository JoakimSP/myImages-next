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
        return <AddNewCategory categories={categories} collections={collections} photographers={photographers} />;
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
      <div className="bg-custom-grey min-h-screen">
        <div className="min-h-screen flex flex-col justify-center items-center px-6 md:px-24">
          <div className="mb-auto my-3">
            <ul className="flex space-x-1 md:space-x-2 bg-white p-2 rounded-lg shadow-lg">
              <li className="flex-1">
                <button
                  onClick={() => changeActiveView('photographers')}
                  className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'photographers' ? 'text-white bg-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Photographers
                </button>
              </li>
              <li className="flex-1">
                <button
                  onClick={() => changeActiveView('categories')}
                  className={`w-full whitespace-nowrap text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'categories' ? 'text-white bg-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Photo Settings
                </button>
              </li>
              <li className="flex-1">
                <button
                  onClick={() => changeActiveView('privacy')}
                  className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'privacy' ? 'text-white bg-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Privacy
                </button>
              </li>
              <li className="flex-1">
                <button
                  onClick={() => changeActiveView('collections')}
                  className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'collections' ? 'text-white bg-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Collections
                </button>
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
        { lastName: 'asc' }
      ]
    })
    const categories = await prisma.categories.findMany({
      orderBy: [
        { name: 'asc' }
      ]
    })
    const collections = await prisma.collection.findMany({
      orderBy: [
        { name: 'asc' }
      ]
    })
    const featuredcol = await prisma.featuredcollections.findFirst({
      where: {
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
