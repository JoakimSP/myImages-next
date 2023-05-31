import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/context/cartProvider"
import "../styles/globals.css"



export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
    <Component {...pageProps} />
    </CartProvider>
    </SessionProvider>
  )
}
