import InputField from "../utils/inputField";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ErrorBoundary from "../errorBoundery";
import { logErrorToApi } from "../utils/logErrorToApi";

export default function ResetPhotographerPassword({ setActiveView, id, currentUsers }) {
    const [user, setUser] = useState()

    useEffect(() => {
        const currentUser = currentUsers.find((user) => user.personID == id);
        setUser(currentUser)
    },  [id, currentUsers]) 
    async function handleResetPassword(e) {
        e.preventDefault();
        if(e.target.password.value !== e.target.checkpassword.value) {return toast.warn("passwords do not match")}
        if (window.confirm("Are you sure you want to update this users password? This is not reversable")) {
            const newPassword = {
                id: id,
                password: e.target.password.value,
            }

            console.log(e.target.password.value)
            console.log(newPassword.id)

            try {
                const response = await fetch("../api/users/resetPassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPassword),
                });

                if(response.ok){
                    toast("New password created")
                }
                
            } catch (error) {
                console.log(error)
                logErrorToApi({
                    message: error.message,
                    stack: error.stack
                })
                toast.warn("Could not create new password")

            }
        }

    }

    const renderView = () => {
        return (
            <ErrorBoundary>
                <form onSubmit={handleResetPassword} method="post" className="flex-1 bg-slate-500 shadow-xl rounded-xl px-10 py-8">
                <h2>{user ? user.user : 'Loading...'}</h2>
                    <InputField label="Password" type="password" name="password" />
                    <InputField label="Write new password again" type="password" name="checkpassword" />

                    <div className="mt-4 flex justify-center">
                        <button className="py-2 px-6 bg-custom-grey text-white font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300">Submit</button>
                    </div>
                </form>
            </ErrorBoundary>
        )
    }
    return (
        <>
            <div className="p-8 bg-white rounded-md border-4 z-10">
                <div className="flex-1 flex justify-end">
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setActiveView()}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                </div>
                {renderView()}
            </div>
        </>
    )
}
