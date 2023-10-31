import { v4 } from "uuid";
import { useRef, useState } from "react"
import UploadProfilePicture from "./uploadProfilePicture";
import UploadPhotographersHero from "./uploadPhotographersHero";
import { toast } from "react-toastify";
import { logErrorToApi } from "../utils/logErrorToApi";

export default function UploadImage({ userdata, setIsLoading }) {
    const [imagesUpload, setImagesUpload] = useState([])
    const aspectImage = useRef()

    const uploadImage = async () => {
        if(imagesUpload.type != "image/tiff") return toast.error("Wrong image type")
        if (!imagesUpload.length) return toast.warning("Select an image")
        setIsLoading(true); 

        const formData = new FormData();
        imagesUpload.forEach((image, index) => {
            const imageName = v4() + image.name;
            formData.append(`image[]`, image, imageName);

            const photoInformation = {
                personID: userdata.personID,
                filename: imageName,
                filetype: image.type,
                filesize: image.size,
            };

            formData.append(`photoInformation[]`, JSON.stringify(photoInformation));
        });

        try {
            const res = await fetch('/api/images/storeImages', {
                method: 'POST',
                body: formData
            });
            console.log(res)
            if (res.ok) {
                toast("Image is uploaded");
            }
            else{
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


        <div className="grid grid-cols-2">
            <UploadPhotographersHero userdata={userdata} />
            <UploadProfilePicture userdata={userdata} />        

            <div className="max-w-5xl mx-auto mt-12">
                <h1 className="text-center text-4xl font-semibold text-white mt-12 mb-6 dark:text-white">Upload a photo</h1>
                <p>At the moment, only .tiff files are allowed</p>
                <div className="flex flex-col items-center space-y-6">
                    {/* Drop zone */}
                    <div
                        onDrop={(e) => {
                            e.preventDefault();
                            const files = e.dataTransfer.files;
                            setImagesUpload(prevImages => [...prevImages, ...files]);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        className="flex justify-center items-center w-60 h-60 border-dotted border-4 border-gray-400 hover:border-gray-600 cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                    >
                        <p className="text-gray-800 text-center dark:text-gray-300">{imagesUpload ? imagesUpload.name : "Drop image here"}</p>
                    </div>

                    {/* File Input */}
                    <input
                        onChange={(e) => { setImagesUpload([...e.target.files]) }}
                        className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        accept=".tiff" 
                        multiple
                    />

                    {/* Upload Button */}
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={uploadImage}
                    >
                        Ladda upp bild
                    </button>
                </div>
            </div>
            <img src="" alt="" ref={aspectImage} className="max-w-0 max-h-0" />
        </div>
    )
}
