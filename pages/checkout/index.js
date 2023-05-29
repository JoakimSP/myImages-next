import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import formatCurrency from '@/components/utils/formatCurrency';
import { getSession } from 'next-auth/react';
import prisma from '@/components/prisma';

export default function Index({lastReceipt}) {
  console.log(lastReceipt)
  const router = useRouter()
  const [sumOfCart, setSumOfCart] = useState();
  useEffect(() => {
    if (router.asPath !== router.route) {
      setSumOfCart(router.query.sumOfCart);
    }
  }, [router]);

//TODO
//Check weather this receipt is created witihin a 1 minute timespan
  async function handleDownloadImage(e){
    e.preventDefault()
    const photosID = lastReceipt.map(photo => photo.photosID);
    if(lastReceipt){                                                        
      window.open(`/api/images/downloadImage?receiptId=${encodeURIComponent(JSON.stringify(photosID))}`, '_blank');

    }

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