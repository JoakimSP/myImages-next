import InputField from "../utils/inputField";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { logErrorToApi } from "../utils/logErrorToApi";
import Router from "next/router";

export default function Editcollection({ collections, setActiveView, id, photographers }) {
    const [imageUpload, setImageUpload] = useState();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        subtitle: "",
        photographerID: "",
        isFeaturedcol: false,
        id: "",
        previusImageFolder: "",
        sortOrder: ""
    });
    const currentCol = collections.find((col) => col.id == id);
    console.log(currentCol)

    useEffect(() => {
        if (currentCol) {
            setFormData({
                name: currentCol.name,
                description: currentCol.description,
                subtitle: currentCol.subtitle,
                photographerID: currentCol.photographerPersonID,
                isFeaturedcol: currentCol.featuredcollectionsId === "1",
                id: currentCol.id,
                previusImageFolder: currentCol.imagepathfolder,
                sortOrder: currentCol.sortOrder
            });
        }
    }, [currentCol]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateCollection = async (e) => {
        e.preventDefault();

        try {
            const postData = new FormData();
            Object.keys(formData).forEach(key => {
                postData.append(key, formData[key]);
            });
            if (imageUpload) {
                postData.append('image', imageUpload);
            }

            const response = await fetch("../api/application/collections/editCollection", {
                method: "POST",
                body: postData,
            });

            if (response.ok) {
                toast("Updated Collection");
                Router.reload()
            } else {
                toast.warn("Could not update collection");
            }

        } catch (error) {
            console.log(error);
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
                                <InputField label="name" type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                                <label htmlFor="description" className="block mb-2 text-gray-700 font-medium">description</label>
                                <textarea className="border rounded-md p-2 w-full focus:ring focus:ring-custom-grey-light focus:border-transparent" type="textarea" name="description" value={formData.description} onChange={handleInputChange} required />
                                <InputField label="subtitle" type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} required />
                                <p className="text-sm text-blue-600 mt-2 mb-4">Please upload images in either JPG or PNG format.</p>
                                <input
                                    onChange={(e) => { setImageUpload(e.target.files[0]) }}
                                    className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="collection_avatar_help"
                                    id="collection_avatar"
                                    type="file"
                                    name="image"
                                    accept="image/png, image/jpeg"
                                />
                                <div className="flex justify-between my-8">
                                    <label>Featuredcollection?</label>
                                    <input
                                        type="checkbox"
                                        name="isFeaturedcol"
                                        className="w-6 h-6"
                                        checked={formData.isFeaturedcol}
                                        onChange={e => setFormData(prevState => ({
                                            ...prevState,
                                            isFeaturedcol: e.target.checked
                                        }))}
                                    />
                                </div>
                                <div className="flex justify-between my-8">
                                    <label>Featuredcollection order</label>
                                    <input
                                        type="number"
                                        max={collections.length}
                                        min="1"
                                        value={formData.sortOrder}
                                        name="featuredcolOrder"
                                        className="w-10 h-10 border border-black focus:border-indigo-500 rounded-md text-center text-lg transition ease-in-out duration-150"
                                        onChange={e => setFormData(prevState => ({
                                            ...prevState,
                                            sortOrder: e.target.value
                                        }))}
                                        title="Choose how the featured collection should be sorted. number 1 will be the first collection, number 2 after that.."
                                    />
                                </div>

                                <div>
                                    <h3 className="font-bold text-center my-8">Assign collection to a photographer</h3>
                                    <ul>
                                        <select value={formData.photographerID} onChange={handleInputChange} name="photographerID">
                                            <option value="">Select a photographer</option>
                                            {photographers.map((user) => {
                                                return (
                                                    <option key={user.id} value={user.personID}>{user.firstName}</option>
                                                )
                                            })}
                                        </select>
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
