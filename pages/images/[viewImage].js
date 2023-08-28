import Image from "next/image"
import { getSession, signIn } from "next-auth/react"
import Header from "@/components/header"
import formatCurrency from "@/components/utils/formatCurrency"
import router from "next/router"
import { useContext, useState, useEffect } from "react"
import { CartContext } from "@/context/cartProvider"
import prisma from "@/components/prisma"
import EditPhoto from "@/components/editPhoto"
const logger = require('@/components/utils/logger')
import Footer from "@/components/footer"

export default function ViewImage(props) {
    const {
        img,
        photographer,
        photo,
        session
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
        <div className="bg-custom-grey">
            <Header />
            <div className="flex flex-auto justify-center mt-12 mx-auto px-4 sm:px-6 md:px-8 ">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                    <div className="col-span-2">
                        <h1 className="text-3xl text-center font-bold mt-8 mb-6">{photo.title}</h1>
                        <Image
                            src={img}
                            width={800}
                            height={600}
                            alt={`#`}
                            onContextMenu={(e) => e.preventDefault()}
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
                                    <EditPhoto photo={photo} />
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
            <Footer />
        </div>

    )
}

export async function getServerSideProps(context) {
    const { img } = context.query;
    const session = await getSession(context);

    let props = {};
    let photo;

    try {
        photo = await prisma.photos.findFirst({
            where: { url: img },
        });
        // Switch to check if the user clicked an image from the photographers page or homepage.
        // Firebase storage contains duplicate images, but the database has URLs for both.

        switch (true) {
            case Boolean(photo):
                await prisma.photos.update({
                    where: { id: photo.id },
                    data: { countViewd: { increment: 1 } },
                });
                break;
            default:
                photo = await prisma.photos.findFirst({
                    where: { urlUser: img },
                });
                if (photo) {
                    await prisma.photos.update({
                        where: { id: photo.id },
                        data: { countViewd: { increment: 1 } },
                    });
                }

        }

        // Check if session and session.user exist before trying to access the email
        const userEmail = session && session.user ? session.user.email : null;

        props = { img, photo, session: userEmail };

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



