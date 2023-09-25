import FormInput from "@/pages/photographers/edit/formInput";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function HandleUpdateInfo({ userdata }) {
    const { info } = userdata
    const router = useRouter()

    async function HandleUpdateInfo(e) {
        e.preventDefault()

        const newUserInformation = {
            personID: e.target[0].value,
            country: e.target[1].value,
            city: e.target[2].value,
            about: e.target[3].value,
            camera: e.target[4].value,
            lens: e.target[5].value,
            favoritePhoto: e.target[6].value,
            photoPreference: e.target[7].value,
            careerStart: e.target[8].value
        }


        try {
            const response = await fetch('../../api/users/updatePhotographerInfo', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUserInformation)
            })

            if (response.ok) {
                toast("Your information has been updated")
                router.push("/")
            }
        } catch (error) {
            toast.error("Something went wrong")
        }


    }

    return (
        <div className="flex-1 w-3/4">
            <h1 className="text-center text-4xl font-semibold text-gray-900 pt-12 mb-6 dark:text-white">Photographer Info</h1>

            <form onSubmit={HandleUpdateInfo} method='post'>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-md">
                        {
                            Object.keys(info).map((prop) => {
                                if (prop == "personID") {
                                    return (
                                        <input
                                            key={prop}
                                            type="hidden"
                                            name={prop}
                                            value={userdata.personID}
                                        />
                                    )
                                }
                                return (
                                    <FormInput
                                        key={prop}
                                        type={"text"}
                                        inputName={prop}
                                    />
                                )
                            })
                        }
                        <div className="col-span-1 space-y-4 mt-4 lg:mt-0">
                            {
                                Object.keys(info).map(prop => {
                                    if (prop === "personID") {
                                        return null;  // Explicitly return null to skip rendering anything for this item
                                    } else {
                                        return (
                                            <div key={prop} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-2">
                                                <span className="font-medium capitalize text-gray-700 dark:text-gray-300">{prop.replace(/([A-Z])/g, ' $1')}</span>
                                                <span className="text-gray-900 dark:text-gray-400">{info[prop]}</span>
                                            </div>
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
