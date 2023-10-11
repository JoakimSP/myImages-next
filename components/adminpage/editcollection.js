import InputField from "../utils/inputField";
import { useState } from "react";
import { toast } from "react-toastify";
import { logErrorToApi } from "../utils/logErrorToApi";

export default function Editcollection({ collections, setActiveView, id, photographers }) {
    const [imageUpload, setImageUpload] = useState()

    const currentCol = collections.filter((col) => col.id == id)

    const handleUpdateCollection = async (e) => {
        e.preventDefault();

        let isUnique = true;

        collections.map((item) => {
            if (item.name == e.target.name.value) {
                return isUnique = false;
            }
            return isUnique = true;
        });

        if (!isUnique) { return toast.error("A collection with that name already exists"); }

        try {
            const formData = new FormData(); // Create a new FormData object
            formData.append('name', e.target.name.value);
            formData.append('description', e.target.description.value);
            formData.append('photographerID', e.target.user.value);
            formData.append('id', id);
            formData.append('subtitle', e.target.subtitle.value);
            formData.append('isFeaturedcol', e.target.featuredcol.checked);
            if (imageUpload) {
                formData.append('image', imageUpload);
            }

            const response = await fetch("../api/application/collections/editCollection", {
                method: "POST",
                body: formData, // Use formData here
            });

            if (response.ok) {
                toast("Updated Collection");
            } else {
                toast.warn("Could not update collection");
            }

        } catch (error) {
            console.log(error)
            logErrorToApi({
                message: error.message,
                stack: error.stack
            });
        }
    };

    const renderView = () => {
        for (let col of collections) {
            if (col.id === id) {
                return (

                    <>
                        <div className="flex-1">
                            <h3 className="text-center text-2xl">{col.name}</h3>
                        </div>
                        <div className="flex-1">
                            <form onSubmit={handleUpdateCollection} encType="multipart/form-data" method="post">
                                <InputField label="name" type="text" name="name" defaultValue={col.name} placeholder={col.name} required />
                                <InputField label="description" type="text" name="description" defaultValue={col.description} placeholder={col.description} required />
                                <InputField label="subtitle" type="text" name="subtitle" defaultValue={col.subtitle} placeholder={col.subtitle} required />
                                <input
                                    onChange={(e) => { setImageUpload(e.target.files[0]) }}
                                    className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="collection_avatar_help"
                                    id="collection_avatar"
                                    type="file"
                                    name="image"
                                    required
                                />
                                <div className="flex justify-between my-8">
                                    <label>Featuredcollection?</label>
                                    <input type="checkbox" name="featuredcol" className="w-6 h-6" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-center my-8">Assign collection to a photographer</h3>
                                    <ul>
                                        {photographers.map((user) => {
                                            return (
                                                <li key={user.personID} className="flex justify-between">
                                                    {user.user}
                                                    <input type={"radio"} value={user.personID} name="user" className="w-4 h-4" required />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <button className="py-2 px-6 bg-custom-grey text-white font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300">Submit</button>
                                </div>
                            </form>
                        </div>
                    </>
                )
            }
        }
        return null;
    };

    return (
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
    )
}
