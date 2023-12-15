import React from 'react'
import Layout from '@/components/layout/layout'
import Link from 'next/link'
import prisma from '@/components/prisma';
import Image from 'next/image';

export default function howToAndPricing({ pricingData }) {
    return (
        <Layout>
            <div className="pt-4 text-white w-full h-full px-4 md:px-0 bg-custom-grey">
                <h1 className="mb-5 text-center text-4xl font-bold md:text-6xl">
                    {pricingData.title}
                </h1>
                <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg">
                    {pricingData.subtitle}
                </div>
                <div className="mb-8 flex flex-col md:flex-row items-center justify-center space-x-4 whitespace-nowrap">
                    <Link href="/information/howToAndPricing" className="border-b-4 border-white px-2 py-2.5 text-xl font-bold hover:border-blue-400 md:px-5">

                        Pricing Information

                    </Link>
                    <Link href="/information/exclusiveRIghts" className="px-2 py-2.5 text-xl font-bold text-gray-300 hover:border-b-4 hover:text-blue-400 md:px-5">
                        Exclusive Collection
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image card 1 - Left Image */}
                    <div className="p-4 border rounded shadow-sm">
                        <Link href={"/table"}>
                            <div className='relative w-full h-96 overflow-hidden bg-white'>
                                <Image
                                    className='object-contain w-full h-full'
                                    src={`/api/application/getPricingImages?imagePath=${pricingData.imageUrlLeft}`}
                                    alt={pricingData.imageTitleLeft}
                                    fill={true}
                                    sizes="100vw 50vw"
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{pricingData.imageTitleLeft}</h2>
                            <p className="text-gray-400 mb-4">{pricingData.imageSubTitleLeft}</p>
                            <span className="text-lg font-bold whitespace-pre-wrap">{pricingData.imagePriceLeft}</span>
                        </div>
                    </div>
                    {/* Image card 2 - Right Image */}
                    <div className="p-4 border rounded shadow-sm">
                        <div className='relative w-full h-96 overflow-hidden'>
                            <Image
                                className='object-cover w-full h-full'
                                src={`/api/application/getPricingImages?imagePath=${pricingData.imageUrlRight}`}
                                alt={pricingData.imageTitleRight}
                                fill={true}
                                sizes="100vw 50vw"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{pricingData.imageTitleRight}</h2>
                            <p className="text-gray-400 mb-4">{pricingData.imageSubTitleRight}</p>
                            <p className="text-gray-400 mb-4"> All payments are done using PayPal services. In order to facilitate your payment,
                             please see the following guide to get started with your personal
                              PayPal account: <Link className='font-bold text-blue-500 hover:text-blue-600 focus:text-blue-600 hover:underline focus:underline transition duration-300 ease-in-out px-1 -mx-1' href={"https://www.paypal.com/c2/webapps/mpp/how-to-guides/how-to-use-paypal?locale.x=en_C2"}>Go to instructions</Link></p>
                            <span className="text-lg font-bold whitespace-pre-wrap">{pricingData.imagePriceRight}</span>
                            <span className="text-lg font-bold whitespace-pre-wrap">To enable you to shop images found on our website you need to sign in using your Google account.
                             If you do not have a Google account, please create one following these <Link className='font-bold text-blue-500 hover:text-blue-600 focus:text-blue-600 hover:underline focus:underline transition duration-300 ease-in-out px-1 -mx-1' href={"https://support.google.com/mail/answer/56256?hl=en"}>instructions</Link>
                             </span>
                        </div>
                    </div>
                </div>
                <p className='text-center text-sm text-gray-400 mt-8'>
                    In case you need support, please contact us through our <Link className='font-bold text-blue-500 hover:text-blue-600 focus:text-blue-600 hover:underline focus:underline transition duration-300 ease-in-out px-1 -mx-1' href={"/contact"}>Contact Form</Link> for inquiries.</p>

                <div className="text-center text-sm text-gray-400">
                    {pricingData.footerText}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const pricingData = await prisma.pricingpage.findFirst({
        where: {
            id: "1"
        },
        select: {
            title: true,
            subtitle: true,
            imageUrlLeft: true,
            imageTitleLeft: true,
            imageSubTitleLeft: true,
            imagePriceLeft: true,
            imageUrlRight: true,
            imageTitleRight: true,
            imageSubTitleRight: true,
            imagePriceRight: true,
            footerText: true,
        }
    });

    return {
        props: {
            pricingData
        }
    };
}
