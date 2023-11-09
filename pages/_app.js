import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/context/cartProvider"
import "../styles/globals.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from "@/components/errorBoundery";
import CookieConsentBanner from "@/components/utils/cookieConcent";




export default function App({ Component, pageProps, session }) {
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
