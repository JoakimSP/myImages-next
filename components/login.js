import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginPage() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div>
                <p>Welcome, {session.user.name || session.user.email}</p>
                <img src={session.user.image} alt="Image of user" />
                <button onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>Sign out</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>You are not signed in</p>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        )
    }

}
