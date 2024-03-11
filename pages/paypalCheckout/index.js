import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import prisma from "@/components/prisma";
import { useRouter } from "next/router";
const logger = require('@/components/utils/logger')
import { logErrorToApi } from "@/components/utils/logErrorToApi";
import Layout from "@/components/layout/layout";

export default function Index({ photosInCart, email, cartData }) {
  const router = useRouter()
  const sumOfCart = photosInCart.reduce((total, photo) => {
    return total + parseInt(photo.priceoption);
  }, 0);
console.log("cartData:", cartData)
  return (
    <Layout>

      <PayPalScriptProvider options={{ "client-id": process.env.PAYPAL_CLIENT_ID, currency: "USD" }}>
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
                  photosInCart,
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
                        photosInCart,
                        cartData: JSON.stringify(cartData)
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
  const { email } = context.query

  try {
    const cartData = await prisma.cart.findMany({
      where: {
        sessionEmail: email
      }
    })
    const photoIDs = cartData.map(item => item.photoID);

    const photos = await prisma.photos.findMany({
      where: { id: { in: photoIDs } }
    });

    const photosInCart = photoIDs.map(photoID => {
      const photo = photos.find(p => p.id === photoID);
      const cartItem = cartData.find(item => item.photoID === photoID);
      return {
        ...photo,
        priceoption: cartItem.priceoption // Include priceoption in the photo object
      };
    });

    if (!photosInCart) {
      return {
        props: {
          photosInCart: null,
          email: null
        }
      }
    }

    return {
      props: {
        photosInCart,
        email: cartData[0].sessionEmail,
        cartData
      }
    }
  } catch (error) {
    logger.log('error', {
      message: error.message,
      stack: error.stack
    })
    return {
      props: {
        photosInCart: null,
        email: null
      }
    }
  } finally {
    await prisma.$disconnect()
  }


}
