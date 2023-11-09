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
                <div className="mb-8 flex justify-center space-x-4 whitespace-nowrap">
                    <Link href="/information/howToAndPricing" className="border-b-4 border-white px-2 py-2.5 text-xl font-bold hover:border-blue-400 md:px-5">

                        Pricing Information

                    </Link>
                    <Link href="/information/exclusiveRIghts" className="px-2 py-2.5 text-xl font-bold text-gray-300 hover:border-b-4 hover:text-blue-400 md:px-5">
                        How to use
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image card 1 - Left Image */}
                    <div className="p-4 border rounded shadow-sm">
                        <div className='relative w-full h-96 overflow-hidden'>
                            <Image
                                className='object-cover w-full h-full'
                                src={`/api/application/getPricingImages?imagePath=${pricingData.imageUrlLeft}`}
                                alt={pricingData.imageTitleLeft}
                                fill={true}
                                sizes="100vw 50vw"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{pricingData.imageTitleLeft}</h2>
                            <p className="text-gray-400 mb-4">{pricingData.imageSubTitleLeft}</p>
                            <span className="text-lg font-bold">{pricingData.imagePriceLeft}</span>
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
                            <span className="text-lg font-bold">{pricingData.imagePriceRight}</span>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-400 mt-8">
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
