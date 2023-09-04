import InputField from "../../components/utils/inputField";
import { useState } from "react";
import { toast } from "react-toastify";
import ErrorBoundary from "../../components/errorBoundery";
import { storage } from "@/components/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { logErrorToApi } from "../../components/utils/logErrorToApi";
import Editcollection from "./editcollection";
import Featuredcollections from "./featuredcollections";

export default function AddNewCollection({ collections, photographers, featuredcol }) {
    const [currentCol, setCurrentCol] = useState(collections)
    const [imageUpload, setImageUpload] = useState()
    const [activeView, setActiveView] = useState();




    async function handleCreateNewCollections(e) {
        e.preventDefault();
        let isUnique = true

        currentCol.map((item) => {
            if (item.name == e.target.name.value) {
                return isUnique = false
            }
            return isUnique = true
        })

        if (!isUnique) { return toast.error("A collection with that name already exists") }

        const imageName = imageUpload.name + v4();
        const imageRef = ref(storage, `collections/${imageName}`);
        const stateData = {
            name: e.target.name.value
        }


        try {
            await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(imageRef);
            const data = {
                name: e.target.name.value,
                description: e.target.description.value,
                image: url,
                photographerID: e.target.user.value,
                subtitle : e.target.subtitle.value,
                isFeaturedcol : e.target.featuredcol.checked

            }

            const response = await fetch("../api/application/collections/addCollection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast("Created new Collection")
                setCurrentCol((prev) => [...prev, stateData])
                window.location.reload()
            }
            else {
                toast.warn("Could not add collection")
            }



        } catch (error) {

            logErrorToApi({
                message: error.message,
                stack: error.stack
            })
        }





    }

    const handleDeleteCollections = async (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you want to delete this collection?")) {
            setCurrentCol(prev => prev.filter(col => col.id != e.currentTarget.value));
            const response = await fetch("../api/application/collections/deleteCollection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: e.currentTarget.value }),
            });

            if (response.ok) {
                toast.warn("deleted collection")
                window.location.reload()

            }
            else {
                toast.error("Could not delete collection")

            }
        }
    }



    const handleEditCollectionView = (e) => {
        setActiveView(e.currentTarget.id)
    }
    return (
        <div className={`relative`}>
            {activeView &&
              <div className={`absolute  w-full h-full flex justify-center items-center z-10 transform transition-all duration-500 ease-out ${activeView ? "backdrop-blur-sm opacity-100 scale-100" : "opacity-0 scale-0"}`}>
              <Editcollection collections={collections} setActiveView={setActiveView} id={activeView} photographers={photographers} />
          </div>
            }
            <ErrorBoundary>
                <div className="text-center py-8 w-full">
                    <h1 className="text-5xl text-white font-bold">Create New Collection</h1>
                </div>


                <div className="flex justify-between gap-8 w-full mb-8">
                    <form onSubmit={handleCreateNewCollections} className="flex-1 bg-white shadow-xl rounded-xl px-10 py-8">
                        <InputField label="name" type="text" name="name" />
                        <InputField label="description" type="text" name="description" />
                        <InputField label="subtitle" type="text" name="subtitle" />
                        <input
                            onChange={(e) => { setImageUpload(e.target.files[0]) }}
                            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="collection_avatar_help"
                            id="collection_avatar"
                            type="file"
                        />
                        <div className="flex justify-between my-8">
                            <label>Featuredcollection?</label>
                            <input type="checkbox" name="featuredcol" className="w-6 h-6"/>
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

                    <div className="flex-1 bg-gray-800 shadow-xl rounded-xl px-10 py-6">
                        <h2 className="text-3xl text-white font-bold mb-6">Current collections</h2>
                        <ul>
                            {currentCol.map((collection) => (
                                <li key={collection.id} className="flex items-center justify-between mb-2 text-lg text-gray-400 hover:text-gray-300 transition-all duration-200">
                                    <button id={collection.id} onClick={handleEditCollectionView}><span className="mr-2">{collection.name}</span></button>
                                    <button onClick={handleDeleteCollections} className="bg-red-500 rounded p-1 transform active:scale-95 transition-transform duration-100" value={collection.id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>

                                    </button>

                                </li>
                            ))}
                        </ul>
                    </div>
                    <Featuredcollections featuredcol={featuredcol}/>
                </div>
            </ErrorBoundary>
        </div>
    )
}
