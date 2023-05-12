import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/context/cartProvider"



export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
    <Component {...pageProps} />
    </CartProvider>
    </SessionProvider>
  )
}
