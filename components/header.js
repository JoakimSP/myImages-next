import Link from "next/link"
import LoginPage from "./login"

export default function Header() {
    
  return (
    <div>
        <LoginPage/>
        <Link href="/photographers">photographers</Link>
    </div>
  )
}
