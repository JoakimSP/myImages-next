
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
                
                <button  className="inline-flex items-center m-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>Sign out</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <p className="text-gray-300">You are not signed in</p>
                <button  className="inline-flex items-center m-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={() => signIn()}>Sign in</button>
            </div>
        )
    }

}
