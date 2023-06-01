import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import formatCurrency from '@/components/utils/formatCurrency';
import { getSession } from 'next-auth/react';
import prisma from '@/components/prisma';
import { CartContext } from "@/context/cartProvider"

export default function Index({lastReceipt}) {
  const { clearCart } = useContext(CartContext)
  const router = useRouter()
  const [sumOfCart, setSumOfCart] = useState();
  useEffect(() => {
    if (router.asPath !== router.route) {
      setSumOfCart(router.query.sumOfCart);
    }
  }, [router]);
  
  const lastBought = parseInt(lastReceipt[0].dateAdded)
  let withinLastMinute = Date.now() - 60000

  if(lastBought < withinLastMinute){
    console.log("Not authorized")
    return null
  }
 

//TODO
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
    
    <div>
      <h1>Thank you for your payment!</h1>
      <p>A receipt has been sent via email</p>

      <h3>Total payment amount</h3>
      <h1>{formatCurrency(sumOfCart)}</h1>
      
      <button onClick={handleDownloadImage}>Here is your link to download the image</button>
    </div>
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