import Image from "next/image"
import prisma from "../../components/prisma"
import { getSession, signIn } from "next-auth/react"
import Header from "@/components/header"
import formatCurrency from "@/components/utils/formatCurrency"
import router from "next/router"
import { useContext } from "react"
import { CartContext } from "@/context/cartProvider"

export default function ViewImage({ photo, photographer, session }) {
    const { thumbnailUrl, filename, title, personID, id } = photo
    const { cart, addToCart } = useContext(CartContext)

    async function HandleUpdateInfo(e) {
        e.preventDefault()
        let tagValue
        for (let i = 3; i < 6; i++) {
            if (e.target[i].checked) {
                tagValue = e.target[i].value
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
            tags: tagValue,
            photoID: id
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
                router.push("/")

            }
        } catch (error) {
            console.log(error)
        }

    }
    async function handleAddToCart(id) {
        if (!session) {
            return signIn()
        }
        const data = {
            id,
            session
        }
        const result = await fetch('/api/cart/storeCartData', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })

        addToCart(id)
    }
    async function handleDeleteImage() {
        if (window.confirm("Are you sure you want to delete this image?")) {
            const result = await fetch('../api/images/deleteImage', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(id)
            })

            if (result) {
                router.push("/")
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="flex flex-auto justify-center mt-12 mx-auto px-4 sm:px-6 md:px-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                    <div className="col-span-2">
                        <h1 className="text-3xl text-center font-bold mt-8 mb-6">{title}</h1>
                        <Image
                            src={`/${thumbnailUrl}`}
                            width={800}
                            height={600}
                            alt={`${title}`}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </div>
                    <div className="space-y-6 flex-shrink">
                        <p className="text-xl font-semibold">{formatCurrency(photo.price)}</p>
                        <p className="text-base">{photo.description}</p>
                        <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" onClick={() => handleAddToCart(id)}>Add to cart</button>
                        {photographer.personID === personID &&
                            <form className="space-y-4" onSubmit={HandleUpdateInfo}>
                                <div>
                                    <label className="block mb-2" htmlFor="title">Title</label>
                                    <input id="title" type="text" name="title" className="w-full p-2 border rounded" required />
                                </div>
                                <div>
                                    <label className="block mb-2" htmlFor="description">Description</label>
                                    <input id="description" type="text" name="description" className="w-full p-2 border rounded" required />
                                </div>
                                <div>
                                    <label className="block mb-2" htmlFor="price">Price</label>
                                    <input id="price" type="number" name="price" className="w-full p-2 border rounded" required />
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
                                    <button className="ml-4 mt-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700" onClick={handleDeleteImage}>Delete image</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}


export async function getServerSideProps(context) {
    const { query } = context
    const session = await getSession(context)
    let photographer = {}

    try {
        const photo = await prisma.photos.findFirst({
            where: {
                filename: query.viewImage
            },
        })

        if (session) {
            photographer = await prisma.photographer.findUnique({
                where: {
                    email: session.user.email
                }
            })
            prisma.$disconnect()

            return {
                props: {
                    photo,
                    photographer,
                    session: session.user.email
                }
            }
        }
        else {
            return {
                props: {
                    photo,
                    photographer,

                }
            }
        }

    } catch (error) {
        console.log(error)
    }


}
