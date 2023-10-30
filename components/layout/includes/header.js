import Link from "next/link"
import LoginPage from "@/components/login"
import { useSession } from "next-auth/react"
import { CartContext } from "@/context/cartProvider"
import { useContext, useEffect, useState } from "react"
import ErrorBoundary from "@/components/errorBoundery"
import Image from "next/image"



export default function Header() {
  const { data: session, status } = useSession()
  const { cart } = useContext(CartContext)
  const [isAllowed, setIsAllowed] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  //TODO
  //Fetch photographers from getAllPhotographers API

  useEffect(() => {
    if (session && session.user.email === "jocke@live.se" || session && session.user.email === "Pernilla@test.se" || session && session.user.email === "test@test" ) {
      setIsAllowed(true)
    } else {
      setIsAllowed(true)
    }
  }, [session])

  return (

    <ErrorBoundary>
      <nav className="bg-custom-header-grey">
        <div className=" flex flex-wrap items-center justify-between md:justify-between mr-0  ml-12 p-4">


          <div className="flex items-center md:order-2">


            <div className="flex items-center space-x-6">
              <LoginPage />
              <button className="flex items-center justify-center w-12 h-12 relative">
                <Link href="/shoppingCart" >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-12 h-12" fill="white">
                    <path d="M96 0c11.5 0 21.4 8.19 23.6 19.51L121.1 32h420.7c20.3 0 36.5 20.25 30.8 40.66l-54 192.04c-3.9 13.8-16.5 23.3-30.8 23.3H170.7l9.2 48H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H159.1c-10.6 0-20.5-8.2-22.7-19.5L76.14 48H24C10.75 48 0 37.25 0 24S10.75 0 24 0h72zm32 464c0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48-48-21.5-48-48zm384 0c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z" /></svg>
                  {cart.length !== 0 &&
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>}

                </Link>
              </button>
            </div>

            <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"></path>
              </svg>
            </button>
          </div>


          <div className={isMobileMenuOpen ? "items-center justify-between w-full md:flex md:w-auto md:order-1" : "flex-1 ml-10 hidden md:flex md:w-auto md:order-1"}>
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border gap-5 border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li><Link href="/" className="block py-2 pl-3 pr-4 text-white rounded   md:p-0 " >Home</Link></li>
              <li><Link href="/photographers" className="block py-2 pl-3 pr-4 text-white rounded   md:p-0 " >Photographers</Link></li>
              <li><Link href="/information/howToAndPricing" className="block py-2 pl-3 pr-4 text-white rounded   md:p-0 " >How to use & Pricing</Link></li>
              <li><Link href="/collections/browseCollections" className="block py-2 pl-3 pr-4 text-white rounded   md:p-0 " >Collections</Link></li>
              {status === "authenticated" && session.provider !== "google" && (
                <li><Link href="/photographers/edit/editPhotographerPage" className="block py-2 pl-3 pr-4 text-white rounded   md:p-0" >Edit your Page</Link></li>
              )}
              {isAllowed && (
                <li><Link href="/admin/adminPage" className="block py-2 pl-3 pr-4 text-white rounded   md:p-0 " >Admin Page</Link></li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </ErrorBoundary>
  )
}
