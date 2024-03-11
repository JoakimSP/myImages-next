import router from "next/router"
import { toast } from "react-toastify"
import ErrorBoundary from "./errorBoundery"
import TagsInput from "react-tagsinput"
import 'react-tagsinput/react-tagsinput.css'
import { useState } from "react"

export default function EditPhoto({ photo, categories, collections, photoCopies, photographer }) {
    const [tags, setTags] = useState(photo.tags || [])
    const [isExclusive, setIsExclusive] = useState(photo.exclusive)
    const photoCopiesfilter = photoCopies.filter(copy => copy.size !== "thumb" && copy.size !== "small-wm");
    const photoCopiesPriceUI = photoCopiesfilter.map(copy => ({ id: copy.id, size: copy.size, price: copy.price, commercialPrice: copy.commercialPrice }));
    const photoCopiesId = photoCopies.map(copy => ({ id: copy.id, size: copy.size }));

    const handleUpdateTags = (newTags) => {
        setTags(newTags);
    };

    async function HandleUpdateInfo(e) {
        e.preventDefault()

        const newPhotoInformation = {
            title: e.target.title.value,
            filename: photo.filename,
            description: e.target.description.value,
            priceCommercial: e.target?.pricecommercial.value || null,
            priceLarge: e.target.pricelarge.value,
            priceMedium: e.target?.pricemedium?.value || null,
            priceSmall: e.target?.pricesmall?.value || null,
            tags: tags,
            photoID: photoCopiesId,
            categoriesId: e.target?.categories?.value || null,
            collectionId: e.target?.collections?.value || null,
            isExclusive: e.target.exclusive.checked,


        }
console.log(newPhotoInformation.priceCommercial)

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
                router.reload()

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
                        <textarea id="description" type="text" name="description" className="w-full p-2 border rounded" defaultValue={photo.description} placeholder={photo.description} required />
                    </div>
                </div>

                {photoCopiesPriceUI.map((copy, index) => (
                    <>
                        <div key={index} className={`mb-4 ${copy.size == "thumb" || copy.size == "small-wm" ? "hidden" : "block"}`}>
                            <label className="block text-lg mb-2" htmlFor="price">Price {copy.size}</label>
                            <input id="price" type="number" min="0" name={`price${copy.size}`} className="w-full p-2 border rounded" defaultValue={copy.price} placeholder={copy.price} required />
                        </div>
                        <div>
                            <label className="block relative text-lg mb-2" htmlFor="commercialPrice">Price Commercial <span className="absolut font-thin text-xs border-2 rounded-md m-2 px-1 text-white hover:after:content-['Only_edit_this_if_the_image_is_exclusive'] hover:after:absolute hover:after:bottom-8 hover:after:left-0 hover:after:bg-gray-800 hover:after:text-gray-100 hover:after:p-2 hover:after:rounded">?</span></label>
                            <input id="price" type="number" min="0" name={`pricecommercial`} className="w-full p-2 border rounded" defaultValue={copy.commercialPrice} placeholder={copy.commercialPrice}/>
                        </div>
                    </>
                ))}


                {!photo.exclusive &&
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
                                <option key={"null"} value={"null"}>No collection</option>
                                {collections.map((col) => (
                                    <option key={col.id} value={col.id}>{col.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                }

                <div className={`flex items-center space-x-2 mt-4 ${photographer.role == "admin" ? "block" : "hidden"}`}>
                    <input type="checkbox" name="exclusive" className="w-6 h-6" checked={isExclusive} onChange={() => setIsExclusive(!isExclusive)} />
                    <label title="If you choose this, then the large price option will represent the exclusive price" className="text-lg">Should the photo be exclusive?</label>
                </div>

                <div className="mt-4">
                    <p className="text-blue-600 font-medium mb-1"><i className="info icon"></i> Tip: Type a tag and press Enter to queue it.</p>
                    <TagsInput value={tags} onChange={handleUpdateTags} onlyUnique className="w-full p-2 border rounded" />
                </div>

                <div className="mt-6">
                    <input type="submit" value="Submit" className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" />
                </div>
            </form>
        </ErrorBoundary>

    )
}