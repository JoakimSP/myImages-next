import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import formatCurrency from '@/components/utils/formatCurrency';
import { getSession } from 'next-auth/react';
import prisma from '@/components/prisma';
import { CartContext } from "@/context/cartProvider"
import ErrorBoundary from '@/components/errorBoundery';
import Layout from '@/components/layout/layout';

export default function Index({lastReceipt}) {
  const { clearCart } = useContext(CartContext)
  const router = useRouter()
  const [sumOfCart, setSumOfCart] = useState();
  useEffect(() => {
    if (router.asPath !== router.route) {
      setSumOfCart(router.query.sumOfCart);
    }
  }, [router]);
  

  async function handleDownloadImage(e){
    e.preventDefault()
    const photosID = lastReceipt.map(photo => photo.photosID);
    if(lastReceipt){                                                        
      window.open(`/api/images/downloadImage?receiptId=${encodeURIComponent(JSON.stringify(photosID))}`, '_blank');

    }
    clearCart()
    setTimeout(() => {
      router.push("/")
    }, 5000);
  }

  return (
    <Layout>
      <ErrorBoundary>
        <div className="flex items-center justify-center min-h-full mt-6">
          <div className="bg-white bg-opacity-95 p-8 w-4/5 mx-auto max-w-2xl rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-5">Thank you for your payment!</h1>
            <p className="mb-5">A receipt has been sent via email.</p>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <h3 className="mb-3">Seller</h3>
                <p>Name: ...</p>
                <p>Email: ...</p>
              </div>
              <div>
                <h3 className="mb-3">Buyer</h3>
                <p>Name: ...</p>
                <p>Email: ...</p>
              </div>
            </div>
            <h3 className="mb-3">Image Details</h3>
            <p>Title: ...</p>
            <p>License Type: ...</p>
            <p className="mb-5">Price: {formatCurrency(sumOfCart)}</p>
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-3xl font-bold">Total Amount</h1>
              <h1 className="text-3xl font-bold">{formatCurrency(sumOfCart)}</h1>
            </div>
            <button onClick={handleDownloadImage} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">Download Your Image</button>
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

    prisma.$disconnect()
    return {
      props: {
        lastReceipt
      }
    }
  

} 