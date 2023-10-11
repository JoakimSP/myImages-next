import InputField from "../../components/utils/inputField";
import { useState } from "react";
import { toast } from "react-toastify";
import ErrorBoundary from "../../components/errorBoundery";
import { logErrorToApi } from "../../components/utils/logErrorToApi";
import Editcollection from "./editcollection";
import Featuredcollections from "./featuredcollections";

export default function AddNewCollection({ collections, photographers, featuredcol }) {
    const [currentCol, setCurrentCol] = useState(collections);
    const [imageUpload, setImageUpload] = useState();
    const [activeView, setActiveView] = useState();

    function setImage(e) {
        setImageUpload(e.target.value);
        console.log(e.target.value);
    }

    async function handleCreateNewCollections(e) {
        e.preventDefault();
        let isUnique = true;

        currentCol.map((item) => {
            if (item.name === e.target.name.value) {
                isUnique = false;
            }
        });

        if (!isUnique) {
            return toast.error("A collection with that name already exists");
        }

        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('description', e.target.description.value);
        formData.append('image', e.target.collection_avatar.files[0]);
        formData.append('photographerID', e.target.user.value);
        formData.append('subtitle', e.target.subtitle.value);
        formData.append('isFeaturedcol', e.target.featuredcol.checked);

        try {
            const response = await fetch("../api/application/collections/addCollection", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast("Created new Collection");
                setCurrentCol((prev) => [...prev, response.data]);
                window.location.reload();
            } else {
                toast.warn("Could not add collection");
            }
        } catch (error) {
            console.log(error);
            logErrorToApi({
                message: error.message,
                stack: error.stack
            });
        }
    }

    const handleDeleteCollections = async (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you want to delete this collection?")) {
            setCurrentCol(prev => prev.filter(col => col.id !== e.currentTarget.value));
            
            const response = await fetch("../api/application/collections/deleteCollection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: e.currentTarget.value }),
            });

            if (response.ok) {
                toast.warn("deleted collection");
                window.location.reload();
            } else {
                toast.error("Could not delete collection");
            }
        }
    }

    const handleEditCollectionView = (e) => {
        setActiveView(e.currentTarget.id);
    }

    return (
        <div className={`relative`}>
            {activeView && (
                <div className={`absolute w-full h-full flex justify-center items-center z-10 transform transition-all duration-500 ease-out ${activeView ? "backdrop-blur-sm opacity-100 scale-100" : "opacity-0 scale-0"}`}>
                    <Editcollection collections={collections} setActiveView={setActiveView} id={activeView} photographers={photographers} />
                </div>
            )}
            <ErrorBoundary>
                <div className="text-center py-8 w-full">
                    <h1 className="text-5xl text-white font-bold">Create New Collection</h1>
                </div>

                <div className="flex justify-between gap-8 w-full mb-8">
                    <form onSubmit={handleCreateNewCollections} method="post" encType="multipart/form-data" className="flex-1 bg-white shadow-xl rounded-xl px-10 py-8">
                        <InputField label="name" type="text" name="name" />
                        <InputField label="description" type="text" name="description" />
                        <InputField label="subtitle" type="text" name="subtitle" />
                        <input onChange={setImage} className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="collection_avatar_help" type="file" name="collection_avatar" />
                        <div className="flex justify-between my-8">
                            <label>Featuredcollection?</label>
                            <input type="checkbox" name="featuredcol" className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-center my-8">Assign collection to a photographer</h3>
                            <ul>
                                {photographers.map((user) => (
                                    <li key={user.personID} className="flex justify-between">
                                        {user.user}
                                        <input type="radio" value={user.personID} name="user" className="w-4 h-4" required />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button className="py-2 px-6 bg-custom-grey text-white font-semibold rounded-md hover:bg-custom-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-custom-grey focus:ring-white" type="submit">
                                Create
                            </button>
                        </div>
                    </form>
                    <div className="flex-1 bg-gray-800 shadow-xl rounded-xl px-10 py-6">
                        <h2 className="text-3xl text-white mb-8">Current collections</h2>
                        <ul>
                            {collections.map((col) => (
                                <li key={col.id} className="flex justify-between my-4">
                                    <span className="text-white">{col.name}</span>
                                    <div>
                                        <button id={col.id} onClick={handleEditCollectionView} className="text-yellow-300 hover:text-yellow-500 mr-4">Edit</button>
                                        <button value={col.id} onClick={handleDeleteCollections} className="text-red-500 hover:text-red-700">Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Featuredcollections featuredcol={featuredcol} />
                </div>
            </ErrorBoundary>
        </div>
    );
}
