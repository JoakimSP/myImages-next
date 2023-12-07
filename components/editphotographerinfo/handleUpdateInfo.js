import FormInput from "@/pages/photographers/edit/formInput";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function HandleUpdateInfo({ userdata }) {
    const { info } = userdata
    const router = useRouter()
    const [formData, setFormData] = useState({
        personID: userdata.personID,
        country: "",
        city: "",
        about: "",
        camera: "",
        lens: "",
        favoritePhoto: "",
        photoPreference: "",
        careerStart: "",
        cardText: "",
        heroText: ""
    })

    useEffect(() => {
        setFormData({
            ...formData,
            country: info.country || "",
            city: info.city || "",
            about: info.about || "",
            camera: info.camera || "",
            lens: info.lens || "",
            favoritePhoto: info.favoritePhoto || "",
            photoPreference: info.photoPreference || "",
            careerStart: info.careerStart || "",
            cardText: info.cardText || "",
            heroText: info.heroText || ""
        })
    }, [info])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleUpdateInfo = async (e) => {
        e.preventDefault()

        const newUserInformation = {
            ...formData
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
            <h1 className="text-center text-4xl font-semibold text-white pt-12 mb-6 dark:text-white">Photographer Info</h1>

            <form onSubmit={handleUpdateInfo} method='post'>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-md">
                        {
                            Object.keys(formData).slice(1).map((prop) => {
                                return (
                                    <FormInput
                                        key={prop}
                                        type="text"
                                        inputName={prop}
                                        value={formData[prop]}
                                        onChange={handleChange}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className=" px-5 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
