import router from "next/router"
import { toast } from "react-toastify"
import ErrorBoundary from "./errorBoundery"
import TagsInput from "react-tagsinput"
import 'react-tagsinput/react-tagsinput.css'
import { useState } from "react"

export default function EditPhoto({ photo, categories, collections, photoCopies }) {
    const [tags, setTags] = useState(photo.tags || [])
    const photoCopiesId = photoCopies.map(copy => ({ id: copy.id, size: copy.size}));

    const handleUpdateTags = (newTags) => {
        setTags(newTags);
    };

    async function HandleUpdateInfo(e) {
        e.preventDefault()


        let catValue

        const newPhotoInformation = {
            title: e.target.title.value,
            filename: photo.filename,
            description: e.target.description.value,
            priceOriginal: e.target.priceoriginal.value,
            priceLarge: e.target.pricelarge.value,
            priceMedium: e.target.pricemedium.value,
            priceSmall: e.target.pricesmall.value,
            tags: tags,
            photoID: photoCopiesId,
            categoriesId: e.target.categories.value,
            collectionId: e.target.collections.value,


        }


        try {
            const response = await fetch('../api/images/editPhotoInfo', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newPhotoInformation)
            })

            if (response.ok) {
                toast("Photo information updated")
                router.push("/")

            }
        } catch (error) {
            toast("Opps, something went wrong")
        }

    }
    return (
        <ErrorBoundary>
        <form className="space-y-6" onSubmit={HandleUpdateInfo}>
            <div className="space-y-4">
                <div>
                    <label className="block text-lg mb-2" htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" className="w-full p-2 border rounded" defaultValue={photo.title} placeholder={photo.title} required />
                </div>
                <div>
                    <label className="block text-lg mb-2" htmlFor="description">Description</label>
                    <input id="description" type="text" name="description" className="w-full p-2 border rounded" defaultValue={photo.description} placeholder={photo.description} required />
                </div>
            </div>
    
            {photoCopies.map((copy, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-lg mb-2" htmlFor="price">Price {copy.size}</label>
                    <input id="price" type="number" min="0" name={`price${copy.size}`} className="w-full p-2 border rounded" defaultValue={copy.price} placeholder={copy.price} required />
                </div>
            ))}
    
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-lg mb-2">Category</label>
                    <select name="categories" defaultValue={photo.categoriesId} className="w-full p-2 border rounded">
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
    
                <div>
                    <label className="block text-lg mb-2">Collections</label>
                    <select name="collections" defaultValue={photo.collectionId} className="w-full p-2 border rounded">
                        {collections.map((col) => (
                            <option key={col.id} value={col.id}>{col.name}</option>
                        ))}
                    </select>
                </div>
            </div>
    
            <div className="flex items-center space-x-2 mt-4">
                <input type="checkbox" name="exclusive" className="w-6 h-6" />
                <label className="text-lg">Should the photo be exclusive?</label>
            </div>
    
            <div className="mt-4">
                <p className="text-blue-600 font-medium mb-1"><i className="info icon"></i> Tip: Type a tag and press Enter to queue it.</p>
                <TagsInput value={tags} onChange={handleUpdateTags} onlyUnique className="w-full p-2 border rounded" />
            </div>
    
            <div className="mt-6">
                <input type="submit" value="Submit" className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out" />
            </div>
        </form>
    </ErrorBoundary>
    
    )
}