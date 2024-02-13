// pages/auth/signin.js
import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import GoBackButton from "@/components/utils/goBackButton";

/* import { signIn, csrfToken } from "next-auth/react"; */

export default function SignIn() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isPhotographer, setIsPhotographer] = useState(false);
    const email = useRef("");
    const pass = useRef("");
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        const result = await signIn("credentials", {
            email: email.current,
            password: pass.current,
            redirect: false,
            callbackUrl: "/",
        });

        if (result?.error) {
            setErrorMessage("Incorrect email or password. Please try again.");
        } else {
            setErrorMessage("");
            router.push("/")
        }
    };

    return (
        <section className="h-screen">
            <div className="flex w-full h-full">
                <div className="flex flex-1 h-full flex-wrap justify-center lg:justify-between">
                    {/* Left column container with background */}
                    <div className="absolute md:relative flex-2 mb-12 md:mb-0  h-full w-full md:w-8/12 ">
                        <Image
                            src="/appcontent/1ADE38D0-8B0E-46FB-8EB7-7F50927BCA21.JPG"
                            className=" object-cover"
                            fill={true}
                            alt="Phone image"
                        />
                    </div>

                    {/* Right column container with form */}
                    <div className="flex-1 flex flex-col justify-center mx-6 w-5/12 z-10">

                        <form>
                            <GoBackButton />
                            {/* Customer Login Heading */}
                            <div className="mb-3">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Login</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Sign in with Google.</p>
                            </div>

                            {/* Google login button */}
                            <button
                                className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                style={{ backgroundColor: "#3b5998" }}
                                onClick={() => signIn("google", { callbackUrl: `${window.location.origin}/` })}
                                role="button"
                            >
                                <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                </svg>
                                Continue with Google
                            </button>
                            <button
                                className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                style={{ backgroundColor: "#0078d4" }}
                                onClick={() => signIn('auth0', { callbackUrl: `${window.location.origin}/` })}
                                role="button"
                            >
                                <Image src={"/appcontent/camera.png"} alt="Myimages logo" width={25} height={25} className={"mx-3"} />
                                Sign in using email
                            </button>

                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400"> To enable purchasing of photos you need a PayPal account,
                                    don&apos;t have an account yet? Get started here: <Link className="className='font-bold text-blue-500 hover:text-blue-600 focus:text-blue-600 hover:underline focus:underline transition duration-300 ease-in-out px-1 -mx-1' " href={"https://www.paypal.com/c2/webapps/mpp/how-to-guides/how-to-use-paypal?locale.x=en_C2"}>Go to instructions.</Link></p>
                            </div>

                            {/* Divider */}
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
                            </div>

                            <h2 className="my-4">Are you a photographer with specific cresidentals to this application?</h2>

                            {/* Photographer Login Heading */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Photographer Login</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Use your email and password to sign in.</p>

                                    {/* Email input */}
                                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Email address"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => (email.current = e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Password input */}
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => (pass.current = e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Remember me and Forgot password link */}
                                    <div className="mb-6 flex items-center justify-between">
                                        <a href="#!" className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                                            Forgot password?
                                        </a>
                                    </div>

                                    {/* Submit button */}
                                    <button onClick={onSubmit} className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal bg-slate-50 text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                        Sign in
                                    </button>
                                </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}