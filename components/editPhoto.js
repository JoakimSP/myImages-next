import router from "next/router"
import { toast } from "react-toastify"
import ErrorBoundary from "./errorBoundery"
import TagsInput from "react-tagsinput"
import 'react-tagsinput/react-tagsinput.css'
import { useState } from "react"

export default function EditPhoto({ photo, categories, collections, photoCopies }) {
    const [tags, setTags] = useState(photo.tags || [])
    const photoCopiesId = photoCopies.map(copy => ({ id: copy.id, size: copy.size}));
    console.log(collections)

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
            <form className="space-y-4" onSubmit={HandleUpdateInfo}>
                <div>
                    <label className="block mb-2" htmlFor="title">title</label>
                    <input id="title" type="text" name="title" className="w-full p-2 border rounded" defaultValue={photo.title} placeholder={photo.title} required />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="description">Description</label>
                    <input id="description" type="text" name="description" className="w-full p-2 border rounded" defaultValue={photo.description} placeholder={photo.description} required />
                </div>
                {photoCopies.map((copy, index) => {
                    return (<div key={index}>
                    <label className="block mb-2" htmlFor="price">Price {copy.size}</label>
                    <input id="price" type="number" min="0" name={`price${copy.size}`} className="w-full p-2 border rounded" defaultValue={copy.price} placeholder={copy.price} required />
                </div>
                )})}
                <div className="space-y-2">

                    <div>
                        <div>
                            <legend className="font-semibold">Category</legend>
                            <select name="categories" defaultValue={photo.categoriesId}>
                                {categories.map((cat) => {
                                    return (
                                        <option key={cat.id} value={cat.id} className="mr-2">{cat.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <legend className="font-semibold">Collections</legend>
                            <select name="collections" defaultValue={photo.collectionId}>
                                {collections.map((col) => {
                                    return (
                                        <option key={col.id} value={col.id} className="mr-2">{col.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                </div>
                <div>
                    <label>Should the photo exclusive?</label>
                    <div><input type="checkbox" name="exclusive" className="w-6 h-6" /></div>
                </div>
                <div>
                    <TagsInput value={tags} onChange={handleUpdateTags} onlyUnique />
                </div>
                <div>
                    <input type="submit" value="Submit" className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700" />
                </div>
            </form>
        </ErrorBoundary>
    )
}