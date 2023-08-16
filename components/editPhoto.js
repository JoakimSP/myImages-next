import router from "next/router"
import { toast } from "react-toastify"
import ErrorBoundary from "./errorBoundery"

export default function EditPhoto({photo}) {

    async function HandleUpdateInfo(e) {
        e.preventDefault()
        let catValue
        for (let i = 3; i < 6; i++) {
            if (e.target[i].checked) {
                catValue = e.target[i].value
                break
            }
            else {
                continue
            }
        }

        const newPhotoInformation = {
            title: e.target[0].value,
            description: e.target[1].value,
            price: e.target[2].value,
            category: catValue,
            photoID: photo.id
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
                <input id="title" type="text" name="title" className="w-full p-2 border rounded" required/>
            </div>
            <div>
                <label className="block mb-2" htmlFor="description">Description</label>
                <input id="description" type="text" name="description" className="w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block mb-2" htmlFor="price">Price</label>
                <input id="price" type="number" min="0" name="price" className="w-full p-2 border rounded" required />
            </div>
            <div className="space-y-2">
                <legend className="font-semibold">Category</legend>
                <div>
                    <input type="radio" id="sunset" name="category" value="sunset" className="mr-2" />
                    <label htmlFor="sunset" className="mr-4">Sunset</label>
                    <input type="radio" id="family" name="category" value="family" className="mr-2" />
                    <label htmlFor="family" className="mr-4">Family</label>
                    <input type="radio" id="ocean" name="category" value="ocean" className="mr-2" />
                    <label htmlFor="ocean">Ocean</label>
                </div>
            </div>
            <div>
            <input type="submit" value="Submit" className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700" />
            </div>
        </form>
        </ErrorBoundary>
    )
}
