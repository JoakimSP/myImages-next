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
import { toast } from "react-toastify"
import Link from "next/link"
import GoBackButton from "@/components/utils/goBackButton"
import blurDataURL from "@/components/svgSkeleton"


export default function Index(props) {
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

    const choosePriceOption = (copy, isCommercial) => {

        // Check if the selected option is for a commercial license
        if (isCommercial) {
            setPriceOption({
                size: copy.size,
                price: copy.commercialPrice  // Set to commercial price
            });
        } else {
            // For non-commercial or other options
            setPriceOption({
                size: copy.size,
                price: copy.price  // Set to the default price
            });
        }

        setSelectedOption(copy.size);
    };

    async function handleAddToCart(id) {
        if (!session) { return signIn() }
        if (priceOption.price == null) { return toast.warn("Pick a sizeoption") }

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
                                    <div key={index}>
                                        <div >
                                            {
                                                copy.size == "large" &&
                                                <div className="flex justify-between items-start border-b-2 px-4 py-3 mb-3" >
                                                    <div>
                                                        <div className={`flex gap-4 items-center ${copy.size == "original" && !photo.exclusive ? 'hidden' : ''}`}>
                                                            <input type={"radio"} value={copy.price} onChange={() => choosePriceOption(copy)} name="priceChoice" className="focus:ring focus:ring-custom-grey-light h-4 w-4" />
                                                            <p className="text-black font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden max-w-xs capitalize">Non-Commercial<br /> license</p>
                                                        </div>
                                                        <div className={`${priceOption.price == copy.price ? "block" : "hidden"}`}>
                                                            <p className="text-gray-600 font-semibold"></p>
                                                            <p className="text-gray-500 text-sm mt-2 break-normal">{copy.width}px / {copy.height}px -{copy.filetype}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center max-w-xs">
                                                        <p className="text-xl font-semibold text-gray-800 whitespace-nowrap overflow-ellipsis overflow-hidden mt-2">{formatCurrency(copy.price)}</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div >

                                            {
                                                copy.size == "large" &&
                                                <div className="flex justify-between items-start border-b-2 px-4 py-3 mb-3">
                                                    <div>
                                                        <div className={`flex gap-4 items-center ${copy.size == "original" && !photo.exclusive ? 'hidden' : ''}`}>
                                                            <input type={"radio"} value={copy.commercialPrice} onChange={() => choosePriceOption(copy, true)} name="priceChoice" className="focus:ring focus:ring-custom-grey-light h-4 w-4" />
                                                            <p className="text-black font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden max-w-xs capitalize">Commercial<br /> license</p>
                                                        </div>
                                                        <div className={`${priceOption.price == copy.commercialPrice ? "block" : "hidden"}`}>
                                                            <p className="text-gray-600 font-semibold"></p>
                                                            <p className="text-gray-500 text-sm mt-2 break-normal">{copy.width}px / {copy.height}px -{copy.filetype}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center max-w-xs">
                                                        <p className="text-xl font-semibold text-gray-800 whitespace-nowrap overflow-ellipsis overflow-hidden mt-2">{formatCurrency(copy.commercialPrice)}</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}
                                <button
                                    className="w-full py-2 px-4 mt-6 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
                                    <p className="text-gray-500 text-sm mt-2 break-normal">You can buy photos from the Exclusive Collection either by a &quot;Non Commercial Licence&quot;,
                                        meaning it is for your own personal usage and not for sharing it with others and you can print a maximum of 20 copies of it,
                                        or you can buy a photo with a &quot;Commercial License&quot;, meaning you&apos;ll get a non-restricted exclusive global user/owner right/license
                                        to selected photo where you can print as many copies as you like. With both license types selected photo will be erased from our database
                                        once the purchase is done. For further details, refer to the <Link className="text-indigo-600 hover:text-indigo-800 font-semibold underline" href={"/information/legalNotice"}>Legal Notice</Link> section.
                                        Photos bought from the Exclusive Collection are always in the photos original size (Large) and file format is .TIFF.</p>
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



