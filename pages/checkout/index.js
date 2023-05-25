import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import formatCurrency from '@/components/utils/formatCurrency';

export default function index() {
  const router = useRouter()
  const [sumOfCart, setSumOfCart] = useState();
console.log(router.query.sumOfCart)
  useEffect(() => {
    if (router.asPath !== router.route) {
      setSumOfCart(router.query.sumOfCart);
    }
  }, [router]);

  return (
    <div>
      <h1>Thank you for your payment!</h1>
      <p>A receipt has been sent via email</p>

      <h3>Total payment amount</h3>
      <h1>{formatCurrency(sumOfCart)}</h1>
    </div>
  )
}


/* 
export async function getServerSideProps(context){
    const session = await getSession(context)

    try {
        const result = await prisma.receipt.findMany({
            where : {
                sessionEmail : session.user.email
            }
        })

        prisma.$disconnect()
        return {
            props : {
                result
            }
        }
    } catch (error) {
        console.log(error) 
    }
    
} */