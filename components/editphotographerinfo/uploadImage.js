import { v4 } from "uuid";
import { useState } from "react";
import UploadProfilePicture from "./uploadProfilePicture";
import UploadPhotographersHero from "./uploadPhotographersHero";
import { toast } from "react-toastify";
import { logErrorToApi } from "../utils/logErrorToApi";
import InputField from "../utils/inputField";
import TagsInput from "react-tagsinput"
import 'react-tagsinput/react-tagsinput.css'
import {validateImage} from "../utils/validateImageUpload";

export default function UploadImage({ userdata, setIsLoading, categories, collections }) {
    const [imagesUpload, setImagesUpload] = useState([]);
    const [tags, setTags] = useState([])
    const [exclusive, setExclusive] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceSmall: '',
        priceMedium: '',
        priceLarge: '',
        exclusive: false,
        category: categories[0]?.id,
        collection: null,
    });

    let filterCollections = collections;
    if (userdata.role != "admin") {
        filterCollections = collections.filter(col => { return col.photographerPersonID == userdata.personID })
    }


    const handleUpdateTags = (newTags) => {
        setTags(newTags);
    };

    const handleInputChange = (name, value) => {
        if (name == "exclusive") { setExclusive(!exclusive) }


            setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const uploadImage = async (e) => {


        setIsLoading(true);

        // Validate the image
        try {
            await validateImage(imagesUpload[0], formData);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
            return;
        }

        const requestFormData = new FormData();
        imagesUpload.forEach((image) => {
            const imageName = v4() + image.name;
            requestFormData.append(`image[]`, image, imageName);

            const photoInformation = {
                personID: userdata.personID,
                filename: imageName,
                filetype: image.type,
                filesize: image.size,
                title: formData.title,
                description: formData.description,
                priceSmall: formData.priceSmall,
                priceMedium: formData.priceMedium,
                priceLarge: formData.priceLarge,
                exclusive: formData.exclusive,
                category: formData.category,
                collection: formData.collection,
                tags: tags
            };



            requestFormData.append(`photoInformation[]`, JSON.stringify(photoInformation));

        });
        try {
            const res = await fetch('/api/images/storeImages', {
                method: 'POST',
                body: requestFormData
            });
            if (res.ok) {
                toast("Image is uploaded");
            } else {
                toast("Error uploading image");
            }
        } catch (error) {
            toast("Error uploading image");
            console.error(error);
            logErrorToApi({
                message: error.message,
                stack: error.stack
            });
        }

        setIsLoading(false);
    };


    return (
        <div className="grid md:grid-cols-2 grid-cols-1">
            <UploadPhotographersHero userdata={userdata} />
            <UploadProfilePicture userdata={userdata} />
            <div className="max-w-5xl mx-auto mt-12">

                <h1 className="text-center text-4xl font-semibold text-white mt-12 mb-6 dark:text-white">Upload a photo</h1>
                <p className="text-center text-xl text-red-500 border-2 border-red-600 bg-white my-4">
                    Currently, we only accept <strong className="text-2xl">.tiff</strong> files. Please ensure that the largest dimension of your image is at least
                     <strong className="text-2xl">3260 pixels</strong> and the minimum filesize is  <strong className="text-2xl">80mb</strong>
                </p>

                <div className="grid grid-cols-2 items-center gap-6">
                    {/* Drop zone */}
                    <div className="flex flex-col justify-center items-center">
                        <div
                            onDrop={(e) => {
                                e.preventDefault();
                                const files = Array.from(e.dataTransfer.files);
                                setImagesUpload(prevImages => [files[0]]);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            className="flex justify-center items-center mb-5 w-60 h-60 border-dotted border-4 border-gray-400 hover:border-gray-600 cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                        >
                            <p className="text-gray-800 text-center dark:text-gray-300">
                                {imagesUpload.length > 0 ? `Added ${imagesUpload.length} images` : "Drop images here or click button below"}
                            </p>
                        </div>
                        {/* File Input */}
                        <input
                            onChange={(e) => {
                                setImagesUpload([...e.target.files]);
                            }}
                            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="user_avatar_help"
                            id="user_avatar"
                            type="file"
                            accept=".tiff"
                        />
                        {userdata.role == "admin" ?
                            <div className="flex items-center space-x-2 mt-4">
                                <input type="checkbox" name="exclusive" className="w-6 h-6" onChange={(e) => handleInputChange('exclusive', e.target.value)} />
                                <label className="text-lg">Should the photo be exclusive?</label>
                            </div>
                            : <div></div>}
                        <InputField type={"text"} label={"title"} name={"title"} onChange={(e) => handleInputChange('title', e.target.value)} required />
                        <InputField as={"textarea"} type={"text"} label={"description"} name={"description"} onChange={(e) => handleInputChange('description', e.target.value)} required />
                    </div>

                    <div className="flex flex-col justify-center">

                        {!exclusive && (
                            <>
                                <InputField type={"number"} label={"price small"} name={"priceSmall"} onChange={(e) => handleInputChange('priceSmall', e.target.value)} required />
                                <InputField type={"number"} label={"price medium"} name={"priceMedium"} onChange={(e) => handleInputChange('priceMedium', e.target.value)} required />
                            </>
                        )}
                        <InputField type={"number"} label={`${!exclusive ? "Price Large" : "Price Exclusive"}`} name={"priceLarge"} onChange={(e) => handleInputChange('priceLarge', e.target.value)} required />
                        {!exclusive &&
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-lg mb-2">Category</label>
                                        <select name="categories" className="w-full p-2 border rounded" onChange={(e) => handleInputChange('category', e.target.value)} required>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-lg mb-2">Collections</label>
                                        <select name="collections" className="w-full p-2 border rounded" onChange={(e) => handleInputChange('collection', e.target.value)} required>
                                            <option key={null} value={`${null}`}>No collection</option>
                                            {filterCollections.map((col) => (
                                                <option key={col.id} value={col.id}>{col.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-blue-600 font-medium mb-1"><i className="info icon"></i> Tip: Type a tag and press Enter to queue it.</p>
                                    <TagsInput value={tags} onChange={handleUpdateTags} onlyUnique className="w-full p-2 border rounded" />
                                </div>
                            </>
                        }
                        <button
                            className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={uploadImage}
                        >
                            Ladda upp bild
                        </button>
                    </div>


                    {/* Upload Button */}

                </div>
            </div>
            {/* <img src="" alt="" ref={aspectImage} className="max-w-0 max-h-0" />  */}  {/* To get the original size of the image */}
        </div>
    );
}
