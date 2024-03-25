import { useContext } from "react"
import { CartContext } from "@/context/cartProvider"
import prisma from "@/components/prisma"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/layout/layout"
import { getSession } from "next-auth/react"
const logger = require('@/components/utils/logger')
import formatCurrency from "@/components/utils/formatCurrency"
import Head from "next/head"


export default function ShoppingCart({ photosInCart, session, cartData }) {
  const { removeFromCart } = useContext(CartContext)
  const { email } = session.user


  async function handleRemoveFromCart(id, userEmail) {
    removeFromCart(id)

    const data = {
      id,
      userEmail
    }

    const result = await fetch('/api/cart/removeCartData', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    if (result.ok) {
      location.reload()
    }
  }


  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="Your shopping cart for photography images" />
        <meta name="keywords" content="shopping, cart, photography, images" />
      </Head>
      <div className="bg-custom-grey">


        <div className="p-8  dark:bg-gray-900 min-h-screen">
          <h1 className="text-center text-3xl font-semibold mb-10 text-white">Your Cart</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
            {
              photosInCart.map((photo, index) => (
                <div key={photo.id} className="rounded-lg shadow-md overflow-hidden bg-white group">
                  <Link className="block relative h-60" href={`/images/viewimage?img=${encodeURIComponent(photo.url)}`}>
                    <Image
                      src={`/api/images/viewImage?name=${cartData[index].thumbnail}`}
                      alt="image"
                      fill
                      className="object-cover w-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="p-4">
                    <p className="mb-4 font-medium text-gray-800">{photo.title}</p>
                    <button
                      onClick={() => { handleRemoveFromCart(photo.id, email) }}
                      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded focus:outline-none transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                  <span className="m-6">{formatCurrency(cartData[index].priceoption)}</span>
                </div>
              ))
            }
          </div>
          {photosInCart != 0 &&
            <div className="mt-10 text-center">
              <Link href={`/paypalCheckout?email=${email}`}>
                <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 focus:outline-none transition-colors duration-300">
                  Checkout
                </button>
              </Link>
            </div>
          }
        </div>
      </div>
    </Layout>

  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  try {

    const cartData = await prisma.cart.findMany({
      where: {
        sessionEmail: session.user.email
      }
    })
    const currentUserCart = await cartData.filter(item => item.sessionEmail == session.user.email)

    const photoIDsInCart = currentUserCart
      .map(item => item.photoID); // Extract all photoIDs from cartData */
    const iDInCart = currentUserCart
      .map(item => item.id); // Extract all id from cartData */

    const photosInCart = await prisma.photos.findMany({
      where: {
        id: {
          in: photoIDsInCart
        }
      }
    })

    return {
      props: { photosInCart, session, cartData }
    }

  } catch (error) {
    logger.log('error', {
      message: error.message,
      stack: error.stack
    })
    return {
      props: {
        photosInCart: [],
        session
      }  // you should return an object in every condition
    }
  } finally {
    await prisma.$disconnect()
  }

}