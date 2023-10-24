import Header from "./includes/header"
import Footer from "./includes/footer"

export default function Layout({children}) {
  return (
    <div className="flex  min-h-screen flex-col justify-between bg-custom-grey">
        <Header/>
        <div className="mb-auto">{children}</div>
        <Footer/>
    </div>
  )
}
