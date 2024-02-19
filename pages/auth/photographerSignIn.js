import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import GoBackButton from "@/components/utils/goBackButton";


export default function PhotographerSignIn() {
    const [errorMessage, setErrorMessage] = useState("");
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
    <div className="h-screen w-full bg-custom-header-grey  text-white">
        <GoBackButton/>
        <div className="flex justify-center items-center pt-48 px-4">
            <form className="">
            <h2 className="my-4">Are you a photographer with specific credentials to this application?</h2>
                                    {/* Photographer Login Heading */}
                                        <div className="mb-6">
                                            <h2 className="text-lg font-semibold dark:text-white">Photographer Login</h2>
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
  )
}
