import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import formatCurrency from '@/components/utils/formatCurrency';
import { getSession, useSession } from 'next-auth/react';
import prisma from '@/components/prisma';
import { CartContext } from "@/context/cartProvider"
import ErrorBoundary from '@/components/errorBoundery';
import Layout from '@/components/layout/layout';

export default function Index({ lastReceipt, photos }) {
  const { data: session } = useSession()
  const { clearCart } = useContext(CartContext)
  const router = useRouter()
  const [sumOfCart, setSumOfCart] = useState();
  useEffect(() => {
    if (router.asPath !== router.route) {
      setSumOfCart(router.query.sumOfCart);
    }
  }, [router]);
  async function handleDownloadImage(e) {
    e.preventDefault()
    const photosID = lastReceipt.map(photo => photo.photosID);
    if (lastReceipt) {
      window.open(`/api/images/downloadImage?receiptId=${encodeURIComponent(JSON.stringify(photosID))}`, '_blank');

    }
    clearCart()
    setTimeout(() => {
      router.push("/")
    }, 5000);
  }
  console.log(photos)
  return (
    <Layout>
  <ErrorBoundary>
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto p-8 max-w-4xl rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Thank you for your payment!
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          A receipt will be downloaded together with the image.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Buyer</h3>
          <p className="text-gray-600 mb-6">Email: {session.user.email}</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Date</h3>
          <p className="text-gray-600 mb-6">{new Date().toDateString()}</p>          

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Image Details</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            {photos.map((photo, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">Title: {photo.title}</h4>
                <p className="text-gray-600">License Type: {photo.exclusive ? "Exclusive" : "Regular"}</p>
                <p className="text-gray-600">Size: {photo.size}</p>
                <p className="text-gray-600">Price: {formatCurrency(photo.price)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center py-4">
            <h2 className="text-2xl font-bold text-gray-800">Total Amount</h2>
            <span className="text-2xl font-bold text-indigo-600">{formatCurrency(sumOfCart)}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={handleDownloadImage} 
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Download Your Image
          </button>
        </div>
      </div>
    </div>
  </ErrorBoundary>
</Layout>

  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context)

  const result = await prisma.receipt.findMany({
    where: {
      sessionEmail: session.user.email
    }
  })


  const filterReceipt = await result.sort((a, b) => {
    if (parseInt(a.dateAdded) > parseInt(b.dateAdded)) {
      return 1
    }
    else {
      return -1
    }
  })

  const lastReceipt = filterReceipt.slice(-1)

  const photoIDs = lastReceipt[0].photosID.split(',');

  const photos = await prisma.photos.findMany({
    where: {
      id: {
        in: photoIDs,
      },
    },
  })


  prisma.$disconnect()
  return {
    props: {
      lastReceipt,
      photos,
    }
  }


} 