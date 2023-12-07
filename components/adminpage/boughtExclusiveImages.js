import React from 'react'
import Link from 'next/link'

export default function BoughtExclusiveImages({ photos }) {
    const purchedPhotos = photos.filter(photo => photo.active == 0)

    /*  const handleRemove = async (id) => {
 
         if (window.confirm("You're about the remove this from the database permanantly, Do you wish to continue?")) {
 
             const result = await fetch("/api/application/removeMail", {
                method: "POST",
                body : JSON.stringify({id: id})
              })
          
              if(result.ok){
                setSelectedMessage(() => {
          
                })
                toast("Successfully removed the mail")
              }
              else {
                toast.warn("could not remove the mail")
              }
             }
             else {
              return
             } 
 
         }
     }
  */
    return (
        <>
            <div className="flex flex-col justify-center items-center my-8">
                <table className="w-1/2 bg-white shadow-md rounded-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">Id</th>
                            <th className="py-2 px-4">Title</th>
                            <th className="py-2 px-4">Photo url</th>
                            {/*   <th className="py-2 px-4">delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {purchedPhotos.map((photo, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-2 px-4">{photo.id}</td>
                                <td className="py-2 px-4">{photo.title}</td>
                                <td className="py-2 px-4">
                                    <button className="bg-blue-500 mx-2 rounded p-1 transform active:scale-95 transition-transform duration-100">
                                        <Link
                                        
                                            href={`/images/viewimage?img=${encodeURIComponent(photo?.filepath)}&folderpath=${photo?.folderpath}`}>Go to photo</Link>
                                    </button>
                                </td>
                                {/*  <td className="py-2 px-4">

                                    <button className="bg-red-500 mx-2 rounded p-1 transform active:scale-95 transition-transform duration-100" value={photo.id} onClick={() => { handleRemove(photo.folderpath) }} title="Remove from database">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>

                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
