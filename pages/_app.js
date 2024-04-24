import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/context/cartProvider"
import "../styles/globals.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from "@/components/errorBoundery";
import CookieConsentBanner from "@/components/utils/cookieConcent";
import { useEffect } from "react";





export default function App({ Component, pageProps, session }) {
  useEffect(() => {
    const result = fetch('api/currency/postCurrency')
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])
     
  return (
    <ErrorBoundary>
      <CookieConsentBanner />
            <SessionProvider session={session}>
              <CartProvider>
                <Component {...pageProps} />
              </CartProvider>
              <ToastContainer />
            </SessionProvider>
          </ErrorBoundary>
          )
}
