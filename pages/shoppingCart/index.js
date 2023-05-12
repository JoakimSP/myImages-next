import { useContext } from "react"
import { CartContext } from "@/context/cartProvider"
import showImages from "@/components/showImages"
import prisma from "@/components/prisma"

export default function ShoppingCart() {
    const {cart} = useContext(CartContext)
  return (
    <div>
      {cart.map((element, index) => {
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

