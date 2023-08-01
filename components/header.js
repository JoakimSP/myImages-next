import Link from "next/link"
import LoginPage from "./login"
import { useSession } from "next-auth/react"
import { CartContext } from "@/context/cartProvider"
import { useContext, useEffect, useState } from "react"



export default function Header() {
  const { data: session, status } = useSession()
  const { cart } = useContext(CartContext)
  const [isAllowed, setIsAllowed] = useState(false)

  //TODO
  //Fetch photographers from getAllPhotographers API

    useEffect(() => {
      if(session && session.user.email === "jocke@live.se"){
        setIsAllowed(true)
      } else {
        setIsAllowed(false)
      }
    }, [session])
  return (
<div className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-gray-950 shadow-md">
    <div className="flex items-center space-x-6">
      <Link href="/">
        <p className="text-gray-300 text-lg font-bold">Home</p>
      </Link>
      <Link href="/photographers">
        <p className="text-gray-300 hover:text-blue-600">Photographers</p>
      </Link>
      {status === "authenticated" && session.provider !== "google" && (
        <Link href="/photographers/edit/editPhotographerPage">
          <p className="text-gray-300 hover:text-blue-600">Edit your page</p>
        </Link>
      )}
      {isAllowed && (
        <Link href="/photographers/createPhotographerAccount">
          <p className="text-gray-300 hover:text-blue-600">Add new photographer</p>
        </Link>
      )}
    </div>
    <div className="flex items-center space-x-6">
    <LoginPage />
    <button className="flex items-center justify-center w-12 h-12 relative">
        <Link href="/shoppingCart">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-12 h-12" fill="white">
          <path d="M96 0c11.5 0 21.4 8.19 23.6 19.51L121.1 32h420.7c20.3 0 36.5 20.25 30.8 40.66l-54 192.04c-3.9 13.8-16.5 23.3-30.8 23.3H170.7l9.2 48H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H159.1c-10.6 0-20.5-8.2-22.7-19.5L76.14 48H24C10.75 48 0 37.25 0 24S10.75 0 24 0h72zm32 464c0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48-48-21.5-48-48zm384 0c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z"/></svg>
          {cart.length !== 0 &&
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
            </span>}
            
        </Link>
    </button>
</div>

  </div>

  )
}
