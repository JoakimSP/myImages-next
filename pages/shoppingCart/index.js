import { useContext } from "react"
import { CartContext } from "@/context/cartProvider"
import prisma from "@/components/prisma"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"

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
      <Header />
      <div className="images">
        {Object.values(photosInCart).map((photo, index) => {
          if (photo) {
            return (
              <>
                <Link key={index} href={`/images/${photo.filename}`}>
                  <Image
                    src={`/${photo.url}/thumbnail-${photo.filename}`}
                    alt="Something"
                    width={300}
                    height={300}
                  />
                </Link>
                <button onClick={() => { handleRemoveFromCart(photo.id) }}>Remove</button>
                <p>{photo.title}</p>
              </>
            );
          }
        })}
      </div>
      <Link href={"/paypalCheckout"}><button>Checkout</button></Link>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const cartData = await prisma.cart.findMany()
    const photoIDsInCart = cartData.map(item => item.photoID); // Extract all photoIDs from cartData

    const photosInCart = await prisma.photos.findMany({
      where: {
        id: {
          in: photoIDsInCart
        }
      }
    })

    if (!photosInCart) {
      return
    }
    return {
      props: { photosInCart }
    }

  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }
 
}


