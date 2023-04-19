import Link from "next/link"
import LoginPage from "./login"
import { useSession } from "next-auth/react"

export default function Header() {
    
  return (
    <div>
        <LoginPage/>
        <Link href="/photographers">photographers</Link>
        <div>
          <Link href="/photographers/edit/editPhotographerPage">Edit you page</Link>
        </div>
        <div>
        <Link href="/photographers/createPhotographerAccount">Add new photografer</Link>
        </div>
    </div>
  )
}
