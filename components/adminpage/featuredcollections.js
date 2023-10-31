import { useState } from "react"

export default function Featuredcollections({ featuredcol }) {
    const [currentCol, setCurrentCol] = useState(featuredcol.collection)

    async function handleRemove(id) {

        try {
            const result = await fetch("/api/application/collections/removeFromFeaturedCollection", {
                method: "POST",
                body: JSON.stringify({ collections: { ...currentCol }, collectionToRemove: id })
            })

            if (result) {
                const updatedCollections = currentCol.filter(collection => collection.id !== id);
                setCurrentCol(updatedCollections);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex-1 bg-gray-800 shadow-xl rounded-xl px-10 py-6">
            <h2 className="text-3xl text-white font-bold mb-6">Featured collections shown on the homescreen</h2>
            <ul>
                {currentCol?.map((collection) => (
                    <li key={collection.id} className="flex items-center justify-between mb-2 text-lg text-gray-400 hover:text-gray-300 transition-all duration-200">
                        <button id={collection.id}><span className="mr-2">{collection.name}</span></button>
                        <button className="bg-red-500 rounded p-1 transform active:scale-95 transition-transform duration-100" value={collection.id} onClick={() => { handleRemove(collection.id) }} title="Remove from featured collections">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>

                    </li>
                ))}
            </ul>
        </div>
    )
}
