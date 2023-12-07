import { useState } from "react"
import { toast } from "react-toastify";


export default function UploadProfilePicture({ userdata }) {
    const [imageUpload, setImageUpload] = useState()

    const uploadImage = async () => {
        if (imageUpload == null) return;

        const formData = new FormData();
        formData.append('image', imageUpload);
        formData.append('userdata', JSON.stringify(userdata));

        try {
            const res = await fetch('/api/images/storeHeroPicture', {
                method: 'POST',
                body: formData,
            });



            if (res.ok) {
                // The image path is returned in data.filePath
                // You can use it further as required.
                toast('Image uploaded');
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

    /*     const uploadImageData = async (imagePath) => {
            const photoInformation = {
                imagePath: imagePath,
                userdata: userdata
            }
    
            const res = await fetch('../../api/images/storeProfilePicture', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(photoInformation)
            })
        } */


    return (
        <div>
            <div className="max-w-5xl mx-auto mt-12">
                <h1 className="text-center text-4xl font-semibold text-white mt-12 mb-6 dark:text-white">Upload a hero-picture for your page</h1>
                <div className="flex flex-col items-center space-y-6">
                    {/* Drop zone */}
                    <div
                        onDrop={(e) => {
                            e.preventDefault();
                            const files = e.dataTransfer.files;
                            if (files.length) {
                                setImageUpload(files[0]);
                            }
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        className="flex justify-center items-center w-60 h-60 border-dotted border-4 border-gray-400 hover:border-gray-600 cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                    >
                        <p className="text-gray-800 text-center dark:text-gray-300">{imageUpload ? imageUpload.name : "Drop image here"}</p>
                    </div>

                    {/* File Input */}
                    <input
                        onChange={(e) => { setImageUpload(e.target.files[0]) }}
                        className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        name="image"
                    />

                    {/* Upload Button */}
                    <button
                        className="px-5 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={uploadImage}
                    >
                        Ladda upp bild
                    </button>
                </div>
            </div>
        </div>
    )
}
