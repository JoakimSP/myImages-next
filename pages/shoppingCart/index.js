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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" >
        {
          Object.values(photosInCart).map((photo) => {
            return (
              <>
                <Link key={photo.id}  href={`/images/viewimage?img=${encodeURIComponent(photo.url)}`}>
                  <div className="group relative h-60">
                    <Image
                      src={photo.url}
                      alt="image"
                      fill={true}
                      className="object-cover w-full"
                      sizes="(max-width: 768px)"
                    />
                  </div>
                </Link>
                <button onClick={() => { handleRemoveFromCart(photo.id) }}>Remove</button>
                <p>{photo.title}</p>
              </>
            )
          })
        }
      </div>
      <Link href={"/paypalCheckout"}><button>Checkout</button></Link>
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