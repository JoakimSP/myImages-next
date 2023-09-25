import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import prisma from "@/components/prisma";
import { useRouter } from "next/router";
const logger = require('@/components/utils/logger')
import { logErrorToApi } from "@/components/utils/logErrorToApi";
import Layout from "@/components/layout/layout";
import { getSession } from 'next-auth/react';

export default function Index({ cartData, email }) {
  const router = useRouter()
  const sumOfCart = cartData.reduce((total, photo) => {
    return total + parseInt(photo.priceoption)
  }, 0)
console.log(cartData)
  return (
    <Layout>

      <PayPalScriptProvider options={{ "client-id": "AUpZeEpRpA5n0Af8j2ykd8anE-EM21A6HYKXGsIVYUF2aybDkK-GqCvn-ROcJtleeCl3_refQOXqvLsd", currency: "EUR" }}>
        <div className="relative lg:p-96 lg:ml-32 mt-48 md:mt-0">
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
                  cartData,
                  sumOfCart
                }
                
                try {
                  const result = await fetch('/../api/cart/createOrder', {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                  })
                  if (result) {
                    router.push({
                      pathname: '/checkout',
                      query: {
                        sumOfCart,
                        cartData : JSON.stringify(cartData)
                      }
                    })
                  }
                  else {
                    throw new Error({ error: "Cant accsess createorder" })
                  }
                } catch (error) {
                  logErrorToApi({
                    message: error.message,
                    stack: error.stack
                  })
                }
              });
            }}
          />
        </div>
      </PayPalScriptProvider>


    </Layout>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context)

  try {
    const cartData = await prisma.cart.findMany({
      where: { sessionEmail: session.user.email }
    })

    if (!cartData) {
      return {
        props: {
          cartData: null,
          email: null
        }
      }
    }

    return {
      props: {
        cartData,
        email: session.user.email
      }
    }
  } catch (error) {
    logger.logger.log('error', {
      message: error.message,
      stack: error.stack
    })
    return {
      props: {
        cartData: null,
        email: null
      }
    }
  } finally {
    await prisma.$disconnect()
  }


}
