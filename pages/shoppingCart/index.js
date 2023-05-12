import { useContext } from "react"
import { CartContext } from "@/context/cartProvider"
import showImages from "@/components/showImages"
import prisma from "@/components/prisma"

export default function ShoppingCart(photos) {
    
  return (
    <div>
      {Object.keys(photos).map((element, index) => {
        return (
            <div key={index}>
                <p>{element}</p>
                <button>Remove</button>
            </div>
        )
      })}
    </div>
  )
}

async function getServerSideProps(){
    const {cart} = useContext(CartContext)
    try {
        const photos = await prisma.photos.findMany({
            where: {
                id: cart
            }
        })
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            photos
        }
    }
}

