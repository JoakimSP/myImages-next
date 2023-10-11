import Image from "next/image"
import { getSession, signIn } from "next-auth/react"
import formatCurrency from "@/components/utils/formatCurrency"
import router from "next/router"
import { useContext} from "react"
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
        session,
        categories,
        collections
    } = props

    const { cart, addToCart } = useContext(CartContext)


    async function handleAddToCart(id) {
        if (!session) {
            return signIn()
        }
        
        const data = {
            id,
            session
        }

        console.log(data)
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
            <div className="bg-custom-grey">

                <div className="flex flex-auto justify-center mt-12 mx-auto px-4 sm:px-6 md:px-8 ">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div className="col-span-2">
                            <h1 className="text-3xl text-center font-bold mt-8 mb-6">{photo.title}</h1>
                            <Image
                                src={`/api/images/viewImage?name=${img}`}
                                width={800}
                                height={600}
                                alt={`#`}

                            />
                        </div>
                        <div className="space-y-6 flex-shrink">
                            <p className="text-xl font-semibold">{formatCurrency(photo.price)}</p>
                            <p className="text-base">{photo.description}</p>
                            <button
                                className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                                onClick={() => handleAddToCart(photo.id)}
                            >Add to cart
                            </button>
                            {
                                (photographer?.personID === photo.personID || photographer?.role === "admin") ? (
                                    <>
                                        <EditPhoto photo={photo} collections={collections} categories={categories} />
                                        <div>
                                            <button className="ml-4 mt-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700" onClick={handleDeleteImage}>Delete image</button>
                                        </div>
                                    </>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { img } = context.query;
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

        await prisma.photos.update({
            where: { id: photo.id, },
            data: { countViewd: { increment: 1 } },
        });

        // Check if session and session.user exist before trying to access the email
        const userEmail = session && session.user ? session.user.email : null;

        props = { img, photo, session: userEmail, collections, categories };

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



