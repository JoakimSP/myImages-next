
import { useSession, signIn, signOut } from "next-auth/react"


export default function LoginPage() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div>
                <p className="text-gray-300">Welcome, {session.user.name || session.user.email}</p>
                {/* {session.user.image &&
                <Image src={`/${session.user.image}`} alt="Image of user" width={100} height={100} />
                } */}
                
                <button  className="px-2 md:px-4 md:py-2 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded" onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>Sign out</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <p className="text-gray-300">You are not signed in</p>
                <button  className="px-2 md:px-4 md:py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded" onClick={() => signIn()}>Sign in</button>
            </div>
        )
    }

}
