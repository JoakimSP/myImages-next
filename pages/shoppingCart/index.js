import { useContext } from "react"
import { CartContext } from "@/context/cartProvider"
import prisma from "@/components/prisma"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import { getSession } from "next-auth/react"

export default function ShoppingCart({ photosInCart }) {
  const { removeFromCart } = useContext(CartContext)


  async function handleRemoveFromCart(id) {
    removeFromCart(id)
    const result = await fetch('/api/cart/removeCartData', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(id)
    })
    location.reload()
  }


  return (
    <>
    <Header/>

    <div className="p-8  dark:bg-gray-900 min-h-screen">
        <h1 className="text-center text-3xl font-semibold mb-10 text-gray-800">Your Cart</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
            {
                Object.values(photosInCart).map((photo) => (
                    <div key={photo.id} className="rounded-lg shadow-md overflow-hidden bg-white group">
                        <Link className="block relative h-60" href={`/images/viewimage?img=${encodeURIComponent(photo.url)}`}>
                                <Image
                                    src={photo.url}
                                    alt="image"
                                    fill
                                    className="object-cover w-full transition-transform duration-300 group-hover:scale-105"
                                />
                        </Link>

                        <div className="p-4">
                            <p className="mb-4 font-medium text-gray-800">{photo.title}</p>
                            <button 
                                onClick={() => { handleRemoveFromCart(photo.id) }} 
                                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded focus:outline-none transition-colors duration-300"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>

        <div className="mt-10 text-center">
            <Link href={"/paypalCheckout"}>
                <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 focus:outline-none transition-colors duration-300">
                    Checkout
                </button>
            </Link>
        </div>
    </div>
</>

  )
}

export async function getServerSideProps(context) {
  
  try {
    const session = await getSession(context)
    const cartData = await prisma.cart.findMany()
    const currentUserCart = await cartData.filter(item => item.sessionEmail == session.user.email)

    const photoIDsInCart = currentUserCart
    .map(item => item.photoID); // Extract all photoIDs from cartData */

    const photosInCart = await prisma.photos.findMany({
      where: {
        id: {
          in: photoIDsInCart
        }
      }
    })

   
    return {
      props: { photosInCart }
    }

  } catch (error) {
    console.log(error)
    return {
        props: { photosInCart: [] }  // you should return an object in every condition
    }
  } finally {
    await prisma.$disconnect()
  }

}




{/*  <Header />
      <div className="images">
        {Object.values(photosInCart).map((photo, index) => {
          if (photo) {
            return (
              <div key={index}>
                <Link  href={`/images/${photo.filename}`}>
                  <Image
                    src={`/${photo.url}`}
                    alt="Something"
                    width={300}
                    height={300}
                  />
                </Link>
                <button onClick={() => { handleRemoveFromCart(photo.id) }}>Remove</button>
                <p>{photo.title}</p>
              </div>
            );
          }
        })}
      </div> 
      <Link href={"/paypalCheckout"}><button>Checkout</button></Link>
      */}