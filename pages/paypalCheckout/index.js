import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import prisma from "@/components/prisma";
import { useRouter } from "next/router";
const logger = require('@/components/utils/logger')

export default function Index({ photosInCart, email }) {
const router = useRouter()
  const sumOfCart = photosInCart.reduce((total, photo) => {
    return total + parseInt(photo.price)
  }, 0)
  return (
    <PayPalScriptProvider options={{ "client-id": "AUpZeEpRpA5n0Af8j2ykd8anE-EM21A6HYKXGsIVYUF2aybDkK-GqCvn-ROcJtleeCl3_refQOXqvLsd", currency: "EUR" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    value: sumOfCart,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(async function (details) {
            data = {
              details,
              email,
              photosInCart,
              sumOfCart
            }
           try {
             const result = await fetch('/../api/cart/createOrder', {
              method: "POST",
              credentials: "include",
              headers : {
                "Content-type" : "application/json"
              },
              body: JSON.stringify(data)
             })

             if(result){
              router.push({
                pathname: '/checkout',
                query: { 
                  sumOfCart }
            })
             }
             else{
              throw new Error({error: "Cant accsess createorder"})
             }
           } catch (error) {
            logger.logger.log('error', error)
           }
          });
        }}
      />
    </PayPalScriptProvider>
  )
}


export async function getServerSideProps() {

  try {
    const cartData = await prisma.cart.findMany()
    const photoIDsInCart = cartData.map(item => item.photoID);

    const photosInCart = await prisma.photos.findMany({
      where: {
        id: {
          in: photoIDsInCart
        }
      }
    })

    if (!photosInCart) {
      return {
        props: {
          photosInCart : null,
           email : null
        }
      }
    }

    return {
      props: { 
        photosInCart,
        email : cartData[0].sessionEmail
      }
    }
  } catch (error) {
    logger.logger.log('error', error)
    return {
      props: {
        photosInCart : null,
         email : null
      }
    }
  } finally {
    await prisma.$disconnect()
  }

 
}
