import Image from "next/image"
import { getSession, signIn } from "next-auth/react"
import formatCurrency from "@/components/utils/formatCurrency"
import router from "next/router"
import { useContext, useState, useEffect } from "react"
import { CartContext } from "@/context/cartProvider"
import prisma from "@/components/prisma"
import EditPhoto from "@/components/editPhoto"
const logger = require('@/components/utils/logger')
import Layout from "@/components/layout/layout"
import Link from "next/link"
import GoBackButton from "@/components/utils/goBackButton"
import { toast } from "react-toastify"
import blurDataURL from "@/components/svgSkeleton"


export default function ViewImage(props) {
    const {
        img,
        photographer,
        photo,
        photoCopies,
        session,
        categories,
        collections,
    } = props

    const [selectedOption, setSelectedOption] = useState(null);
    const [priceOption, setPriceOption] = useState({
        size: null,
        price: null
    })
    const { cart, addToCart } = useContext(CartContext)


    const filterdPhotoCopies = photoCopies.filter((photo) => {
        return photo.size === "small" || photo.size === "medium" || photo.size === "large";;
    })
    const thumbNailPhoto = photoCopies.filter((photo) => {
        return photo.size === "thumb"
    })

    const choosePriceOption = (option) => {
        setPriceOption({
            size: option.size,
            price: option.price
        })

        setSelectedOption(option.size);
    }

    async function handleAddToCart(id) {
        if (!session) { return signIn() }
        if (priceOption.price == null) { return toast.warn("Pick a size option") }

        const data = {
            session,
            priceOption,
            filename: photo.filename,
            thumbnail: thumbNailPhoto[0].filepath
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
            <div className="bg-custom-grey mb-10">
                <GoBackButton />
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
                                placeholder="blur"
                                blurDataURL={blurDataURL}
                            />
                            <p className="text-base mt-6 text-white whitespace-pre-wrap">{photo.description}</p>
                            {
                                (photographer?.personID === photo.personID || photographer?.role === "admin") ? (
                                    <>
                                        <EditPhoto
                                            photo={photo}
                                            collections={collections}
                                            categories={categories}
                                            photoCopies={photoCopies}
                                            photographer={photographer} />
                                        <div className="mt-4">
                                            <button className="ml-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700" onClick={handleDeleteImage}>Delete image</button>
                                        </div>
                                    </>
                                ) : null
                            }
                        </div>

                        <div className="w-full md:w-1/3 px-6 mt-6 md:mt-0">
                            <div className="border-4 rounded-md bg-white shadow-xl p-6 overflow-hidden">
                                {filterdPhotoCopies.map((copy, index) => (
                                    <>
                                        <div className="flex justify-between items-start border-b-2 px-4 py-3 mb-3" key={index}>
                                            <div>
                                                <div className={`flex gap-4 items-center ${copy.size == "original" && !photo.exclusive ? 'hidden' : ''}`}>
                                                    <input type={"radio"} value={copy.price} onChange={() => choosePriceOption(copy)} name="priceChoice" className="focus:ring focus:ring-custom-grey-light h-4 w-4" />
                                                    <p className="text-black font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden max-w-xs capitalize">{copy.size}</p>
                                                </div>
                                                <div className={`${priceOption.size == copy.size ? "block" : "hidden"}`}>
                                                    <p className="text-gray-600 font-semibold"></p>
                                                    <p className="text-gray-500 text-sm mt-2 break-normal">{copy.width}px / {copy.height}px -{copy.filetype}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-w-xs">
                                                <p className="text-xl font-semibold text-gray-800 whitespace-nowrap overflow-ellipsis overflow-hidden mt-2">{formatCurrency(copy.price)}</p>
                                            </div>
                                        </div>

                                    </>
                                ))}

                                <button
                                    className="w-full py-2 px-4 mt-6 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 transition-all duration-300"
                                    onClick={() => handleAddToCart(photo.id)}
                                >
                                    Add to cart
                                </button>

                                <div className="mt-4">
                                    <Link className="text-indigo-600 hover:text-indigo-800 font-semibold underline" href="/table">
                                        Size guide
                                    </Link>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm mt-2 break-normal">Purchasing a non-exclusive photo through this platform includes a Standard License (regular license) for the photo.
                                     This entails a license for personal use, with the condition that the photo may not be shared and a limitation for print of the photo to a maximum of 20 copies.
                                      For further details, refer to the <Link className="text-indigo-600 hover:text-indigo-800 font-semibold underline" href={"/information/legalNotice"}>Legal Notice</Link> section. If you need to print more copies of a photo under a "Standard License",
                                       please get in contact through our Contact Form to ask a price for Commercial usage.</p>
                                </div>

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
    //TODO
    //return only the collections connected to the photographer
    try {
        const collections = await prisma.collection.findMany({
            select: {
                id: true,
                name: true,
                photographerPersonID: true
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
                size: "small-wm"
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
            if (photographer.role != "admin") {
                const filterCollections = collections.filter(col => { return col.photographerPersonID == photographer.personID })
                props.collections = filterCollections
            }
        }
    } catch (error) {
        logger.log('error', {
            message: error.message,
            stack: error.stack
        });
    } finally {
        prisma.$disconnect();
    }

    return { props };
}



