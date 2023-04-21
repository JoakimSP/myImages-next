import Link from "next/link"
import LoginPage from "./login"
import { useSession } from "next-auth/react"

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <div>
      <LoginPage />
      <Link href="/photographers">photographers</Link>
      {status === "authenticated" && (
        <div>
          <Link href="/photographers/edit/editPhotographerPage">Edit your page</Link>
        </div>
      )}
      <div>
        <Link href="/photographers/createPhotographerAccount">Add new photografer</Link>
      </div>
    </div>
  )
}
