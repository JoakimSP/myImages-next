import { useState, useEffect } from "react";
import prisma from "@/components/prisma";
import AddNewPhotographer from "@/components/adminpage/addNewPhotographer";
import AddNewCategory from "@/components/adminpage/addNewCategory";
const logger = require('@/components/utils/logger')
import EditPrivacyPolicy from "@/components/adminpage/editPrivacyPolicy";
import Layout from "@/components/layout/layout";
import AddNewCollection from "@/components/adminpage/addNewCollection";
import EditPricePage from "@/components/adminpage/editPricePage";
import Mail from "@/components/adminpage/mail";
import EditSupport from "@/components/adminpage/EditSupport";
import EditPhotographPage from "@/components/adminpage/editPhotographPage";
import BoughtExclusiveImages from "@/components/adminpage/boughtExclusiveImages";
import EditLegalNotice from "@/components/adminpage/editLegalNotice";
import ReceiptsList from "@/components/adminpage/listReceipts";


export default function AdminPage({ photographers,
  categories,
  policyText,
  receipt,
  legalText,
  pricingInfo,
  pricingExclusiveInfo,
  collections,
  featuredcol,
  contactMails,
  exclusiveCollection,
  supportText,
  photographersPage }) {

  const [activeView, setActiveView] = useState();
  useEffect(() => {
    setActiveView(typeof window !== 'undefined' ? localStorage.getItem('activeView') || 'photographers' : 'photographers');
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'photographers':
        return <AddNewPhotographer photographers={photographers} />;
      case 'photographersPage':
        return <EditPhotographPage photographersPage={photographersPage} />;
      case 'categories':
        return <AddNewCategory categories={categories} collections={collections} photographers={photographers} />;
      case 'privacy':
        return <EditPrivacyPolicy text={policyText} />;
      case 'legal':
        return <EditLegalNotice text={legalText} />;
      case 'collections':
        return <AddNewCollection collections={collections} photographers={photographers} featuredcol={featuredcol} exclusiveCollection={exclusiveCollection} />;
      case 'pricing':
        return <EditPricePage pricingInfo={pricingInfo} pricingExclusiveInfo={pricingExclusiveInfo} />;
      case 'mail':
        return <Mail contactMails={contactMails} />;
      case 'support':
        return <EditSupport supportText={supportText} />;
      case 'photos':
        return <BoughtExclusiveImages photos={exclusiveCollection.photos} />;
      case 'receipt':
        return <ReceiptsList receipts={receipt} />;
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
      <div className="min-h-screen flex flex-col justify-start items-center px-6 md:px-24">
        <ul className="flex flex-wrap space-x-1 md:space-x-2 bg-white p-2 rounded-lg shadow-lg">
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('photographers')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'photographers' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Photographers
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('photographersPage')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'photographersPage' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              PhotographersPage
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('photos')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'photos' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Exclusive Photos
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('categories')}
              className={`w-full whitespace-nowrap text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'categories' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Photo Settings
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('privacy')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'privacy' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Privacy
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('legal')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'legal' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Legal
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('collections')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'collections' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Collections
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('pricing')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'pricing' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              pricing
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('mail')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'mail' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Mail
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('support')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'support' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              support
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => changeActiveView('receipt')}
              className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeView === 'receipt' ? 'text-white bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              receipt
            </button>
          </li>
        </ul>

        <div className="flex flex-col pb-44">{renderActiveView()}</div>
      </div>
    </Layout>
  );
}


export async function getServerSideProps(context) {

  let data = {
    photographers: [],
    categories: [],
    policyText: "",
    legalText: "",
    collections: [],
    featuredcol: [],
    contactMails: [],
    exclusiveCollection: [],
    supportText: [],
    pricingInfo: [],
    pricingExclusiveInfo: [],
    photographersPage: [],
    receipt: []
  };

  try {
    const receipt = await prisma.receipt.findMany({
      orderBy : {
        index: 'desc'
      }
    })
    if(receipt){data.receipt = receipt}

    const photographers = await prisma.photographer.findMany({
      orderBy: [
        { lastName: 'asc' }
      ]
    })
    if (photographers) { data.photographers = photographers }
    const categories = await prisma.categories.findMany({
      orderBy: [
        { name: 'asc' }
      ]
    })
    if (categories) { data.categories = JSON.parse(JSON.stringify(categories)) }
    const collections = await prisma.collection.findMany({
      orderBy: [
        { name: 'asc' }
      ]
    })
    if (collections) { data.collections = JSON.parse(JSON.stringify(collections)) }
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
    if (exclusiveCollection) { data.exclusiveCollection = exclusiveCollection }
    const featuredcol = await prisma.featuredcollections.findFirst({
      where: {
        id: "1"
      },
      select: {
        collection: true,
        title: true,
        subTitle: true
      }
    })
    if (featuredcol) { data.featuredcol = JSON.parse(JSON.stringify(featuredcol)) }
    const policyText = await prisma.privacypolicy.findFirst({
      where: {
        id: "1"
      },
      select: {
        text: true
      }
    });
    if (policyText) { data.policyText = policyText }
    const legalText = await prisma.legalnotice.findFirst({
      where: {
        id: "1"
      },
      select: {
        text: true
      }
    });
    if (legalText) { data.legalText = legalText }
    const photographersPage = await prisma.photographerPage.findFirst({
      where: {
        id: "1"
      },
      select: {
        title: true,
        subtitle: true
      }
    })
    if (photographersPage) { data.photographersPage = photographersPage }

    const contactMails = await prisma.contact.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        emailAddress: true,
        businessPhone: true,
        company: true,
        title: true,
        country: true,
        message: true,
        photos: true,
      }
    })
    if (contactMails) { data.contactMails = contactMails }
    const pricingInfo = await prisma.pricingpage.findFirst({
      where: {
        id: "1"
      },
      select: {
        title: true,
        subtitle: true,
        imageTitleLeft: true,
        imageSubTitleLeft: true,
        imagePriceLeft: true,
        imageTitleRight: true,
        imageSubTitleRight: true,
        imagePriceRight: true,
        footerText: true,
      }
    });
    if (pricingInfo) { data.pricingInfo = pricingInfo }
    const pricingExclusiveInfo = await prisma.pricingpageExclusive.findFirst({
      where: {
        id: "1"
      },
      select: {
        title: true,
        subtitle: true,
        image: true,
        text: true,
      }
    });
    if (pricingExclusiveInfo) { data.pricingExclusiveInfo = pricingExclusiveInfo }
    const supportText = await prisma.support.findMany({
      select: {
        question: true,
        answer: true
      }
    })
    if (supportText) { data.supportText = JSON.parse(JSON.stringify(supportText)) }

    return {
      props: {
        /* photographers,
        categories: JSON.parse(JSON.stringify(categories)),
        policyText,
        legalText,
        pricingInfo,
        pricingExclusiveInfo,
        collections: JSON.parse(JSON.stringify(collections)),
        featuredcol: JSON.parse(JSON.stringify(featuredcol)),
        contactMails,
        exclusiveCollection,
        supportText: JSON.parse(JSON.stringify(supportText)),
        photographersPage */
        ...data
      }
    }

  } catch (error) {
    console.log(error)
    logger.log('error', {
      message: error.message,
      stack: error.stack
    })
    return {
      props: {
       ...data
      }
    }
  } finally {
    await prisma.$disconnect()
  }

}
