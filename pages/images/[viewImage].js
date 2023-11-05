import Image from "next/image"
import { getSession, signIn } from "next-auth/react"
import formatCurrency from "@/components/utils/formatCurrency"
import router from "next/router"
import { useContext, useState } from "react"
import { CartContext } from "@/context/cartProvider"
import prisma from "@/components/prisma"
import EditPhoto from "@/components/editPhoto"
const logger = require('@/components/utils/logger')
import Layout from "@/components/layout/layout"


export default function ViewImage(props) {
    const {
        img,
        photographer,
        photo,
        photoCopies,
        session,
        categories,
        collections
    } = props
    const [selectedOption, setSelectedOption] = useState(null);
    const [priceOption, setPriceOption] = useState({
        size: null,
        price: null
    })
    const { cart, addToCart } = useContext(CartContext)

    const choosePriceOption = (option) => {
        setPriceOption({
            size: option.size,
            price: option.price
        })

        setSelectedOption(option.size);
    }

    async function handleAddToCart(id) {
        if (!session) {
            return signIn()
        }

        const data = {
            session,
            priceOption,
            filename: photo.filename,
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
                body: JSON.stringify(photo)
            })

            if (result) {
                window.alert("Image was successfully deleted")
                router.push("/")
            }
        }
    }

    async function handleMarketFreeze(photoID) {
        router.push(`/contact?photoID=${photoID}`)
    }

    return (
        <Layout>
            <div className="bg-custom-grey">
                <button  className="inline-flex items-center m-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={() => router.back()}>Go back</button>
                <div className="flex flex-col justify-center mt-12 mx-auto px-4 sm:px-6 md:px-8 max-w-screen-xl">
                    <h1 className="text-white text-3xl text-center font-bold mt-8 mb-6">{photo.title}</h1>

                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full md:w-2/3 px-6">
                            <Image
                                src={`/api/images/viewImage?name=${img}`}
                                width={800}
                                height={600}
                                alt={`#`}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                            <p className="text-base mt-6 text-white">{photo.description}</p>
                            {
                                (photographer?.personID === photo.personID || photographer?.role === "admin") ? (
                                    <>
                                        <EditPhoto photo={photo} collections={collections} categories={categories} photoCopies={photoCopies} />
                                        <div className="mt-4">
                                            <button className="ml-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700" onClick={handleDeleteImage}>Delete image</button>
                                        </div>
                                    </>
                                ) : null
                            }
                        </div>

                        <div className="w-full md:w-1/3 px-6 mt-6 md:mt-0">
                            <div className="border-4 rounded-md bg-white shadow-xl p-6 overflow-hidden">
                                {photoCopies.map((copy, index) => (

                                    <div className="flex justify-between items-start border-b-2 px-4 py-3 mb-3" key={index}>
                                        <span className={`flex gap-4 items-center ${copy.size == "original" && !photo.exclusive ? 'hidden' : ''}`}>
                                            <input type={"radio"} value={copy.price} onChange={() => choosePriceOption(copy)} name="priceChoice" className="focus:ring focus:ring-custom-grey-light mt-2" />
                                            {copy.size != "original" ?
                                                <p className="text-gray-600 whitespace-nowrap overflow-ellipsis overflow-hidden max-w-xs">{copy.size}</p>
                                                :
                                                <div>
                                                    <p className="text-gray-600 font-semibold">Market freeze</p>
                                                    <p className="text-gray-500 text-sm mt-2">Safeguard your artistic endeavors – this image will be excluded from our platform for the duration you require.</p>
                                                </div>
                                            }
                                        </span>
                                        <div className="flex items-center max-w-xs">
                                            {copy.size != "original" ?
                                                <p className="text-xl font-semibold text-gray-800 whitespace-nowrap overflow-ellipsis overflow-hidden mt-2">{formatCurrency(copy.price)}</p>
                                                :
                                                <div className={`flex items-center justify-end space-x-2`}>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}


                                {selectedOption !== "original" ? (
                                    <button
                                        className="w-full py-2 px-4 mt-6 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 transition-all duration-300"
                                        onClick={() => handleAddToCart(photo.id)}
                                    >
                                        Add to cart
                                    </button>
                                ) : (
                                    <button
                                        className="w-full py-2 px-4 mt-6 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300"
                                        onClick={() => handleMarketFreeze(photo.id)}
                                    //TODO
                                    //Add redirect to a contact form with the image information(id or something)
                                    >
                                        Contact Us
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { img, folderpath } = context.query;
    const session = await getSession(context);


    let props = {};
    let photo;

    try {
        const collections = await prisma.collection.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        const categories = await prisma.categories.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        photo = await prisma.photos.findFirst({
            where: {
                filepath: img,
                size: "small"
            },
        });
        const photoCopies = await prisma.photos.findMany({
            where: {
                folderpath: folderpath,
            },
        });

        await prisma.photos.update({
            where: { id: photo.id, },
            data: { countViewd: { increment: 1 } },
        });


        const userEmail = session && session.user ? session.user.email : null;

        props = { img, photo, session: userEmail, collections, categories, photoCopies };

        if (photo && session) {
            const photographer = await prisma.photographer.findUnique({
                where: { email: session.user.email },
            });

            if (photographer) {
                props.photographer = photographer;
            }
        }

    } catch (error) {
        logger.logger.log('error', {
            message: error.message,
            stack: error.stack
        });
    } finally {
        prisma.$disconnect();
    }

    return { props };
}



