import Layout from "@/components/layout/layout";
import { useState, useRef } from "react";

export default function Test() {
    const [imageUpload, setImageUpload] = useState()
    const aspectImage = useRef()

    const uploadImage = async () => {
        if (imageUpload == null) return;
    
        const reader = new FileReader();
        reader.readAsDataURL(imageUpload);
        reader.onloadend = async () => {
            const base64data = reader.result;
    
            try {
                const res = await fetch('/api/testUpload', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `image=${encodeURIComponent(base64data)}`
                });
    
                if (res.ok) {
                    console.log("image is uploaded");
                }
    
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        };
    };
    
  return (
    <Layout>
        <div className="grid grid-cols-2">
                <h1 className="text-center text-4xl font-semibold text-gray-900 mt-12 mb-6 dark:text-white">Upload a photo</h1>
                <div className="max-w-5xl mx-auto mt-12">
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
                
            </div>
    </Layout>
  )
}
